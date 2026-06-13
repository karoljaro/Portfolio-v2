<script setup lang="ts">
	import ProjectDescription from '~/components/projects/ProjectDescription.vue';

	const { rt, t, tm } = useI18n();

	type Project = {
		id: string;
		name: string;
		label: string;
		description: string;
		stack: string[];
		detail: string;
		area: string;
		demoUrl?: string;
		githubUrl?: string;
		icon: string;
	};

	type ProjectMessageMap = Record<
		string,
		{
			stack: unknown[];
		}
	>;

	const githubProfileUrl = 'https://github.com/karoljaron';
	const projectItemsPath = 'projects.items';

	const projectIds = computed(() => Object.keys(tm(projectItemsPath) as ProjectMessageMap));

	const projectHrefAttrs = (url: string) => {
		const isExternal = /^https?:\/\//.test(url);

		return {
			target: isExternal ? '_blank' : undefined,
			rel: isExternal ? 'noreferrer' : undefined,
		};
	};

	const projects = computed<Project[]>(() => {
		return projectIds.value.map((id) => {
			const path = `${projectItemsPath}.${id}`;
			const label = t(`${path}.label`);
			const area = t(`${path}.area`) || label.split('/')[0]?.trim() || '';
			const stack = tm(`${path}.stack`) as unknown[];

			return {
				id,
				name: t(`${path}.name`),
				label,
				description: t(`${path}.description`),
				stack: stack.map((item) => rt(item as string)),
				detail: t(`${path}.detail`),
				area,
				demoUrl: t(`${path}.demoUrl`),
				githubUrl: t(`${path}.githubUrl`),
				icon: t(`${path}.icon`) || 'code',
			} satisfies Project;
		});
	});

	const areasCount = computed(() => {
		const areas = projects.value.map((project) => project.area).filter(Boolean);

		return new Set(areas).size;
	});

	const demoCount = computed(
		() => projects.value.filter((project) => Boolean(project.demoUrl)).length,
	);
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
							<p class="text-lg font-semibold text-foreground">{{ areasCount }}</p>
							<p class="font-mono text-[11px] text-muted">
								{{ t('projects.stats.areas') }}
							</p>
						</div>
						<div
							class="rounded-lg border border-border bg-background-secondary px-2 py-2"
						>
							<p class="text-lg font-semibold text-foreground">{{ demoCount }}</p>
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
				:key="project.id"
				class="group grid gap-4 overflow-hidden rounded-xl border border-border-strong bg-surface p-4 transition-colors hover:border-primary/70 sm:p-5 lg:grid-cols-[92px_minmax(0,1fr)_190px] lg:items-center"
			>
				<div
					class="relative grid min-h-20 place-items-center overflow-hidden rounded-xl border border-border bg-background-secondary text-primary lg:min-h-23 lg:place-items-start lg:p-3"
				>
					<div
						aria-hidden="true"
						class="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100"
					></div>
					<div
						class="relative grid size-12 shrink-0 place-items-center rounded-lg border border-border bg-surface lg:size-11"
					>
						<DynamicIcon
							:name="project.icon"
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

					<div
						v-if="project.stack.length"
						class="flex flex-wrap gap-2"
					>
						<span
							v-for="item in project.stack"
							:key="item"
							class="rounded-md border border-border bg-surface-tag px-2.5 py-1 text-xs font-medium text-muted"
						>
							{{ item }}
						</span>
					</div>
				</div>

				<div
					class="flex w-full max-w-85 flex-wrap gap-2 lg:ml-auto lg:max-w-none lg:flex-col lg:items-stretch"
				>
					<p
						v-if="project.detail"
						class="w-full font-mono text-xs text-subtle-foreground lg:text-right"
					>
						{{ project.detail }}
					</p>

					<a
						v-if="project.demoUrl"
						:href="project.demoUrl"
						v-bind="projectHrefAttrs(project.demoUrl)"
						class="inline-flex min-h-10 min-w-36 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:w-full lg:flex-none"
					>
						<LucideExternalLink class="size-4" />
						{{ t('common.demo') }}
					</a>

					<a
						v-if="project.githubUrl"
						:href="project.githubUrl"
						target="_blank"
						rel="noreferrer"
						class="inline-flex min-h-10 min-w-36 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:w-full lg:flex-none"
					>
						<LucideFolderGit2 class="size-4" />
						{{ t('common.github') }}
					</a>

					<span
						v-else
						class="inline-flex min-h-10 min-w-36 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-muted lg:w-full lg:flex-none"
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
