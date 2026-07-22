import tailwindcss from '@tailwindcss/vite';
import { definePerson } from 'nuxt-schema-org/schema';

const site = {
	url: process.env.NUXT_PUBLIC_I18N_BASE_URL,
	name: 'Karol Jaroń Portfolio',
	description:
		'Full-Stack Web Developer building websites, web applications, backend APIs and automation tools with TypeScript and Python.',
	defaultLocale: 'en',
};

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',

	sourcemap: false,

	devtools: {
		enabled: true,
	},

	future: {
		compatibilityVersion: 5,
	},

	modules: ['nuxt-lucide-icons', '@vueuse/nuxt', '@nuxtjs/i18n', '@nuxt/fonts', '@nuxtjs/seo'],

	css: ['~/assets/css/main.css'],

	vite: {
		plugins: [tailwindcss()],
	},

	site,

	runtimeConfig: {
		public: {
			i18n: {
				baseUrl: site.url,
			},
		},
	},

	i18n: {
		baseUrl: site.url,
		defaultLocale: site.defaultLocale,
		strategy: 'prefix_except_default',
		detectBrowserLanguage: false,

		locales: [
			{
				code: 'en',
				name: 'English',
				language: 'en',
				file: 'en.json',
			},
			{
				code: 'pl',
				name: 'Polski',
				language: 'pl-PL',
				file: 'pl.json',
			},
		],
	},

	fonts: {
		families: [
			{
				name: 'IBM Plex Sans',
				provider: 'google',
				weights: [400, 500, 600, 700],
				styles: ['normal'],
				subsets: ['latin', 'latin-ext'],
				global: true,
			},
			{
				name: 'IBM Plex Mono',
				provider: 'google',
				weights: [400, 600, 700],
				styles: ['normal'],
				subsets: ['latin', 'latin-ext'],
				global: true,
			},
		],
	},

	schemaOrg: {
		identity: definePerson({
			name: 'Karol Jaroń',
			jobTitle: 'Full-Stack Web Developer',
			url: site.url,
			sameAs: ['https://github.com/karoljaron'],
		}),
	},

	sitemap: {
		zeroRuntime: true,
	},

	ogImage: {
		enabled: true,
		zeroRuntime: true,
	},

	nitro: {
		prerender: {
			crawlLinks: true,
			routes: ['/', '/pl'],
		},
	},

	seo: {
		fallbackTitle: false,
	},

	pages: true,
});
