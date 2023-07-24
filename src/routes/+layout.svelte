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

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-VF05ZGWGWD"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-VF05ZGWGWD');
	</script>
</svelte:head>
<Navbar />
<slot />
