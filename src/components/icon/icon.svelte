<script lang="ts">
	import GenderMaleIcon from '../../assets/icons/gender-male.svelte';
	import GenderFemaleIcon from '../../assets/icons/gender-female.svelte';
	import GenderWikipediaIcon from '../../assets/icons/wikipedia.svelte';
	import TreeIcon from '../../assets/icons/tree.svelte';

	export let iconName: 'genderMale' | 'genderFemale' | 'wikipedia' | 'tree';

	const Icons = {
		genderMale: GenderMaleIcon,
		genderFemale: GenderFemaleIcon,
		wikipedia: GenderWikipediaIcon,
		tree: TreeIcon
	};
</script>

<div class="icon">
	<svelte:component this={Icons[iconName]} />
</div>

<style>
	.icon,
	.icon :global(svg) {
		margin: 0 auto;
		width: 20px;
		height: 20px;
	}
</style>
