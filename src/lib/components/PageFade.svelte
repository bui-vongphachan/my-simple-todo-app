<script>
	import { fly } from 'svelte/transition';
</script>

<div in:fly={{ y: -10, duration: 300 }}>
	<slot />
</div>
