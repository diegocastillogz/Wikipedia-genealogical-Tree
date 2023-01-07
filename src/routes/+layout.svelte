<script lang="ts">
	import Header from '../components/header/header.svelte';
	import ThemeProvider from '../components/theme-provider/theme-provider.svelte';
	import { page } from '$app/stores';
	let url: URL;
	$: url = $page.url;
</script>

<ThemeProvider>
	<div class="layout">
		{#if url.pathname !== '/'}
			<Header />
		{/if}
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
		height: 100vh;
		overflow: hidden;
	}

	:global(html, body) {
		height: 100vh;
	}

	:global(main) {
		min-height: calc(100vh - 76px);
		overflow: hidden;
	}

	:global(main > div) {
		padding-bottom: 5rem;
		height: 100%;
	}

	:global(body, h1, h2, h3, p, ul, li, input) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
