export type PageContent = {
	title: string;
	pageid: number;
	text: string;
};

export type Character = {
	pageid?: number;
	name?: string;
	image?: string;
	bornDate?: string;
	diedDate?: string;
	burial?: string;
	causeofDeath?: string;
	parentsNames?: string[];
	parents: Character[];
};

export type AutocompleteSearchResult = {
	title: string;
	pageId: number;
	snippet: string;
};
