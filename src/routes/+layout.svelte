<script lang="ts">
	import { isAuthenticated } from '$lib/store/auth';
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
</script>

{#if $isAuthenticated}
	<Navbar />
	<div class=" container m-auto py-[5rem]">
		<slot />
	</div>
{:else}
	<slot />
{/if}
