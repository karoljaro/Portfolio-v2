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
	<div class="space-y-12 md:space-y-14.5 lg:space-y-16">
		<section
			class="space-y-4 scroll-mt-28"
			aria-labelledby="about-title"
		>
			<SectionLabel
				id="about-title"
				index="01"
			>{{ t('sections.about') }}</SectionLabel>
			<AboutSection />
		</section>
		<section
			id="projects"
			class="space-y-4 scroll-mt-28"
			aria-labelledby="projects-title"
		>
			<SectionLabel
				id="projects-title"
				index="02"
			>{{ t('sections.projects') }}</SectionLabel>
			<SelectedProjects />
		</section>
		<section
			id="expertise"
			class="space-y-4 scroll-mt-28"
			aria-labelledby="expertise-title"
		>
			<SectionLabel
				id="expertise-title"
				index="03"
			>{{ t('sections.expertise') }}</SectionLabel>
			<ExpertiseSection />
		</section>
		<section
			id="process"
			class="space-y-4 scroll-mt-28"
			aria-labelledby="process-title"
		>
			<SectionLabel
				id="process-title"
				index="04"
			>{{ t('sections.process') }}</SectionLabel>
			<MyProcess />
		</section>
		<section
			id="contact"
			class="space-y-4 scroll-mt-28"
			aria-labelledby="contact-title"
		>
			<SectionLabel
				id="contact-title"
				index="05"
			>{{ t('sections.contact') }}</SectionLabel>
			<ContactSection />
		</section>
	</div>
</template>
