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

	/*
	Each generation is a power of 2 so we're loading the first 6 generations to not break the app because there are too many requests
	*/
	MAX_FIRST_LOAD_PARIENTS = Math.pow(2, 6);

	constructor(characterName: string) {
		this.characterName = characterName;
	}

	getRequestedPagesId = () => this.requestedPagesId;

	init = async () => {
		const character = await getCharacterInfo(this.characterName || '');
		const rootNode = new Node({ character } as Node);
		this.root = await this.insert(rootNode);
	};

	isMaxParientsReached = () => this.requestedPagesId.length === this.MAX_FIRST_LOAD_PARIENTS;

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

	insertWithBFSIteration = async (root?: Node) => {
		const queue: Node[] = [] as Node[];
		let current: Node | undefined = root;

		if (!current) return;

		queue.push(current);
		while (queue.length > 0) {
			current = queue.shift();
			if (!current || this.isMaxParientsReached()) break;
			current = await this.insert(current);

			if (current?.parents[0]) queue.push(current?.parents[0]);
			if (current?.parents[1]) queue.push(current?.parents[1]);
		}
	};
}
