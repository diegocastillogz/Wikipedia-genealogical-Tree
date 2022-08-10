<script>
	import InputSearch from '../input-search/input-search.svelte';
</script>

<header>
	<h1>Wikipedia genealogical tree</h1>
	<InputSearch />
</header>

<style>
	header {
		position: sticky;
		top: 0px;
		padding: 10px 15px 5px;
		background-color: white;
		z-index: 100;
	}
</style>
