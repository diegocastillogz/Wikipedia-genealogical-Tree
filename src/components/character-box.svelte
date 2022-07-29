<script lang="ts">
	import type { Character } from 'src/types';

	export let character: Character;
</script>

<section class="tf-nc" id={character.pageid?.toString()}>
	<div class="node-text">
		{#if character.name}
			<h2>{character.name}</h2>
		{/if}

		{#if character.image}
			<img src={character.image} alt={`${character.name} character`} />
		{/if}

		{#if character.causeofDeath}
			<p>{character.causeofDeath}</p>
		{/if}

		{#if character.bornDate}
			<p>{character.bornDate}</p>
		{/if}

		{#if character.diedDate}
			<p>{character.diedDate}</p>
		{/if}

		{#if character.burial}
			<p>{character.burial}</p>
		{/if}
	</div>
</section>

<style>
	section {
		height: 450px;
		width: 300px;
	}

	img {
		border-radius: 50%;
		height: 200px;
		width: 200px;
		object-fit: contain;
		background-color: black;
	}
	.node-text {
		display: inline-block;
		transform: rotateX(180deg);
	}
</style>
