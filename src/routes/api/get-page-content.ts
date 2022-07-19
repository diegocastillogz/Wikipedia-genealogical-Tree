//prop=revisions&rvprop=content&format=json&pageids=${pageId}&rvsection=0&rvparse

import type { PageContent } from '../../types';
import { getRedirection } from '../../utils';

const API = 'https://en.wikipedia.org/w/api.php?action=query&';
const CORS = '&origin=*';

const getPageByTitle = async (
	title: string
): Promise<{ status: number; pageContent?: PageContent; redirection?: string }> => {
	const response = await fetch(
		`${API}?action=query&prop=revisions&rvprop=content&format=json&titles=${title}&rvsection=0&rvparse&${CORS}`
	);
	const { query } = await response.json();
	const [pageContent] = Object.keys(query.pages).map((key) => query.pages[key]);
	const redirection = getRedirection(pageContent);
	if (redirection) return { status: 200, redirection };
	return { status: 200, pageContent };
};

export const GET = async (
	searchParam: string
): Promise<{
	pageContent?: PageContent;
	status?: number;
	message?: string;
}> => {
	try {
		const { redirection, status, pageContent } = await getPageByTitle(searchParam);
		if (!redirection) return { status, pageContent };

		const response = await getPageByTitle(redirection);
		return { status: response?.status, pageContent: response?.pageContent };
	} catch (error) {
		const typedError = error as Error;
		return { status: 403, message: typedError?.message || '' };
	}
};
