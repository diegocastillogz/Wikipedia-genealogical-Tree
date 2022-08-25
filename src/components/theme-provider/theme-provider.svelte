<script lang="ts">
	import { cssVariables } from '../../utils/miscellaneous.utils';

	export const theme: { [key: string]: string } = {
		primary: '#0c1023',
		secondary: '#171e3a',
		terciary: '#303445',
		boxColor: '#191d30',
		primaryFont: '#fff',
		gray: '#585858',
		white: '#fff'
	};
</script>

<div use:cssVariables={theme}>
	<slot />
</div>
