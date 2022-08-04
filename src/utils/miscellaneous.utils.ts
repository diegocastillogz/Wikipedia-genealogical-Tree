export const removeWikipediaLink = (url: string | null | undefined) => url?.split('/wiki/')[1];

export const formatSpacesToUnderscore = (urlSearch: string): string =>
	urlSearch?.replace(/\s/g, '_');
