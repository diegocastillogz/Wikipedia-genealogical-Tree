<script lang="ts">
	import { GET } from './api/get-page-content';
	import CharacterBox from '../components/character-box.svelte';
	import { page } from '$app/stores';
	import { formatBody, formatUrlSearch } from '../utils';
	import type { Character, PageContent } from '../types';

	const url = $page.url;

	const getPageContentPromise = async (): Promise<Character> => {
		const { searchParams } = url;
		const queryParam = searchParams.get('q') ?? '';

		const { pageContent } = await GET(queryParam);
		const formatedCharacter = formatBody(pageContent || ({} as PageContent));

		if (formatedCharacter.parentsNames) {
			formatedCharacter.parents = await Promise.all(
				formatedCharacter.parentsNames?.map(
					async (parentName) => await getCharactersParentsInfo(parentName)
				)
			);
		}
		return formatedCharacter;
	};

	let characterContent = getPageContentPromise();

	const getCharactersParentsInfo = async (characterName: string): Promise<Character> => {
		const parentUrlFormat = formatUrlSearch(characterName);
		const { pageContent } = await GET(parentUrlFormat);
		return formatBody(pageContent || ({} as PageContent));
	};
</script>

<div>
	{#await characterContent then characterInfo}
		<CharacterBox {...characterInfo} />
		{#if characterInfo.parents && characterInfo.parents?.length > 0}
			{#each characterInfo.parents as parentCharacter}
				<CharacterBox {...parentCharacter} />
			{/each}
		{/if}
	{/await}
</div>

<style>
</style>
