<script setup lang="ts">
	import PseudoTerminal from '~/components/about/PseudoTerminal.vue';
	import SelectedProjects from '~/components/projects/SelectedProjects.vue';
</script>

<template>
	<Header />
	<Hero />
	<SectionBorder>
		<div class="space-y-4">
			<SectionLabel>about.md</SectionLabel>
			<PseudoTerminal>
				I'm Karol, a Full-Stack Web Developer from Poland with
				commercial experience in building web applications, backend APIs
				and automation tools. I mainly work with TypeScript, Node.js /
				Bun.js, Nest.js, PostgreSQL and Python, while also using
				frontend technologies such as Next.js, Nuxt.js, Vue and Tailwind
				CSS. <br />
				I enjoy solving practical engineering problems — from designing
				APIs and database models to building interfaces, automating
				workflows and deploying applications in Linux environments with
				Docker. My focus is on building software that is maintainable,
				useful and reliable.
			</PseudoTerminal>
		</div>
		<div class="space-y-4">
			<SectionLabel>selected_projects</SectionLabel>
			<SelectedProjects />
		</div>
	</SectionBorder>
</template>
