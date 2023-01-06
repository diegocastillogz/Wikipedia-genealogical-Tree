import { c as create_ssr_component, f as subscribe, i as is_promise, n as noop, v as validate_component, e as each, b as add_attribute, d as escape, m as missing_component } from './index-1d0ab795.js';
import { n as navigating, p as page } from './stores-0a5e3699.js';

const removeWikipediaLink = (url) => url?.split("/wiki/")[1];
const formatSpacesToUnderscore = (urlSearch) => urlSearch?.replace(/\s/g, "_");
const CHARACTER_KEYS = {
  BORN: "born",
  DIED: "died",
  CAUSE_OF_DEATH: "causeofdeath",
  BURIAL: "burial",
  PARENTS: "parent",
  FATHER: "father",
  MOTHER: "mother"
};
const NOT_ALLOWED_WORDS = ["Hesiod"];
const createElementFromHTML = (htmlString, elementId = "") => {
  if (!document)
    return;
  const div = document.createElement("div");
  div.innerHTML = htmlString?.trim();
  div.setAttribute("id", elementId);
  div.style.display = "none";
  document.body.appendChild(div);
  return div;
};
const getCharacterImage = (elementId) => {
  const imageElement = document.getElementById(elementId)?.querySelector(".infobox-image img") ?? null;
  if (!imageElement)
    return;
  return imageElement.src;
};
const getRowElementByKey = (elementId, key) => {
  const thElementsInDivWithId = document.getElementById(elementId)?.getElementsByTagName("th");
  if (!thElementsInDivWithId) {
    return;
  }
  const thTagsElements = Array.from(thElementsInDivWithId);
  return thTagsElements?.find(({ innerText }) => {
    const text = innerText?.toLowerCase().replace(/\s/g, "");
    const startWithExpresion = new RegExp("^" + key);
    return startWithExpresion.test(text);
  })?.nextElementSibling;
};
const getElementText = (elementId, key) => getRowElementByKey(elementId, key)?.innerText || "";
const getParentsNames = (elementId) => {
  const parentsNames = [];
  const listElementsParentsTags = getRowElementByKey(elementId, CHARACTER_KEYS.PARENTS);
  const listElementFatherTag = getRowElementByKey(elementId, CHARACTER_KEYS.FATHER);
  const listElementMotherTag = getRowElementByKey(elementId, CHARACTER_KEYS.MOTHER);
  if (listElementsParentsTags) {
    const listParentElements = Array.from(listElementsParentsTags.getElementsByTagName("a")).map(getLinkElementOrText).filter((value) => value && !NOT_ALLOWED_WORDS.includes(value));
    if (listParentElements) {
      parentsNames.push(...listParentElements);
    }
  }
  if (listElementFatherTag) {
    parentsNames.push(getLinkElementOrText(listElementFatherTag));
  }
  if (listElementMotherTag) {
    parentsNames.push(getLinkElementOrText(listElementMotherTag));
  }
  return parentsNames;
};
const getLinkElementOrText = (listElementTag) => {
  const linkElement = listElementTag.getElementsByTagName("a")[0];
  if (!linkElement)
    return listElementTag.innerText;
  return getHrefValue(linkElement);
};
const getHrefValue = (element) => {
  const hrefValue = element?.getAttribute("href");
  if (hrefValue?.includes("#cite"))
    return;
  return removeWikipediaLink(hrefValue);
};
const getCharacterData = (elementId) => {
  const image = getCharacterImage(elementId);
  const bornDate = getElementText(elementId, CHARACTER_KEYS.BORN);
  const diedDate = getElementText(elementId, CHARACTER_KEYS.DIED);
  const causeofDeath = getElementText(elementId, CHARACTER_KEYS.CAUSE_OF_DEATH);
  const burial = getElementText(elementId, CHARACTER_KEYS.BURIAL);
  const parentsNames = getParentsNames(elementId);
  return { image, bornDate, diedDate, causeofDeath, burial, parentsNames };
};
const formatBody = ({
  text,
  title,
  pageid,
  pageName
}) => {
  const pageHtmlContent = text || "";
  if (!pageHtmlContent || typeof window === "undefined")
    return;
  createElementFromHTML(pageHtmlContent, pageid?.toString());
  return { ...getCharacterData(pageid?.toString() || ""), name: title, pageid, pageName };
};
const getRedirection = ({ text, pageid }) => {
  const pageHtmlContent = text;
  if (!pageHtmlContent || !pageHtmlContent?.includes(
    '<div class="mw-parser-output"><div class="redirectMsg"><p>Redirect to:</p><ul class="redirectText">'
  ))
    return;
  const createdRedirectionElement = createElementFromHTML(
    pageHtmlContent,
    `${pageid?.toString() || ""}-redirect-remove`
  );
  const redirectionLink = createdRedirectionElement?.querySelector(".redirectText li a")?.getAttribute("href");
  return removeWikipediaLink(redirectionLink);
};
const deleteElementInDocument = (elementId) => document.getElementById(elementId)?.remove();
const getAllRedirectElements = () => document.querySelectorAll('[id$="redirect-remove"]');
const deleteUselessElementsInDocument = (elementsToDeleteList) => {
  elementsToDeleteList.forEach((elementToDelete) => deleteElementInDocument(elementToDelete));
  Array.from(getAllRedirectElements()).forEach(
    (redirectElementToDelete) => redirectElementToDelete?.remove()
  );
};
const API = "https://en.wikipedia.org/w/api.php?format=json";
const FORMAT_VERSION = "formatversion=2";
const CORS = "origin=*";
const getPageByTitle = async (title) => {
  const response = await fetch(
    `${API}&action=parse&page=${title}&prop=text&${FORMAT_VERSION}&${CORS}`
  );
  const { parse: pageContent } = await response.json();
  const redirection = getRedirection(pageContent);
  if (redirection)
    return { status: 200, redirection };
  return { status: 200, pageContent };
};
const GET = async (searchParam) => {
  try {
    let searchParamFormatted = "";
    if (typeof searchParam !== "string") {
      searchParamFormatted = searchParam?.url?.searchParams.get("q") || "";
    } else {
      searchParamFormatted = searchParam;
    }
    const { redirection, status, pageContent } = await getPageByTitle(searchParamFormatted);
    if (!redirection)
      return { status, body: pageContent };
    const response = await getPageByTitle(redirection);
    return { status: response?.status, body: response?.pageContent };
  } catch (error) {
    const typedError = error;
    return { status: 403, message: typedError?.message || "" };
  }
};
const getCharacterInfo = async (characterName) => {
  const parentUrlFormat = formatSpacesToUnderscore(characterName);
  const { body } = await GET(parentUrlFormat);
  return formatBody({ ...body, pageName: characterName });
};
const getCharacterParentsInfo = async (parentsNames) => {
  if (!parentsNames)
    return;
  if (parentsNames && parentsNames?.length <= 0)
    return;
  return await Promise.all(
    parentsNames?.map(
      async (ancestorName) => await getCharacterInfo(ancestorName) || { name: ancestorName }
    )
  );
};
class Node {
  character;
  parents;
  constructor(node) {
    this.character = node?.character || {};
    this.parents = [];
  }
}
class GenealogicalTree {
  root;
  characterName;
  requestedPagesId = [];
  /*
  Each generation is a power of 2 so we're loading the first 6 generations to not break the app because there are too many requests
  */
  MAX_FIRST_LOAD_PARIENTS = Math.pow(2, 6);
  constructor(characterName) {
    this.characterName = characterName;
  }
  getRequestedPagesId = () => this.requestedPagesId;
  init = async () => {
    const character = await getCharacterInfo(this.characterName || "");
    const rootNode = new Node({ character });
    this.root = await this.insert(rootNode);
  };
  isMaxParientsReached = () => this.requestedPagesId.length === this.MAX_FIRST_LOAD_PARIENTS;
  insert = async (currentNode) => {
    if (!currentNode)
      return;
    if (currentNode?.character?.pageid && this.requestedPagesId.includes(currentNode?.character?.pageid)) {
      return currentNode;
    }
    const parents = await getCharacterParentsInfo(currentNode?.character?.parentsNames || []);
    if (parents && currentNode?.parents) {
      const newParents = parents.map(
        (character) => ({ character, parents: [] })
      );
      currentNode.parents = newParents;
    }
    if (currentNode?.character?.pageid) {
      this.requestedPagesId.push(currentNode?.character?.pageid);
    }
    return currentNode;
  };
  insertWithBFSIteration = async (root) => {
    const queue = [];
    let current = root;
    if (!current)
      return;
    queue.push(current);
    while (queue.length > 0) {
      current = queue.shift();
      if (!current || this.isMaxParientsReached())
        break;
      current = await this.insert(current);
      if (current?.parents[0])
        queue.push(current?.parents[0]);
      if (current?.parents[1])
        queue.push(current?.parents[1]);
    }
  };
}
const getGenealogicalTreeRoot = async (queryParam) => {
  const tree = new GenealogicalTree(queryParam);
  await tree.init();
  await tree.insertWithBFSIteration(tree.root);
  deleteUselessElementsInDocument(
    tree.requestedPagesId.map((requestePageId) => requestePageId.toString())
  );
  return tree.root;
};
const Gender_male = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path fill="${"#fff"}" d="${"M9,11.75A1.25,1.25 0 0,0 7.75,13A1.25,1.25 0 0,0 9,14.25A1.25,1.25 0 0,0 10.25,13A1.25,1.25 0 0,0 9,11.75M15,11.75A1.25,1.25 0 0,0 13.75,13A1.25,1.25 0 0,0 15,14.25A1.25,1.25 0 0,0 16.25,13A1.25,1.25 0 0,0 15,11.75M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,11.71 4,11.42 4.05,11.14C6.41,10.09 8.28,8.16 9.26,5.77C11.07,8.33 14.05,10 17.42,10C18.2,10 18.95,9.91 19.67,9.74C19.88,10.45 20,11.21 20,12C20,16.41 16.41,20 12,20Z"}"></path></svg>`;
});
const Gender_female = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path fill="${"#fff"}" d="${"M13.75 13C13.75 12.31 14.31 11.75 15 11.75S16.25 12.31 16.25 13 15.69 14.25 15 14.25 13.75 13.69 13.75 13M22 12V22H2V12C2 6.5 6.5 2 12 2S22 6.5 22 12M4 12C4 16.41 7.59 20 12 20S20 16.41 20 12C20 11.21 19.88 10.45 19.67 9.74C18.95 9.91 18.2 10 17.42 10C14.05 10 11.07 8.33 9.26 5.77C8.28 8.16 6.41 10.09 4.05 11.14C4 11.42 4 11.71 4 12M9 14.25C9.69 14.25 10.25 13.69 10.25 13S9.69 11.75 9 11.75 7.75 12.31 7.75 13 8.31 14.25 9 14.25Z"}"></path></svg>`;
});
const Wikipedia = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path fill="${"#fff"}" d="${"M14.97,18.95L12.41,12.92C11.39,14.91 10.27,17 9.31,18.95C9.3,18.96 8.84,18.95 8.84,18.95C7.37,15.5 5.85,12.1 4.37,8.68C4.03,7.84 2.83,6.5 2,6.5C2,6.4 2,6.18 2,6.05H7.06V6.5C6.46,6.5 5.44,6.9 5.7,7.55C6.42,9.09 8.94,15.06 9.63,16.58C10.1,15.64 11.43,13.16 12,12.11C11.55,11.23 10.13,7.93 9.71,7.11C9.39,6.57 8.58,6.5 7.96,6.5C7.96,6.35 7.97,6.25 7.96,6.06L12.42,6.07V6.47C11.81,6.5 11.24,6.71 11.5,7.29C12.1,8.53 12.45,9.42 13,10.57C13.17,10.23 14.07,8.38 14.5,7.41C14.76,6.76 14.37,6.5 13.29,6.5C13.3,6.38 13.3,6.17 13.3,6.07C14.69,6.06 16.78,6.06 17.15,6.05V6.47C16.44,6.5 15.71,6.88 15.33,7.46L13.5,11.3C13.68,11.81 15.46,15.76 15.65,16.2L19.5,7.37C19.2,6.65 18.34,6.5 18,6.5C18,6.37 18,6.2 18,6.05L22,6.08V6.1L22,6.5C21.12,6.5 20.57,7 20.25,7.75C19.45,9.54 17,15.24 15.4,18.95C15.4,18.95 14.97,18.95 14.97,18.95Z"}"></path></svg>`;
});
const Tree = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path fill="${"#fff"}" d="${"M12 1A2.5 2.5 0 0 0 9.5 3.5A2.5 2.5 0 0 0 11 5.79V7H7A2 2 0 0 0 5 9V9.71A2.5 2.5 0 0 0 3.5 12A2.5 2.5 0 0 0 5 14.29V15H4A2 2 0 0 0 2 17V18.21A2.5 2.5 0 0 0 .5 20.5A2.5 2.5 0 0 0 3 23A2.5 2.5 0 0 0 5.5 20.5A2.5 2.5 0 0 0 4 18.21V17H8V18.21A2.5 2.5 0 0 0 6.5 20.5A2.5 2.5 0 0 0 9 23A2.5 2.5 0 0 0 11.5 20.5A2.5 2.5 0 0 0 10 18.21V17A2 2 0 0 0 8 15H7V14.29A2.5 2.5 0 0 0 8.5 12A2.5 2.5 0 0 0 7 9.71V9H17V9.71A2.5 2.5 0 0 0 15.5 12A2.5 2.5 0 0 0 17 14.29V15H16A2 2 0 0 0 14 17V18.21A2.5 2.5 0 0 0 12.5 20.5A2.5 2.5 0 0 0 15 23A2.5 2.5 0 0 0 17.5 20.5A2.5 2.5 0 0 0 16 18.21V17H20V18.21A2.5 2.5 0 0 0 18.5 20.5A2.5 2.5 0 0 0 21 23A2.5 2.5 0 0 0 23.5 20.5A2.5 2.5 0 0 0 22 18.21V17A2 2 0 0 0 20 15H19V14.29A2.5 2.5 0 0 0 20.5 12A2.5 2.5 0 0 0 19 9.71V9A2 2 0 0 0 17 7H13V5.79A2.5 2.5 0 0 0 14.5 3.5A2.5 2.5 0 0 0 12 1M12 2.5A1 1 0 0 1 13 3.5A1 1 0 0 1 12 4.5A1 1 0 0 1 11 3.5A1 1 0 0 1 12 2.5M6 11A1 1 0 0 1 7 12A1 1 0 0 1 6 13A1 1 0 0 1 5 12A1 1 0 0 1 6 11M18 11A1 1 0 0 1 19 12A1 1 0 0 1 18 13A1 1 0 0 1 17 12A1 1 0 0 1 18 11M3 19.5A1 1 0 0 1 4 20.5A1 1 0 0 1 3 21.5A1 1 0 0 1 2 20.5A1 1 0 0 1 3 19.5M9 19.5A1 1 0 0 1 10 20.5A1 1 0 0 1 9 21.5A1 1 0 0 1 8 20.5A1 1 0 0 1 9 19.5M15 19.5A1 1 0 0 1 16 20.5A1 1 0 0 1 15 21.5A1 1 0 0 1 14 20.5A1 1 0 0 1 15 19.5M21 19.5A1 1 0 0 1 22 20.5A1 1 0 0 1 21 21.5A1 1 0 0 1 20 20.5A1 1 0 0 1 21 19.5Z"}"></path></svg>`;
});
const css$3 = {
  code: ".icon.svelte-57tuit,.icon.svelte-57tuit svg{margin:0 auto;width:20px;height:20px}",
  map: null
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { iconName } = $$props;
  const Icons = {
    genderMale: Gender_male,
    genderFemale: Gender_female,
    wikipedia: Wikipedia,
    tree: Tree
  };
  if ($$props.iconName === void 0 && $$bindings.iconName && iconName !== void 0)
    $$bindings.iconName(iconName);
  $$result.css.add(css$3);
  return `<div class="${"icon svelte-57tuit"}">${validate_component(Icons[iconName] || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
</div>`;
});
const css$2 = {
  code: "section.svelte-1phdted.svelte-1phdted{max-height:650px;color:var(--primaryFont);background-color:var(--boxColor);width:300px;border:1px solid rgba(255, 255, 255, 0.1) !important;border-radius:12px}img.svelte-1phdted.svelte-1phdted{border-radius:50%;height:120px;width:120px;object-fit:cover;object-position:top;background-color:var(--black);margin-bottom:15px}.node-text.svelte-1phdted.svelte-1phdted{display:inline-block;transform:rotateX(180deg);text-align:center;padding:12px 6px}.node-text.svelte-1phdted table.svelte-1phdted{table-layout:fixed;width:100%}.node-text.svelte-1phdted tr.svelte-1phdted{display:flex;align-items:baseline;width:100%;margin-bottom:18px}.node-text.svelte-1phdted th.svelte-1phdted{width:30%;text-align:left;font-size:14px;text-transform:capitalize}.node-text.svelte-1phdted td.svelte-1phdted{width:70%;text-align:right;font-size:12px;color:var(--white);opacity:0.4}.text-container.svelte-1phdted.svelte-1phdted{margin-top:1rem}h3.svelte-1phdted.svelte-1phdted{text-transform:uppercase;font-size:12px}.character-actions.svelte-1phdted.svelte-1phdted{display:flex;justify-content:space-between}button.svelte-1phdted.svelte-1phdted,a.svelte-1phdted.svelte-1phdted{padding:6px;border:none;border-radius:5px}.father.svelte-1phdted.svelte-1phdted{background-color:var(--purple)}.wikipedia.svelte-1phdted.svelte-1phdted{background-color:var(--blue)}.mother.svelte-1phdted.svelte-1phdted{background-color:var(--aquablue)}.tree.svelte-1phdted.svelte-1phdted{background-color:var(--red)}",
  map: null
};
const Character_box = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { character = void 0 } = $$props;
  let { parents = [] } = $$props;
  const url = $page.url;
  const currentCharacterRootName = url?.searchParams.get("q") ?? "";
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  if ($$props.parents === void 0 && $$bindings.parents && parents !== void 0)
    $$bindings.parents(parents);
  $$result.css.add(css$2);
  $$unsubscribe_page();
  return `${character?.name ? `<section class="${"tf-nc svelte-1phdted"}"${add_attribute("id", character.pageid?.toString(), 0)}><div class="${"node-text svelte-1phdted"}"><table class="${"svelte-1phdted"}"><tbody>${character.image ? `<img${add_attribute("src", character.image, 0)}${add_attribute("alt", `${character.name} character`, 0)} class="${"svelte-1phdted"}">` : ``}
					${character.name ? `<h3 class="${"svelte-1phdted"}">${escape(character.name)}</h3>` : ``}

					<div class="${"text-container svelte-1phdted"}">${character.bornDate ? `<tr class="${"svelte-1phdted"}"><th class="${"svelte-1phdted"}"><p>born</p></th>
								<td class="${"svelte-1phdted"}"><p>${escape(character.bornDate)}</p></td></tr>` : ``}

						${character.diedDate ? `<tr class="${"svelte-1phdted"}"><th class="${"svelte-1phdted"}"><p>died</p></th>
								<td class="${"svelte-1phdted"}"><p>${escape(character.diedDate)}</p></td></tr>` : ``}

						${character.causeofDeath ? `<tr class="${"svelte-1phdted"}"><th class="${"svelte-1phdted"}"><p>cause of death</p></th>
								<td class="${"svelte-1phdted"}"><p>${escape(character.causeofDeath)}</p></td></tr>` : ``}

						${character.burial ? `<tr class="${"svelte-1phdted"}"><th class="${"svelte-1phdted"}"><p>cause of death</p></th>
								<td class="${"svelte-1phdted"}"><p>${escape(character.burial)}</p></td></tr>` : ``}</div>

					<div class="${"character-actions svelte-1phdted"}">${character?.parentsNames?.[0] ? `<button class="${"father svelte-1phdted"}">${validate_component(Icon, "Icon").$$render($$result, { iconName: "genderMale" }, {}, {})}</button>` : ``}

						${character?.parentsNames?.[1] ? `<button class="${"mother svelte-1phdted"}">${validate_component(Icon, "Icon").$$render($$result, { iconName: "genderFemale" }, {}, {})}</button>` : ``}
						<a class="${"wikipedia svelte-1phdted"}" target="${"_blank"}"${add_attribute("href", `https://en.wikipedia.org/?curid=${character.pageid}`, 0)}>${validate_component(Icon, "Icon").$$render($$result, { iconName: "wikipedia" }, {}, {})}</a>

						${character?.pageName && currentCharacterRootName !== character.pageName ? `<button class="${"tree svelte-1phdted"}">${validate_component(Icon, "Icon").$$render($$result, { iconName: "tree" }, {}, {})}</button>` : ``}</div></tbody></table></div></section>` : ``}`;
});
const Tree_component = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { characterNode } = $$props;
  characterNode?.character?.pageid?.toString();
  if ($$props.characterNode === void 0 && $$bindings.characterNode && characterNode !== void 0)
    $$bindings.characterNode(characterNode);
  return `${characterNode.character ? `<li>${validate_component(Character_box, "CharacterBox").$$render($$result, Object.assign(characterNode), {}, {})}
		${characterNode.parents.length > 0 ? `<ul>${each(characterNode.parents, (parent) => {
    return `${parent.parents ? `${validate_component(Tree_component, "svelte:self").$$render($$result, { characterNode: parent }, {}, {})}` : ``}`;
  })}</ul>` : ``}</li>` : ``}`;
});
const css$1 = {
  code: ".spinner-container.svelte-u0m97s{display:flex;position:absolute;background-color:var(--gray);color:white;top:0px;left:0px;z-index:1000;width:100%;height:calc(100% - 80px);opacity:0.5;overflow-y:hidden}.spinner.svelte-u0m97s{margin:auto;border:4px solid rgba(0, 0, 0, 0.1);width:50px;height:50px;border-radius:50%;border-left-color:var(--white);animation:svelte-u0m97s-spin 1s linear infinite}@keyframes svelte-u0m97s-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: null
};
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="${"spinner-container svelte-u0m97s"}"><div class="${"spinner svelte-u0m97s"}"></div>
</div>`;
});
const css = {
  code: ".tf-ancestor-tree{position:relative}.tf-ancestor-tree > ul{transform:rotateX(180deg)}.tf-ancestor-tree li ul{margin-bottom:1em}.tf-tree .tf-nc:after, .tf-tree.tf-gap-lg li li:before, .tf-tree\n			li\n			li:last-child:before, .tf-tree.tf-gap-lg li > .tf-nc:before, .tf-tree li li:before{background-color:var(--white) !important;border-color:var(--white) !important}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  let $page, $$unsubscribe_page;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const prerender = false;
  const url = $page.url;
  let treeContent = {};
  let queryParam = url?.searchParams.get("q") ?? "";
  if (queryParam) {
    treeContent = getGenealogicalTreeRoot(queryParam);
  }
  if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0)
    $$bindings.prerender(prerender);
  $$result.css.add(css);
  {
    if ($navigating) {
      const queryParamTo = $navigating?.to?.url.searchParams.get("q") ?? "";
      const queryParamFrom = $navigating?.from?.url.searchParams.get("q") ?? "";
      if (queryParamFrom !== queryParamTo) {
        treeContent = getGenealogicalTreeRoot(queryParamTo);
      }
    }
  }
  $$unsubscribe_navigating();
  $$unsubscribe_page();
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
	${validate_component(Spinner, "SpinnerComponent").$$render($$result, {}, {}, {})}
`;
    }
    return function(rootCharacter) {
      return `
	${rootCharacter?.character?.name ? `<div class="${"tf-tree tf-ancestor-tree tf-gap-lg"}"><ul>${validate_component(Tree_component, "TreeComponent").$$render($$result, { characterNode: rootCharacter }, {}, {})}</ul></div>` : ``}
`;
    }(__value);
  }(treeContent)}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-3fb106e5.js.map
