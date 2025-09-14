import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Static adapter for GitHub Pages deployment
		adapter: adapter({
			// Pages are generated here
			pages: 'build',
			// Assets are placed here
			assets: 'build',
			// Fallback page for SPAs
			fallback: undefined,
			// Precompress files
			precompress: false,
			// Strict mode ensures all pages are prerendered
			strict: true
		}),
		// Uncomment and update if deploying to a subpath like /exhibit-a
		// paths: {
		// 	base: '/exhibit-a'
		// }
	}
};

export default config;
