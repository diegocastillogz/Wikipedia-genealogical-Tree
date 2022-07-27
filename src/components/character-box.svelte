<script lang="ts">
	import type { Character } from 'src/types';

	export let image: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let bornDate: string | undefined = undefined;
	export let diedDate: string | undefined = undefined;
	export let causeofDeath: string | undefined = undefined;
	export let burial: string | undefined = undefined;
</script>

<section class="tf-nc">
	<div class="node-text">
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
