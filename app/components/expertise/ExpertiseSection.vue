<script setup lang="ts">
	const { t } = useI18n();

	type ExpertiseItem = {
		key: string;
		title: string;
		command: string;
		description: string;
		tools: string[];
		icon: string;
	};

	const expertiseConfig = [
		{
			key: 'frontend',
			tools: ['Nuxt', 'Vue', 'Next.js', 'Tailwind CSS'],
			icon: 'code',
		},
		{
			key: 'backend',
			tools: ['Nest.js', 'PostgreSQL', 'REST', 'Auth'],
			icon: 'database',
		},
		{
			key: 'automation',
			tools: ['Docker', 'Linux', 'Bun', 'Python'],
			icon: 'workflow',
		},
	] as const;

	const expertiseItems = computed<ExpertiseItem[]>(() =>
		expertiseConfig.map((item) => {
			const path = `expertise.items.${item.key}`;

			return {
				key: item.key,
				title: t(`${path}.title`),
				command: t(`${path}.command`),
				description: t(`${path}.description`),
				tools: [...item.tools],
				icon: item.icon,
			};
		}),
	);
</script>

<template>
	<div class="grid gap-3 lg:grid-cols-3">
		<article
			v-for="(item, index) in expertiseItems"
			:key="item.key"
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
						<DynamicIcon
							:name="item.icon"
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
