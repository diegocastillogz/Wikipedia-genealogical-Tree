//https://en.wikipedia.org/w/api.php?action=parse&page=Adolf_Hitler&prop=text&formatversion=2

import type { PageContent } from '../../types';
import { getRedirection } from '../../utils/document-manipulation.utils';

const API = 'https://en.wikipedia.org/w/api.php?&format=json';
const FORMAT_VERSION = 'formatversion=2';
const CORS = 'origin=*';

const getPageByTitle = async (
	title: string
): Promise<{ status: number; pageContent?: PageContent; redirection?: string }> => {
	const response = await fetch(
		`${API}&action=parse&page=${title}&prop=text&${FORMAT_VERSION}&${CORS}`
	);
	const { parse: pageContent }: { parse: PageContent } = await response.json();
	const redirection = getRedirection(pageContent);
	if (redirection) return { status: 200, redirection };
	return { status: 200, pageContent: pageContent };
};

export const GET = async (
	searchParam: string | { url: URL }
): Promise<{
	body?: PageContent;
	status?: number;
	message?: string;
}> => {
	try {
		let searchParamFormatted = '';
		if (typeof searchParam !== 'string') {
			searchParamFormatted = searchParam?.url?.searchParams.get('q') || '';
		} else {
			searchParamFormatted = searchParam;
		}
		const { redirection, status, pageContent } = await getPageByTitle(searchParamFormatted);
		if (!redirection) return { status, body: pageContent };
		const response = await getPageByTitle(redirection);
		return { status: response?.status, body: response?.pageContent };
	} catch (error) {
		const typedError = error as Error;
		return { status: 403, message: typedError?.message || '' };
	}
};
