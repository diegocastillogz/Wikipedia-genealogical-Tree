<script lang="ts">
	import { getCharacterInfo } from './api/api.utils';
	import { onMount } from 'svelte';
	import indexCharacters from '../mocks/indexCharacters.json';
	import IndexCharacterBox from '../components/index-character-box/index-character-box.svelte';
	import type { Character } from '../types';
	import InputSearch from '../components/input-search/input-search.svelte';

	export let characters: (Character | undefined)[] = [];

	onMount(async () => {
		characters = await Promise.all(
			indexCharacters.map(async (indexCharacter) => await getCharacterInfo(indexCharacter))
		);
	});
</script>

<div class="index-container">
	<div>
		<h1>Wikipedia genealogical tree</h1>
		<h2>
			Now you can search your favorite character's genealogical tree using the info on Wikipedia
			just with one click !!
		</h2>
		<InputSearch />
	</div>

	{#each characters as character}
		<IndexCharacterBox {character} />
	{/each}
</div>

<style>
	h1 {
		color: var(--primaryFont);
		margin: 50px auto 80px;
		font-size: 70px;
	}

	h2 {
		color: var(--primaryFont);
		font-size: 20px;
		font-weight: 300;
		margin-bottom: 20px;
	}

	.index-container {
		text-align: center;
		position: relative;
		display: flex;
		justify-content: center;
		height: 100%;
		padding: 0px 40px;
	}

	:global(main) {
		overflow: hidden;
	}
</style>
