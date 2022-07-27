<script lang="ts">
	import TreeComponent from '../components/tree-component/tree-component.svelte';
	import { page } from '$app/stores';
	import { getGenealogicalTreeRoot } from '../controllers/get-genealogical-tree.controller';

	const url = $page.url;
	let treeContent = getGenealogicalTreeRoot(url);
</script>

<div>
	{#await treeContent}
		<p>...loading</p>
	{:then rootCharacter}
		{#if rootCharacter}
			<div class="tf-tree tf-ancestor-tree tf-gap-lg">
				<ul>
					<TreeComponent characterNode={rootCharacter} />
				</ul>
			</div>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

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
</style>
