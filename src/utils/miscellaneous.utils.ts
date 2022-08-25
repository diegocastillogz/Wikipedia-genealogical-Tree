export const removeWikipediaLink = (url: string | null | undefined) => url?.split('/wiki/')[1];

export const formatSpacesToUnderscore = (urlSearch: string): string =>
	urlSearch?.replace(/\s/g, '_');

export const cssVariables = (node: HTMLElement, variables: { [key: string]: string }) => {
	setCssVariables(node, variables);

	return {
		update(variables: { [key: string]: string }) {
			setCssVariables(node, variables);
		}
	};
};

const setCssVariables = (node: HTMLElement, variables: { [key: string]: string }) => {
	for (const name in variables) {
		node.style.setProperty(`--${name}`, variables[name]);
	}
};
