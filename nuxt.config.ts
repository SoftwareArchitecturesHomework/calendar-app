// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	css: ['~/assets/css/main.css'],
	modules: ['@nuxt/ui', 'vuetify-nuxt-module'],
	imports: {},
	vite: {
		plugins: [],
	},

	////////////////////
	// plugin configs //
	////////////////////

	devtools: { enabled: true },
	fonts: {
		google: false,
		googleicons: false,
		bunny: false,
		fontshare: false,
		fontsource: false,

		provider: 'local',
	},
	vuetify: {
		moduleOptions: {
			prefixComposables: true,
		},
		vuetifyOptions: {},
	},
});
