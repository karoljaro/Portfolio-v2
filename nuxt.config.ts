import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	future: {
		compatibilityVersion: 5,
	},

	css: ['./app/assets/css/main.css'],

	vite: {
		plugins: [tailwindcss()],
	},

	pages: true,
	modules: ['nuxt-lucide-icons', '@vueuse/nuxt', '@nuxtjs/i18n'],
	i18n: {
		defaultLocale: 'en',
		strategy: 'prefix_except_default',
		detectBrowserLanguage: false,
		locales: [
			{
				code: 'en',
				name: 'English',
				file: 'en.json',
			},
			{
				code: 'pl',
				name: 'Polski',
				file: 'pl.json',
			},
		],
	},
});
