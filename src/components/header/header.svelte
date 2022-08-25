<script>
	import InputSearch from '../input-search/input-search.svelte';
</script>

<header>
	<h1>Wikipedia genealogical tree</h1>
	<InputSearch />
</header>

<style>
	h1 {
		margin-bottom: 10px;
		width: 50vw;
		color: var(--primaryFont);
	}

	header {
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0px;
		padding: 10px 15px 5px;
		background-color: var(--secondary);
		z-index: 100;
	}
</style>
