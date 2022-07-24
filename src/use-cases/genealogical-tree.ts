import type { Character } from '../types';
import { getCharacterParentsInfo, getCharacterInfo } from '../routes/api/api.utils';

export class Node {
	character?: Character | undefined;
	left?: Node | null;
	right?: Node | null;
	constructor(node?: Node) {
		this.character = node?.character || ({} as Character);
		this.left = null;
		this.right = null;
	}
}

export class GenealogicalTree {
	root?: Node;
	characterName?: string;
	requestedPageId: number[] = [];

	constructor(characterName: string) {
		this.characterName = characterName;
	}

	init = async () => {
		const character = await getCharacterInfo(this.characterName || '');
		this.root = await this.insert(new Node({ character }));
	};

	insert = async (currentNode: Node): Promise<Node | undefined> => {
		if (
			currentNode?.character?.pageid &&
			this.requestedPageId.includes(currentNode?.character?.pageid)
		) {
			return currentNode;
		}
		const parents = await getCharacterParentsInfo(currentNode?.character?.parentsNames || []);
		currentNode.left = { character: parents?.[0] };
		currentNode.right = { character: parents?.[1] };
		if (currentNode?.character?.pageid) this.requestedPageId.push(currentNode?.character?.pageid);
		return currentNode;
	};

	insertWithpreOrderIteration = async (
		currentNode: Node | undefined
	): Promise<Node | undefined> => {
		if (!currentNode || this.requestedPageId.length === 10) {
			return;
		}

		if (!currentNode?.left && !currentNode?.right && currentNode.character?.name) {
			currentNode = await this.insert(currentNode);
		}
		if (currentNode?.left) {
			await this.insertWithpreOrderIteration(currentNode?.left);
		}
		if (currentNode?.right) {
			await this.insertWithpreOrderIteration(currentNode?.right);
		}
	};

	getAllNodes = (): Character[] => {
		function getPreorderIteration(currentNode: Node | undefined) {
			if (currentNode?.character) nodesStack.push(currentNode.character);
			if (currentNode?.left) getPreorderIteration(currentNode.left);
			if (currentNode?.right) getPreorderIteration(currentNode.right);
		}
		const nodesStack: Character[] = [] as Character[];
		getPreorderIteration(this.root);
		return nodesStack;
	};
}
