<script lang="ts">
	import Header from '../components/header/header.svelte';
	import ThemeProvider from '../components/theme-provider/theme-provider.svelte';
</script>

<ThemeProvider>
	<div class="layout">
		<Header />
		<main>
			<slot />
		</main>
	</div>
</ThemeProvider>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		background-color: var(--primary);
		min-height: 100vh;
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
