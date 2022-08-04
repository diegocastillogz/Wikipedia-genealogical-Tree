import { deleteUselessElementsInDocument } from '../utils/document-manipulation.utils';
import { GenealogicalTree } from '../use-cases/genealogical-tree';

export const getGenealogicalTreeRoot = async (queryParam: string) => {
	const tree = new GenealogicalTree(queryParam);
	await tree.init();
	await tree.insertWithBFSIteration(tree.root);

	deleteUselessElementsInDocument(
		tree.requestedPagesId.map((requestePageId) => requestePageId.toString())
	);

	return tree.root;
};
