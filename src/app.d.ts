/// <reference types="@sveltejs/kit" />
declare namespace svelte.JSX {
	interface HTMLProps<T> {
		// If you want to use on:beforeinstallprompt
		onbeforeinstallprompt?: (event: any) => any;
		// If you want to use myCustomAttribute={..} (note: all lowercase)
		mycustomattribute?: any;
		// You can replace any with something more specific if you like
	}
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
