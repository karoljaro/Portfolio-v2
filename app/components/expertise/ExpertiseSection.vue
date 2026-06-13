<script setup lang="ts">
	const { t } = useI18n();

	type ExpertiseItem = {
		title: string;
		command: string;
		description: string;
		tools: string[];
		icon: 'frontend' | 'backend' | 'automation';
	};

	const expertiseItems = computed<ExpertiseItem[]>(() => [
		{
			title: t('expertise.items.frontend.title'),
			command: t('expertise.items.frontend.command'),
			description: t('expertise.items.frontend.description'),
			tools: ['Nuxt', 'Vue', 'Next.js', 'Tailwind CSS'],
			icon: 'frontend',
		},
		{
			title: t('expertise.items.backend.title'),
			command: t('expertise.items.backend.command'),
			description: t('expertise.items.backend.description'),
			tools: ['Nest.js', 'PostgreSQL', 'REST', 'Auth'],
			icon: 'backend',
		},
		{
			title: t('expertise.items.automation.title'),
			command: t('expertise.items.automation.command'),
			description: t('expertise.items.automation.description'),
			tools: ['Docker', 'Linux', 'Bun', 'Python'],
			icon: 'automation',
		},
	]);
</script>

<template>
	<div class="grid gap-3 lg:grid-cols-3">
		<article
			v-for="(item, index) in expertiseItems"
			:key="item.title"
			class="group relative overflow-hidden rounded-xl border border-border-strong bg-surface p-4 sm:p-5"
		>
			<div
				aria-hidden="true"
				class="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-80"
			></div>

			<div class="relative space-y-5">
				<div class="flex items-start justify-between gap-4">
					<div
						class="grid size-12 place-items-center rounded-lg border border-border bg-background-secondary text-primary"
					>
						<LucideCode2
							v-if="item.icon === 'frontend'"
							class="size-5"
						/>
						<LucideDatabase
							v-else-if="item.icon === 'backend'"
							class="size-5"
						/>
						<LucideWorkflow
							v-else
							class="size-5"
						/>
					</div>

					<span class="font-mono text-xs text-subtle-foreground">
						{{ String(index + 1).padStart(2, '0') }}
					</span>
				</div>

				<div class="space-y-2">
					<p class="font-mono text-xs text-primary">$ {{ item.command }}</p>
					<h3 class="text-lg font-semibold leading-tight text-foreground sm:text-xl">
						{{ item.title }}
					</h3>
					<p class="text-sm leading-6 text-muted">
						{{ item.description }}
					</p>
				</div>

				<div class="flex flex-wrap gap-2">
					<span
						v-for="tool in item.tools"
						:key="tool"
						class="rounded-md border border-border bg-surface-tag px-2.5 py-1 text-xs font-medium text-muted"
					>
						{{ tool }}
					</span>
				</div>
			</div>
		</article>
	</div>
</template>
