import { c as create_ssr_component, v as validate_component, b as add_attribute, e as each, d as escape } from './index-1d0ab795.js';

const css$2 = {
  code: ".input-container.svelte-j8v1hc.svelte-j8v1hc{position:relative}.input-container.svelte-j8v1hc input.svelte-j8v1hc{line-height:1.5;width:40%;font-size:16px;padding:6px 12px;width:50vw;background-color:var(--terciary);color:var(--white)}.autocomplete-list.svelte-j8v1hc.svelte-j8v1hc{position:absolute;z-index:100;width:100%;opacity:0.9}.autocomplete-list.svelte-j8v1hc li.svelte-j8v1hc{list-style:none}.autocomplete-list-item-button.svelte-j8v1hc.svelte-j8v1hc{padding:12px 8px;background-color:white;border:none;width:100%;text-align:left}.autocomplete-list-item-button.svelte-j8v1hc.svelte-j8v1hc:hover{background-color:grey}.autocomplete-list.svelte-j8v1hc button p.svelte-j8v1hc:first-of-type{font-size:14px;font-weight:500}.autocomplete-list.svelte-j8v1hc button p.svelte-j8v1hc:last-of-type{font-size:12px}",
  map: null
};
const Input_search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let inputValue = "";
  let autoCompleteSearchResults = [];
  $$result.css.add(css$2);
  return `<div class="${"input-container svelte-j8v1hc"}"><input id="${"search-character"}" placeholder="${"Search for a character"}" class="${"svelte-j8v1hc"}"${add_attribute("value", inputValue, 0)}>
	${autoCompleteSearchResults?.length > 0 ? `<ul class="${"autocomplete-list svelte-j8v1hc"}">${each(autoCompleteSearchResults, (result) => {
    return `<li class="${"svelte-j8v1hc"}"><button class="${"autocomplete-list-item-button svelte-j8v1hc"}"><p class="${"svelte-j8v1hc"}">${escape(result.title)}</p>
						<p class="${"svelte-j8v1hc"}"><!-- HTML_TAG_START -->${result.snippet}<!-- HTML_TAG_END --></p></button>
				</li>`;
  })}</ul>` : ``}
</div>`;
});
const css$1 = {
  code: "h1.svelte-13jlgvy{margin-bottom:10px;width:50vw;color:var(--primaryFont)}header.svelte-13jlgvy{display:flex;justify-content:space-between;position:sticky;top:0px;padding:10px 15px 5px;background-color:var(--secondary);z-index:100}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<header class="${"svelte-13jlgvy"}"><h1 class="${"svelte-13jlgvy"}">Wikipedia genealogical tree</h1>
	${validate_component(Input_search, "InputSearch").$$render($$result, {}, {}, {})}
</header>`;
});
const Theme_provider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const theme = {
    primary: "#0c1023",
    secondary: "#171e3a",
    terciary: "#303445",
    boxColor: "#191d30",
    primaryFont: "#fff",
    gray: "#585858",
    white: "#fff",
    purple: "#5965f9",
    blue: "#007bff",
    aquablue: "#17a2b8",
    red: "#ff5959"
  };
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
const css = {
  code: ".layout.svelte-14457m5{display:flex;flex-direction:column;background-color:var(--primary);min-height:100vh}main > div{padding-bottom:5rem}body, h1, h2, h3, p, ul, li, input{margin:0;padding:0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,\n			'Open Sans', 'Helvetica Neue', sans-serif}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const prerender = true;
  if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0)
    $$bindings.prerender(prerender);
  $$result.css.add(css);
  return `${validate_component(Theme_provider, "ThemeProvider").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="${"layout svelte-14457m5"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
		<main>${slots.default ? slots.default({}) : ``}</main></div>`;
    }
  })}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-1e51e576.js.map
