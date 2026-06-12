<script setup lang="ts">
	import AboutSection from '~/components/about/AboutSection.vue';
	import ContactSection from '~/components/contact/ContactSection.vue';
	import ExpertiseSection from '~/components/expertise/ExpertiseSection.vue';
	import MyProcess from '~/components/process/MyProcess.vue';
	import SelectedProjects from '~/components/projects/SelectedProjects.vue';
</script>

<template>
	<Header />
	<Hero />
	<SectionBorder>
		<div class="space-y-4">
			<SectionLabel>about.md</SectionLabel>
			<AboutSection />
		</div>
		<div
			id="projects"
			class="space-y-4"
		>
			<SectionLabel>selected_projects</SectionLabel>
			<SelectedProjects />
		</div>
		<div class="space-y-4">
			<SectionLabel>expertise</SectionLabel>
			<ExpertiseSection />
		</div>
		<div class="space-y-4">
			<SectionLabel>my_process</SectionLabel>
			<MyProcess />
		</div>
		<div class="space-y-4">
			<SectionLabel>contact.sh</SectionLabel>
			<ContactSection />
		</div>
	</SectionBorder>
</template>
