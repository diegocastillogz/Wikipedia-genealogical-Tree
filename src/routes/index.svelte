<script lang="ts">
	import CharacterBox from '../components/character-box.svelte';
	import { page } from '$app/stores';
	import { getGenealogicalTree } from '../controllers/get-genealogical-tree.controller';

	const url = $page.url;
	let characterContent = getGenealogicalTree(url);
</script>

<div>
	{#await characterContent}
		<p>...loading</p>
	{:then characters}
		{#each characters as character}
			<CharacterBox {...character} />
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
</style>
