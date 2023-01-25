<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import '../app.css';
	import { inject } from '@vercel/analytics';
	import Navbar from '$lib/components/Navbar.svelte';

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

<Navbar />
<slot />
