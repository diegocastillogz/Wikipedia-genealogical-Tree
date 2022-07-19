import { CHARACTER_KEYS } from '../constant';
import type { Character, PageContent } from '../types';

const createElementFromHTML = (htmlString: string, elementId: string = ''): HTMLElement => {
	const div = document.createElement('div');
	div.innerHTML = htmlString?.trim();
	div.setAttribute('id', elementId);
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
};

export const deleteElementFromHTML = (elementId: string) => {
	const elementToRemove = document.getElementById(elementId);
	elementToRemove?.remove();
};

const getCharacterImage = (elementId: string): string | undefined => {
	const imageElement: HTMLImageElement | null =
		document.getElementById(elementId)?.querySelector('.infobox-image img') ?? null;
	if (!imageElement) return;
	return imageElement.src;
};

const getRowElementByKey = (elementId: string, key: string): HTMLElement | null | undefined => {
	const thElementsInDivWithId = document.getElementById(elementId)?.getElementsByTagName('th');
	if (!thElementsInDivWithId) {
		return;
	}
	const thTagsElements = Array.from(thElementsInDivWithId);
	return thTagsElements?.find(({ innerText }) =>
		innerText?.toLowerCase().replace(/\s/g, '').includes(key)
	)?.nextElementSibling as HTMLElement;
};

export const formatUrlSearch = (urlSearch: string | undefined): string =>
	urlSearch?.replace(/\s/g, '_') || '';

const getElementText = (elementId: string, key: string): string | undefined =>
	getRowElementByKey(elementId, key)?.innerText || '';

const getParentsNames = (elementId: string): (string | undefined | null)[] | undefined => {
	const parentsNames: (string | undefined | null)[] = [];
	const listElementsParentsTags = getRowElementByKey(elementId, CHARACTER_KEYS.PARENTS);
	const listElementFatherTag = getRowElementByKey(elementId, CHARACTER_KEYS.FATHER);
	const listElementMotherTag = getRowElementByKey(elementId, CHARACTER_KEYS.MOTHER);

	if (listElementsParentsTags) {
		const listParentElements = Array.from(listElementsParentsTags.getElementsByTagName('a'))
			.map((value) => {
				const hrefValue = value?.getAttribute('href');
				if (isACiteNote(hrefValue)) return;
				return removeWikipediaLink(hrefValue);
			})
			.filter((value) => value);

		if (listParentElements) {
			parentsNames.push(...listParentElements);
		}
	}

	if (listElementFatherTag) {
		parentsNames.push(listElementFatherTag.innerText);
	}

	if (listElementMotherTag) {
		parentsNames.push(listElementMotherTag.innerText);
	}

	return parentsNames;
};

const getCharacterData = (elementId: string): Character => {
	const image = getCharacterImage(elementId);
	const bornDate = getElementText(elementId, CHARACTER_KEYS.BORN);
	const diedDate = getElementText(elementId, CHARACTER_KEYS.DIED);
	const causeofDeath = getElementText(elementId, CHARACTER_KEYS.CAUSE_OF_DEATH);
	const burial = getElementText(elementId, CHARACTER_KEYS.BURIAL);
	const parentsNames = getParentsNames(elementId);
	return { image, bornDate, diedDate, causeofDeath, burial, parentsNames } as Character;
};

export const formatBody = ({ revisions, title }: PageContent): Character => {
	const pageHtmlContent = revisions?.[0]?.['*'] || '';
	const elementId = title?.replace(/\s/g, '').toLocaleLowerCase() || 'createdElement';
	createElementFromHTML(pageHtmlContent, elementId);
	return { ...getCharacterData(elementId), name: title };
};

export const getRedirection = ({ revisions, title }: PageContent) => {
	const pageHtmlContent = revisions?.[0]?.['*'];
	if (
		!pageHtmlContent ||
		!pageHtmlContent?.includes(
			'<div class="mw-parser-output"><div class="redirectMsg"><p>Redirect to:</p><ul class="redirectText">'
		)
	)
		return;

	const createdRedirectionElement = createElementFromHTML(pageHtmlContent, title);
	const redirectionLink = createdRedirectionElement
		.querySelector('.redirectText li a')
		?.getAttribute('href');
	return removeWikipediaLink(redirectionLink);
};

const removeWikipediaLink = (url: string | null | undefined) => url?.split('/wiki/')[1];
const isACiteNote = (url: string | null | undefined) => url?.includes('#cite');
