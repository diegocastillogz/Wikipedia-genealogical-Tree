<script lang="ts">
	import CharacterBox from '../character-box.svelte';
	import type { Node } from '../../use-cases/genealogical-tree';
	export let characterNode: Node;
</script>

{#if characterNode.character}
	<li>
		<CharacterBox {...characterNode.character} />
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
