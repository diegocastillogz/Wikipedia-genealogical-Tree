import { GenealogicalTree } from '../use-cases/genealogical-tree';

export const getGenealogicalTree = async (url: URL) => {
	const { searchParams } = url;
	const queryParam = searchParams.get('q') ?? '';

	const tree = new GenealogicalTree(queryParam);
	await tree.init();
	await tree.insertWithpreOrderIteration(tree.root);
	return await tree.getAllNodes();
};
