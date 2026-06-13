<script setup lang="ts">
	import AboutSection from '~/components/about/AboutSection.vue';
	import ContactSection from '~/components/contact/ContactSection.vue';
	import ExpertiseSection from '~/components/expertise/ExpertiseSection.vue';
	import MyProcess from '~/components/process/MyProcess.vue';
	import SelectedProjects from '~/components/projects/SelectedProjects.vue';

	const { t } = useI18n();
</script>

<template>
	<Header />
	<Hero />
	<SectionBorder>
		<div class="space-y-4">
			<SectionLabel>{{ t('sections.about') }}</SectionLabel>
			<AboutSection />
		</div>
		<div
			id="projects"
			class="space-y-4"
		>
			<SectionLabel>{{ t('sections.projects') }}</SectionLabel>
			<SelectedProjects />
		</div>
		<div
			id="expertise"
			class="space-y-4"
		>
			<SectionLabel>{{ t('sections.expertise') }}</SectionLabel>
			<ExpertiseSection />
		</div>
		<div
			id="process"
			class="space-y-4"
		>
			<SectionLabel>{{ t('sections.process') }}</SectionLabel>
			<MyProcess />
		</div>
		<div class="space-y-4">
			<SectionLabel>{{ t('sections.contact') }}</SectionLabel>
			<ContactSection />
		</div>
	</SectionBorder>
</template>
