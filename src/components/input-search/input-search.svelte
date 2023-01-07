<script lang="ts">
	import { goto } from '$app/navigation';

	import { getAutocompleteSearch } from '../../routes/api/get-page-content';

	import { formatSpacesToUnderscore } from '../../utils/miscellaneous.utils';

	import type { AutocompleteSearchResult } from '../../types';

	let inputValue = '';
	let autoCompleteSearchResults: AutocompleteSearchResult[] = [];

	const changeURLwithSearch = (listTitle: string) => {
		const queryParamFormattedInput = formatSpacesToUnderscore(listTitle);
		goto(`detail/?q=${queryParamFormattedInput}`);
		inputValue = '';
		autoCompleteSearchResults = [];
	};

	const getAutocomplete = async () => {
		autoCompleteSearchResults = [];
		if (inputValue.length >= 3) {
			const { body = [] } = await getAutocompleteSearch(inputValue);
			autoCompleteSearchResults = body;
		}
	};

	$: inputValue && getAutocomplete();
</script>

<div class="input-container">
	<input
		id="search-character"
		bind:value={inputValue}
		on:keyup={getAutocomplete}
		placeholder="Search for a character"
	/>
	{#if autoCompleteSearchResults?.length > 0}
		<ul class="autocomplete-list">
			{#each autoCompleteSearchResults as result}
				<li>
					<button
						class="autocomplete-list-item-button"
						on:click={() => changeURLwithSearch(result.title)}
					>
						<p>{result.title}</p>
						<p>{@html result.snippet}</p>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.input-container {
		position: relative;
		margin: auto;
		display: flex;
		justify-content: center;
	}
	.input-container input {
		line-height: 1.5;
		width: 40%;
		font-size: 16px;
		padding: 6px 12px;
		width: 50vw;
		background-color: var(--terciary);
		color: var(--white);
	}

	.autocomplete-list {
		position: absolute;
		z-index: 100;
		width: 100%;
		opacity: 0.9;
	}

	.autocomplete-list li {
		list-style: none;
	}

	.autocomplete-list-item-button {
		padding: 12px 8px;
		background-color: white;
		border: none;
		width: 100%;
		text-align: left;
	}

	.autocomplete-list-item-button:hover {
		background-color: grey;
	}

	.autocomplete-list button p:first-of-type {
		font-size: 14px;
		font-weight: 500;
	}

	.autocomplete-list button p:last-of-type {
		font-size: 12px;
	}
</style>
