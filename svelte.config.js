import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      strict: true
    }),

    paths: {
      base: '/Eventus-Estates'
      // ⚠️ DO NOT set `assets`
    },

    prerender: {
      entries: ['*']
    }
  }
};