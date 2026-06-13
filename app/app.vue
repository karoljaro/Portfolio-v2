<script setup lang="ts">
	const { t } = useI18n();
	const i18nHead = useLocaleHead({
		lang: true,
		dir: true,
		seo: true,
	});

	useHead(() => ({
		htmlAttrs: {
			...i18nHead.value.htmlAttrs,
		},
		title: t('seo.title'),
		meta: [
			{ name: 'description', content: t('seo.description') },
			{ name: 'robots', content: 'index, follow' },
			{ property: 'og:type', content: 'website' },
			{ property: 'og:title', content: t('seo.title') },
			{ property: 'og:description', content: t('seo.description') },
			{ property: 'og:site_name', content: t('seo.siteName') },
			{ name: 'twitter:card', content: 'summary' },
			{ name: 'twitter:title', content: t('seo.title') },
			{ name: 'twitter:description', content: t('seo.description') },
			...(i18nHead.value.meta || []),
		],
		link: [...(i18nHead.value.link || [])],
	}));
</script>

<template>
	<main class="bg-background px-4 sm:px-6 lg:px-8 py-6">
		<NuxtRouteAnnouncer />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</main>
</template>
