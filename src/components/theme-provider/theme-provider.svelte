<script lang="ts">
	import { cssVariables } from '../../utils/miscellaneous.utils';

	export const theme: { [key: string]: string } = {
		primary: '#0c1023',
		secondary: '#171e3a',
		terciary: '#303445',
		boxColor: '#191d30',
		primaryFont: '#fff',
		gray: '#585858',
		white: '#fff',
		purple: '#5965f9',
		blue: '#007bff',
		aquablue: '#17a2b8',
		red: '#ff5959'
	};
</script>

<div use:cssVariables={theme}>
	<slot />
</div>
