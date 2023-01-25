<script>
	import { fly } from 'svelte/transition';
	export let pathname = '';
</script>

{#key pathname}
	<div in:fly={{ y: -10, duration: 300 }} out:fly={{ duration: 300 }}>
		<slot />
	</div>
{/key}
