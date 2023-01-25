<script lang="ts">
	import { isAuthenticated } from '$lib/store/auth';
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
</script>

{#if $isAuthenticated}
	<Navbar />
	<div class=" container rounded-md m-auto my-[5rem] bg-white p-8">
		<slot />
	</div>
{:else}
	<slot />
{/if}
