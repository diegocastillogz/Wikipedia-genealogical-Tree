# Wikipedia genealogical tree

## Following steps

- add light theme
- left menu with the characters and search bar to improve UX
- saving most searched characters on db
- at least responsive top menu
<!--
	TODO -- Add modal or something to see sons or brothers
	TODO -- When the user clicks on a character leaf it should request its father if they exist and add them to the store
-->
- add an index page with the most searched

## What I'm using on this project

- DOM manipulation with the input from the Wikipedia API
- Nested promises using the ancestors of a character
- Svelte stores saving the tree of the character on it
- Svelte routes
- Javascript classes
- Recursive calling drawing the character nodes with svelte:self
