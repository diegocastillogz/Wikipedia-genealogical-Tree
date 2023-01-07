<script lang="ts">
	import { navigating } from '$app/stores';
	import { page } from '$app/stores';

	import { getGenealogicalTreeRoot } from '../../controllers/get-genealogical-tree.controller';

	import TreeComponent from '../../components/tree-component/tree-component.svelte';
	import SpinnerComponent from '../../components/spinner/spinner.svelte';

	import type { Node } from '../../use-cases/genealogical-tree';

	const url = $page.url;

	let treeContent = {} as Promise<Node | undefined>;
	let queryParam = url?.searchParams.get('q') ?? '';

	if (queryParam) {
		treeContent = getGenealogicalTreeRoot(queryParam);
	}

	$: if ($navigating) {
		const queryParamTo = $navigating?.to?.url.searchParams.get('q') ?? '';
		const queryParamFrom = $navigating?.from?.url.searchParams.get('q') ?? '';

		if (queryParamFrom !== queryParamTo) {
			treeContent = getGenealogicalTreeRoot(queryParamTo);
		}
	}
</script>

{#await treeContent}
	<SpinnerComponent />
{:then rootCharacter}
	{#if rootCharacter?.character?.name}
		<div class="tf-tree tf-ancestor-tree tf-gap-lg">
			<ul>
				<TreeComponent characterNode={rootCharacter} />
			</ul>
		</div>
	{/if}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	:global(.tf-ancestor-tree) {
		position: relative;
	}
	:global(.tf-ancestor-tree > ul) {
		transform: rotateX(180deg);
	}
	:global(.tf-ancestor-tree li ul) {
		margin-bottom: 1em;
	}

	:global(
			.tf-tree .tf-nc:after,
			.tf-tree.tf-gap-lg li li:before,
			.tf-tree li li:last-child:before,
			.tf-tree.tf-gap-lg li > .tf-nc:before,
			.tf-tree li li:before
		) {
		background-color: var(--white) !important;
		border-color: var(--white) !important;
	}
</style>
