export type PageContent = {
	title?: string;
	pageid?: string;
	revisions?: Array<Revisions>;
};

export type Character = {
	name?: string;
	image?: string;
	bornDate?: string;
	diedDate?: string;
	burial?: string;
	causeofDeath?: string;
	parentsNames?: string[];
	parents?: Character[];
};

export type Revisions = {
	'*': string;
};
