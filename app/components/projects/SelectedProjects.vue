<script setup lang="ts">
	import ProjectDescription from '~/components/projects/ProjectDescription.vue';

	const { t } = useI18n();

	type Project = {
		name: string;
		label: string;
		description: string;
		stack: string[];
		detail: string;
		demoUrl?: string;
		githubUrl?: string;
		icon: 'code' | 'server' | 'workflow';
	};

	const githubProfileUrl = 'https://github.com/karoljaron';

	const projects = computed<Project[]>(() => [
		{
			name: t('projects.items.portfolio.name'),
			label: t('projects.items.portfolio.label'),
			description: t('projects.items.portfolio.description'),
			stack: ['Nuxt', 'Vue', 'Tailwind CSS'],
			detail: t('projects.items.portfolio.detail'),
			demoUrl: '/',
			githubUrl: '',
			icon: 'code',
		},
		{
			name: t('projects.items.apiToolkit.name'),
			label: t('projects.items.apiToolkit.label'),
			description: t('projects.items.apiToolkit.description'),
			stack: ['Nest.js', 'PostgreSQL', 'Bun'],
			detail: t('projects.items.apiToolkit.detail'),
			demoUrl: '',
			githubUrl: '',
			icon: 'workflow',
		},
		{
			name: t('projects.items.deploymentDashboard.name'),
			label: t('projects.items.deploymentDashboard.label'),
			description: t('projects.items.deploymentDashboard.description'),
			stack: ['TypeScript', 'Docker', 'Linux'],
			detail: t('projects.items.deploymentDashboard.detail'),
			demoUrl: '',
			githubUrl: '',
			icon: 'server',
		},
	]);
</script>

<template>
	<div class="space-y-5">
		<div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
			<div class="overflow-hidden rounded-xl border border-border-strong bg-surface">
				<div
					class="flex min-h-12 items-center gap-2 border-b border-border bg-background-secondary px-4"
				>
					<span class="size-2.5 rounded-full bg-primary"></span>
					<span class="size-2.5 rounded-full bg-muted-foreground"></span>
					<span class="size-2.5 rounded-full bg-border-strong"></span>
					<span class="ml-2 font-mono text-xs text-muted">{{ t('projects.file') }}</span>
				</div>

				<div class="space-y-2 p-4 sm:p-5">
					<p class="font-mono text-xs text-primary">{{ t('projects.command') }}</p>
					<h3 class="text-xl font-semibold leading-tight text-foreground sm:text-2xl">
						{{ t('projects.title') }}
					</h3>
					<p class="max-w-3xl text-sm leading-6 text-muted sm:text-base">
						{{ t('projects.description') }}
					</p>
				</div>
			</div>

			<aside class="rounded-xl border border-border-strong bg-surface p-4 sm:p-5">
				<div class="flex h-full flex-col justify-between gap-5">
					<div class="space-y-3">
						<div
							class="grid size-12 place-items-center rounded-lg border border-border bg-background-secondary text-primary"
						>
							<LucideFolderGit2 class="size-5" />
						</div>
						<div>
							<p class="font-mono text-xs text-primary">
								{{ t('projects.repoIndex') }}
							</p>
							<p class="mt-1 text-sm leading-6 text-muted">
								{{ t('projects.repoDescription') }}
							</p>
						</div>
					</div>

					<div class="grid grid-cols-3 gap-2 text-center">
						<div
							class="rounded-lg border border-border bg-background-secondary px-2 py-2"
						>
							<p class="text-lg font-semibold text-foreground">
								{{ projects.length }}
							</p>
							<p class="font-mono text-[11px] text-muted">
								{{ t('projects.stats.items') }}
							</p>
						</div>
						<div
							class="rounded-lg border border-border bg-background-secondary px-2 py-2"
						>
							<p class="text-lg font-semibold text-foreground">3</p>
							<p class="font-mono text-[11px] text-muted">
								{{ t('projects.stats.areas') }}
							</p>
						</div>
						<div
							class="rounded-lg border border-border bg-background-secondary px-2 py-2"
						>
							<p class="text-lg font-semibold text-foreground">1</p>
							<p class="font-mono text-[11px] text-muted">
								{{ t('projects.stats.demo') }}
							</p>
						</div>
					</div>
				</div>
			</aside>
		</div>

		<div class="space-y-3">
			<article
				v-for="(project, index) in projects"
				:key="project.name"
				class="group grid gap-4 overflow-hidden rounded-xl border border-border-strong bg-surface p-4 transition-colors hover:border-primary/70 sm:p-5 lg:grid-cols-[92px_minmax(0,1fr)_minmax(170px,auto)] lg:items-center"
			>
				<div
					class="relative grid min-h-20 place-items-center overflow-hidden rounded-xl border border-border bg-background-secondary text-primary"
				>
					<div
						aria-hidden="true"
						class="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100"
					></div>
					<div
						class="relative grid size-12 place-items-center rounded-lg border border-border bg-surface"
					>
						<LucideCode2
							v-if="project.icon === 'code'"
							class="size-6"
						/>
						<LucideWorkflow
							v-else-if="project.icon === 'workflow'"
							class="size-6"
						/>
						<LucideServer
							v-else
							class="size-6"
						/>
					</div>
					<span
						class="absolute bottom-2 right-2 font-mono text-xs text-subtle-foreground"
					>
						{{ String(index + 1).padStart(2, '0') }}
					</span>
				</div>

				<div class="min-w-0 space-y-3">
					<div class="space-y-1.5">
						<div class="flex flex-wrap items-center gap-2">
							<h3
								class="text-lg font-semibold leading-tight text-foreground sm:text-xl"
							>
								{{ project.name }}
							</h3>
							<span
								class="rounded-full border border-border bg-surface-tag px-2.5 py-1 font-mono text-[11px] text-muted"
							>
								{{ project.label }}
							</span>
						</div>
						<ProjectDescription :description="project.description" />
					</div>

					<div class="flex flex-wrap gap-2">
						<span
							v-for="item in project.stack"
							:key="item"
							class="rounded-md border border-border bg-surface-tag px-2.5 py-1 text-xs font-medium text-muted"
						>
							{{ item }}
						</span>
					</div>
				</div>

				<div class="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
					<p class="w-full font-mono text-xs text-subtle-foreground lg:text-right">
						{{ project.detail }}
					</p>

					<a
						v-if="project.demoUrl"
						:href="project.demoUrl"
						target="_blank"
						rel="noreferrer"
						class="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						<LucideExternalLink class="size-4" />
						{{ t('common.demo') }}
					</a>

					<a
						v-if="project.githubUrl"
						:href="project.githubUrl"
						target="_blank"
						rel="noreferrer"
						class="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						<LucideFolderGit2 class="size-4" />
						{{ t('common.github') }}
					</a>

					<span
						v-else
						class="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-muted"
					>
						<LucideLockKeyhole class="size-4" />
						{{ t('common.privateCode') }}
					</span>
				</div>
			</article>
		</div>

		<a
			:href="githubProfileUrl"
			target="_blank"
			rel="noreferrer"
			class="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-base"
		>
			{{ t('projects.moreGithub') }}
			<span aria-hidden="true">-&gt;</span>
		</a>
	</div>
</template>
