import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
			base: '/Eventus-Estates',
			assets: '/Eventus-Estates'
		},
		prerender: {
			entries: ['*']
		}
	}
};
