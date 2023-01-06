<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import { goto } from '$app/navigation';
	import { scrollToElement } from '../../utils/document-manipulation.utils';
	import { page } from '$app/stores';

	import type { Character } from 'src/types';
	import type { Node } from '../../use-cases/genealogical-tree';

	export let character: Character | undefined = undefined;
	export let parents: Node[] | [] = [];
	const url = $page.url;

	const currentCharacterRootName = url?.searchParams.get('q') ?? '';

	const goToParent = (parentPosition: number) => {
		const selectedParent = parents[parentPosition];
		if (!selectedParent?.character?.pageid) return;
		selectedParent?.character?.pageid &&
			scrollToElement(selectedParent?.character?.pageid.toString(), 'smooth');
	};
</script>

{#if character?.name}
	<section class="tf-nc" id={character.pageid?.toString()}>
		<div class="node-text">
			<table>
				<tbody>
					{#if character.image}
						<img src={character.image} alt={`${character.name} character`} />
					{/if}
					{#if character.name}
						<h3>{character.name}</h3>
					{/if}

					<div class="text-container">
						{#if character.bornDate}
							<tr>
								<th><p>born</p></th>
								<td><p>{character.bornDate}</p></td>
							</tr>
						{/if}

						{#if character.diedDate}
							<tr>
								<th><p>died</p></th>
								<td><p>{character.diedDate}</p></td>
							</tr>
						{/if}

						{#if character.causeofDeath}
							<tr>
								<th><p>cause of death</p></th>
								<td><p>{character.causeofDeath}</p></td>
							</tr>
						{/if}

						{#if character.burial}
							<tr>
								<th><p>cause of death</p></th>
								<td><p>{character.burial}</p></td>
							</tr>
						{/if}
					</div>

					<div class="character-actions">
						{#if character?.parentsNames?.[0]}
							<button class="father" on:click={() => goToParent(0)}
								><Icon iconName="genderMale" /></button
							>
						{/if}

						{#if character?.parentsNames?.[1]}
							<button class="mother" on:click={() => goToParent(1)}
								><Icon iconName="genderFemale" /></button
							>
						{/if}
						<a
							class="wikipedia"
							target="_blank"
							rel="noreferrer"
							href={`https://en.wikipedia.org/?curid=${character.pageid}`}
							><Icon iconName="wikipedia" /></a
						>

						{#if character?.pageName && currentCharacterRootName !== character.pageName}
							<button
								class="tree"
								on:click={() => {
									goto(`detail/?q=${character?.pageName}`);
								}}><Icon iconName="tree" /></button
							>
						{/if}
					</div>
				</tbody>
			</table>
		</div>
	</section>
{/if}

<style>
	section {
		max-height: 650px;
		color: var(--primaryFont);
		background-color: var(--boxColor);
		width: 300px;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		border-radius: 12px;
	}

	img {
		border-radius: 50%;
		height: 120px;
		width: 120px;
		object-fit: cover;
		object-position: top;
		background-color: var(--black);
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
		align-items: baseline;
		width: 100%;
		margin-bottom: 18px;
	}

	.node-text th {
		width: 30%;
		text-align: left;
		font-size: 14px;
		text-transform: capitalize;
	}
	.node-text td {
		width: 70%;
		text-align: right;
		font-size: 12px;
		color: var(--white);
		opacity: 0.4;
	}

	.text-container {
		margin-top: 1rem;
	}

	h3 {
		text-transform: uppercase;
		font-size: 12px;
	}

	.character-actions {
		display: flex;
		justify-content: space-between;
	}

	button,
	a {
		padding: 6px;
		border: none;
		border-radius: 5px;
	}

	.father {
		background-color: var(--purple);
	}

	.wikipedia {
		background-color: var(--blue);
	}

	.mother {
		background-color: var(--aquablue);
	}

	.tree {
		background-color: var(--red);
	}
</style>
