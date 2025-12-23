import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
			base: '/Eventus-Estates'
			// ⚠️ DO NOT set assets for GitHub Pages
		}
	}
};

