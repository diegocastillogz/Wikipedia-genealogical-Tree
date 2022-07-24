import { GET } from './get-page-content';
import { formatBody, formatUrlSearch } from '../../utils/document-manipulation.utils';
import type { Character, PageContent } from '../../types';
import type { Node } from '../../use-cases/genealogical-tree';

export const getCharacterInfo = async (characterName: string): Promise<Character | undefined> => {
	const parentUrlFormat = formatUrlSearch(characterName);
	const { body } = await GET(parentUrlFormat);
	return formatBody(body || ({} as PageContent));
};

export const getCharacterParentsInfo = async (
	parentsNames: string[] | undefined
): Promise<Character[] | undefined> => {
	if (!parentsNames) return;
	if (parentsNames && parentsNames?.length <= 0) return;
	return await Promise.all(
		parentsNames?.map(async (ancestorName: string) => {
			return (await getCharacterInfo(ancestorName)) || ({} as Character);
		})
	);
};

export const getCharacterCompleteInfo = async (
	parentsNames: string[] | undefined
): Promise<Node> => {
	const parents = await getCharacterParentsInfo(parentsNames);
	return {
		left: ({ character: parents?.[0] } as Node) || ({} as Node),
		right: ({ character: parents?.[1] } as Node) || ({} as Node)
	} as Node;
};
