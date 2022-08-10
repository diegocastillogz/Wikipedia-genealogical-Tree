<script lang="ts">
	import type { Character } from 'src/types';
	import type { Node } from '../../use-cases/genealogical-tree';
	import { scrollToElement } from '../../utils/document-manipulation.utils';

	export let character: Character | undefined = undefined;
	export let parents: Node[] | [] = [];

	const goToParent = (father: boolean = true) => {
		const selectedParent = father ? parents[0].character : parents[1].character;
		if (!selectedParent) return;
		selectedParent?.pageid && scrollToElement(selectedParent.pageid.toString(), 'smooth');
	};
</script>

<!--
	TODO -- Add buttons to redirect to mother and father if they exist 
	TODO -- Add ocuppation to shown data
	TODO -- Add modal or something to see sons or brothers
	TODO -- When the user clicks pn a character leaf it should request its father if they exist and add them to the store
-->

{#if character}
	<section class="tf-nc" id={character.pageid?.toString()}>
		<div class="node-text">
			<table>
				<tbody>
					{#if character.name}
						<h2 on:click={() => goToParent()}>{character.name}</h2>
					{/if}

					{#if character.image}
						<img
							on:click={() => goToParent(false)}
							src={character.image}
							alt={`${character.name} character`}
						/>
					{/if}

					{#if character.bornDate}
						<tr>
							<th>born</th>
							<td>{character.bornDate}</td>
						</tr>
					{/if}

					{#if character.diedDate}
						<tr>
							<th>died</th>
							<td>{character.diedDate}</td>
						</tr>
					{/if}

					{#if character.causeofDeath}
						<tr>
							<th>cause of death</th>
							<td>{character.causeofDeath}</td>
						</tr>
					{/if}

					{#if character.burial}
						<tr>
							<th>cause of death</th>
							<td>{character.burial}</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
	</section>
{/if}

<style>
	section {
		max-height: 650px;
		width: 300px;
	}

	img {
		border-radius: 50%;
		height: 200px;
		width: 200px;
		object-fit: contain;
		background-color: black;
		margin-bottom: 15px;
	}
	.node-text {
		display: inline-block;
		transform: rotateX(180deg);
		text-align: center;
		padding: 12px 6px;
	}

	.node-text table {
		table-layout: fixed;
		width: 100%;
	}

	.node-text tr {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 18px;
	}

	.node-text th {
		width: 30%;
		text-align: left;
		font-size: 14px;
	}
	.node-text td {
		width: 70%;
		text-align: right;
		font-size: 12px;
	}
</style>
