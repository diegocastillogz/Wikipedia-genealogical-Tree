<script lang="ts">
	import { onMount } from 'svelte';
	import CharacterBox from '../character-box.svelte';
	import type { Node } from '../../use-cases/genealogical-tree';
	import { scrollToElement } from '../../utils/document-manipulation.utils';
	export let characterNode: Node;
	const mainCharacterElementId = characterNode?.character?.pageid?.toString();

	onMount(async () => {
		scrollToElement(mainCharacterElementId || '');
	});
</script>

{#if characterNode.character}
	<li>
		<CharacterBox character={characterNode.character} />
		{#if characterNode.parents.length > 0}
			<ul>
				{#each characterNode.parents as parent}
					{#if parent.parents}
						<svelte:self characterNode={parent} />
					{/if}
				{/each}
			</ul>
		{/if}
	</li>
{/if}

<style>
</style>
