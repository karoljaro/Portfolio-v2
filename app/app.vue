<script setup lang="ts">
	const { t } = useI18n();
	const splashSessionKey = 'portfolio:splash-seen:v2';
	const splashSessionStateScript = `(()=>{const root=document.documentElement;try{const reduce=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce){sessionStorage.setItem('${splashSessionKey}','1');root.dataset.splashState='seen';return}root.dataset.splashState=sessionStorage.getItem('${splashSessionKey}')==='1'?'seen':'pending'}catch{root.dataset.splashState='pending'}})();`;
	const showSplash = ref(true);
	const i18nHead = useLocaleHead({
		lang: true,
		dir: true,
		seo: true,
	});
	const seoTitle = computed(() => t('seo.title'));
	const seoDescription = computed(() => t('seo.description'));
	const seoSiteName = computed(() => t('seo.siteName'));
	const handleSplashComplete = () => {
		showSplash.value = false;
	};

	defineOgImage(
		'Portfolio.takumi',
		{
			name: computed(() => t('hero.name')),
			role: computed(() => t('about.facts.role.value')),
			headline: computed(() => t('hero.headline')),
			availability: computed(() => t('header.status')),
			product: computed(() => t('hero.signals.product')),
			api: computed(() => t('hero.signals.api')),
			release: computed(() => t('hero.signals.release')),
		},
		{
			width: 1200,
			height: 630,
			alt: seoTitle,
		},
	);

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
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: seoTitle.value },
				{ name: 'twitter:description', content: seoDescription.value },
				...(i18nHead.value.meta || []),
			],
			link: [...(i18nHead.value.link || [])],
			script: [
				{
					id: 'portfolio-splash-session',
					innerHTML: splashSessionStateScript,
				},
			],
		}),
		{ tagPriority: 'high' },
	);
</script>

<template>
	<main
		id="top"
		class="site-shell px-4 py-6 sm:px-6 lg:px-8"
	>
		<NuxtRouteAnnouncer />
		<SplashScreen
			v-if="showSplash"
			:session-key="splashSessionKey"
			@complete="handleSplashComplete"
		/>
		<div class="site-content">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</div>
	</main>
</template>
