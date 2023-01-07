<script lang="ts">
	import { goto } from '$app/navigation';

	import type { Character } from 'src/types';

	export let character: Character | undefined = undefined;
</script>

{#if character?.name}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<section
		class="index-character-box"
		id={character.pageid?.toString()}
		on:click={() => goto(`detail/?q=${character?.pageName}`)}
	>
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
					</div>
				</tbody>
			</table>
		</div>
	</section>
{/if}

<style>
	.index-character-box {
		cursor: pointer;
		color: var(--primaryFont);
		background-color: var(--boxColor);
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		border-radius: 12px;
		height: 350px;
		width: 250px;
		position: absolute;
		left: -300px;
		top: 380px;
		opacity: 0;
	}

	.index-character-box:nth-child(2) {
		animation: move-in-left-out-right 28s linear infinite;
		background-color: var(--purple);
	}

	.index-character-box:nth-child(3) {
		animation: move-in-left-out-right 28s linear 4s infinite;
		background-color: var(--red);
	}

	.index-character-box:nth-child(4) {
		animation: move-in-left-out-right 28s linear 8s infinite;
		background-color: var(--aquablue);
	}

	.index-character-box:nth-child(5) {
		animation: move-in-left-out-right 28s linear 12s infinite;
		background-color: var(--white);
		color: var(--black);
	}

	.index-character-box:nth-child(6) {
		animation: move-in-left-out-right 28s linear 16s infinite;
		background-color: var(--pink);
	}

	.index-character-box:nth-child(7) {
		animation: move-in-left-out-right 28s linear 20s infinite;
		background-color: var(--yellow);
		color: var(--black);
	}

	.index-character-box:nth-child(8) {
		animation: move-in-left-out-right 28s linear 24s infinite;
		background-color: var(--green);
		color: var(--black);
	}

	@keyframes move-in-left-out-right {
		15%,
		75% {
			opacity: 1;
		}

		100% {
			transform: translateX(calc(100vw + 400px));
			opacity: 0;
		}
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
		opacity: 0.8;
	}

	.text-container {
		margin-top: 1rem;
	}

	h3 {
		text-transform: uppercase;
		font-size: 12px;
	}
</style>
