<script setup lang="ts">
	const { t } = useI18n();
	const i18nHead = useLocaleHead({
		lang: true,
		dir: true,
		seo: true,
	});
	const seoTitle = computed(() => t('seo.title'));
	const seoDescription = computed(() => t('seo.description'));
	const seoSiteName = computed(() => t('seo.siteName'));

	useHead(
		() => ({
			htmlAttrs: {
				...i18nHead.value.htmlAttrs,
			},
			title: seoTitle.value,
			titleTemplate: '%s',
			meta: [
				{ name: 'description', content: seoDescription.value },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:title', content: seoTitle.value },
				{ property: 'og:description', content: seoDescription.value },
				{ property: 'og:site_name', content: seoSiteName.value },
				{ name: 'twitter:card', content: 'summary' },
				{ name: 'twitter:title', content: seoTitle.value },
				{ name: 'twitter:description', content: seoDescription.value },
				...(i18nHead.value.meta || []),
			],
			link: [...(i18nHead.value.link || [])],
		}),
		{ tagPriority: 'high' },
	);
</script>

<template>
	<main class="bg-background px-4 sm:px-6 lg:px-8 py-6">
		<NuxtRouteAnnouncer />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</main>
</template>
