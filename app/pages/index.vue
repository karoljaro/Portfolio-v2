<script setup lang="ts">
	import type { Component } from 'vue';

	import AboutSection from '~/components/about/AboutSection.vue';
	import ContactSection from '~/components/contact/ContactSection.vue';
	import ExpertiseSection from '~/components/expertise/ExpertiseSection.vue';
	import MyProcess from '~/components/process/MyProcess.vue';
	import SelectedProjects from '~/components/projects/SelectedProjects.vue';

	const { t } = useI18n();

	type HomeSection = {
		id?: string;
		index: string;
		labelKey: string;
		titleId: string;
		component: Component;
	};

	const sections = [
		{
			index: '01',
			labelKey: 'sections.about',
			titleId: 'about-title',
			component: AboutSection,
		},
		{
			id: 'projects',
			index: '02',
			labelKey: 'sections.projects',
			titleId: 'projects-title',
			component: SelectedProjects,
		},
		{
			id: 'expertise',
			index: '03',
			labelKey: 'sections.expertise',
			titleId: 'expertise-title',
			component: ExpertiseSection,
		},
		{
			id: 'process',
			index: '04',
			labelKey: 'sections.process',
			titleId: 'process-title',
			component: MyProcess,
		},
		{
			id: 'contact',
			index: '05',
			labelKey: 'sections.contact',
			titleId: 'contact-title',
			component: ContactSection,
		},
	] satisfies HomeSection[];
</script>

<template>
	<Header />
	<Hero />
	<div class="space-y-12 md:space-y-14.5 lg:space-y-16">
		<section
			v-for="section in sections"
			:id="section.id"
			:key="section.titleId"
			class="space-y-4 scroll-mt-28"
			:aria-labelledby="section.titleId"
		>
			<SectionLabel
				:id="section.titleId"
				:index="section.index"
				>{{ t(section.labelKey) }}</SectionLabel
			>
			<component :is="section.component" />
		</section>
	</div>
</template>
