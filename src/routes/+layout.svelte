<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { isAuthenticated } from '$lib/store/auth';
	import { webVitals } from '$lib/vitals';
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import { inject } from '@vercel/analytics';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID as string;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});

		inject();
	}
</script>

{#if $isAuthenticated}
	<Navbar />
	<slot />
{:else}
	<slot />
{/if}
