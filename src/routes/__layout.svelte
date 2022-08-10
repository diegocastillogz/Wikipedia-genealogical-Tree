<script lang="ts">
	import Header from '../components/header/header.svelte';
</script>

<div class="layout">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
	}

	:global(main > div) {
		padding-bottom: 5rem;
	}

	:global(body, h1, h2, h3, p, ul, li, input) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
