<script>
	import InputSearch from '../input-search/input-search.svelte';
</script>

<header>
	<a href="/">
		<h1>Wikipedia genealogical tree</h1>
	</a>
	<InputSearch />
</header>

<style>
	a {
		display: flex;
		align-items: center;
		text-align: left;
		cursor: pointer;
		width: 600px;
		text-decoration: none;
	}

	h1 {
		margin-bottom: 10px;
		width: 50vw;
		color: var(--primaryFont);
		margin: auto 0;
	}

	header {
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0px;
		padding: 10px 15px 5px;
		background-color: var(--secondary);
		z-index: 100;
		min-height: 60px;
	}
</style>
