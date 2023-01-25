import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({
		replace: [
			// this will allow us to use is in the code as import.meta.env.VERCEL_ANALYTICS_ID
			['import.meta.env.VERCEL_ANALYTICS_ID', JSON.stringify(process.env.VERCEL_ANALYTICS_ID)]
		]
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
