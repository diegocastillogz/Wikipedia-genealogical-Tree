<script lang="ts">
	import type { Character } from 'src/types';

	export let image: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let bornDate: string | undefined = undefined;
	export let diedDate: string | undefined = undefined;
	export let causeofDeath: string | undefined = undefined;
	export let burial: string | undefined = undefined;
	export let parentsNames: string[] | undefined = [];
	export let parents: Character[] | undefined = [];
</script>

{#if name}
	<h2>{name}</h2>
{/if}

{#if image}
	<img src={image} alt={`${name} character`} />
{/if}

{#if causeofDeath}
	<p>{causeofDeath}</p>
{/if}

{#if bornDate}
	<p>{bornDate}</p>
{/if}

{#if diedDate}
	<p>{diedDate}</p>
{/if}

{#if burial}
	<p>{burial}</p>
{/if}

{#if parentsNames && parentsNames?.length > 0}
	<p>{parentsNames.toString()}</p>
{/if}

<style>
	img {
		border-radius: 50%;
		height: 200px;
		width: 200px;
		object-fit: contain;
		background-color: black;
	}
</style>
