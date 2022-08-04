<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatSpacesToUnderscore } from '../../utils/miscellaneous.utils';

	let inputValue = '';

	function changeURLwithSearch() {
		const queryParamFormattedInput = formatSpacesToUnderscore(inputValue);
		goto(`detail/?q=${queryParamFormattedInput}`);
	}
</script>

<div class="input-container">
	<label for="search-character">search a character</label>
	<input id="search-character" bind:value={inputValue} />
	<button on:click={changeURLwithSearch}>search</button>
</div>

<style>
	.input-container {
		position: sticky;
		top: 0;
		width: 100vw;
		background-color: white;
		z-index: 10;
	}
</style>
