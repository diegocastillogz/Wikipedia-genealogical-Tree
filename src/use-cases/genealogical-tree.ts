import type { Character } from '../types';
import { getCharacterParentsInfo, getCharacterInfo } from '../routes/api/api.utils';

export class Node {
	character?: Character;
	parents: Node[] | [];

	constructor(node?: Node) {
		this.character = node?.character || ({} as Character);
		this.parents = [];
	}
}

export class GenealogicalTree {
	root?: Node;
	characterName?: string;
	requestedPagesId: number[] = [];
	MAX_PARIENTS = 50;

	constructor(characterName: string) {
		this.characterName = characterName;
	}

	getRequestedPagesId = () => this.requestedPagesId;

	init = async () => {
		const character = await getCharacterInfo(this.characterName || '');
		const rootNode = new Node({ character } as Node);
		this.root = await this.insert(rootNode);
	};

	isMaxParientsReached = () => this.requestedPagesId.length === this.MAX_PARIENTS;
	isHalfParientsReached = () => this.requestedPagesId.length === this.MAX_PARIENTS / 2;

	insert = async (currentNode: Node): Promise<Node | undefined> => {
		if (!currentNode) return;
		if (
			currentNode?.character?.pageid &&
			this.requestedPagesId.includes(currentNode?.character?.pageid)
		) {
			return currentNode;
		}
		const parents = await getCharacterParentsInfo(currentNode?.character?.parentsNames || []);
		if (parents && currentNode?.parents) {
			const newParents = parents.map(
				(character: Character) => ({ character, parents: [] } as Node)
			);
			currentNode.parents = newParents;
		}
		if (currentNode?.character?.pageid) {
			this.requestedPagesId.push(currentNode?.character?.pageid);
		}
		return currentNode;
	};

	insertWithpreOrderIteration = async (
		currentNode: Node | undefined
	): Promise<Node | undefined> => {
		if (!currentNode || this.isMaxParientsReached()) {
			return;
		}

		if (
			!currentNode?.parents?.[0]?.character &&
			!currentNode?.parents?.[1]?.character &&
			currentNode.character?.name
		) {
			currentNode = await this.insert(currentNode);
		}
		if (currentNode?.parents?.[0]) {
			await this.insertWithpreOrderIteration(currentNode?.parents?.[0]);
		}
		if (currentNode?.parents?.[1]) {
			await this.insertWithpreOrderIteration(currentNode?.parents?.[1]);
		}
	};

	static getTreeByPreOrder = (root: Node): Character[] => {
		function getPreorderIteration(currentNode: Node | undefined) {
			if (currentNode?.character) nodesStack.push(currentNode.character);
			if (currentNode?.parents?.[0]) getPreorderIteration(currentNode?.parents?.[0]);
			if (currentNode?.parents?.[1]) getPreorderIteration(currentNode?.parents?.[1]);
		}
		const nodesStack: Character[] = [] as Character[];
		getPreorderIteration(root);
		return nodesStack;
	};
}
