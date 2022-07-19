// https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&pageids=2731583&rvsection=0&rvparse

const API = 'https://en.wikipedia.org/w/api.php?action=query&';
const CORS = '&origin=*';

export const getPageContent = async (query: string): Promise<Response> =>
	await fetch(`${API}${query}${CORS}`);
