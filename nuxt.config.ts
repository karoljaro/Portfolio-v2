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
	modules: ['nuxt-lucide-icons', '@vueuse/nuxt'],
});
