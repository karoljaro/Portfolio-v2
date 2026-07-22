<script setup lang="ts">
	const { t } = useI18n();

	const profileFacts = computed(() => [
		{ label: t('about.facts.role.label'), value: t('about.facts.role.value') },
		{ label: t('about.facts.base.label'), value: t('about.facts.base.value') },
		{ label: t('about.facts.focus.label'), value: t('about.facts.focus.value') },
	]);
	const profileLines = computed(() => [
		{ key: 'name', value: t('about.profileName'), class: 'text-primary' },
		{ key: 'status', value: t('about.statusLine'), class: 'text-muted' },
		{ key: 'type', value: t('about.typeLine'), class: 'text-muted' },
	]);
	const aboutParagraphs = computed(() => [t('about.paragraphOne'), t('about.paragraphTwo')]);

	const stackItems = ['TypeScript', 'Nuxt', 'Nest.js', 'PostgreSQL', 'Python', 'Docker'];
</script>

<template>
	<div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
		<div class="overflow-hidden rounded-xl border border-border-strong bg-surface">
			<PanelHeader
				:title="t('about.file')"
				:meta="t('about.mode')"
			/>

			<div class="grid lg:grid-cols-[148px_minmax(0,1fr)]">
				<aside
					class="border-b border-border bg-background-secondary/60 p-4 lg:border-b-0 lg:border-r"
				>
					<div class="space-y-4">
						<div
							class="grid size-12 place-items-center rounded-lg border border-border bg-surface text-primary"
						>
							<LucideTerminal
								aria-hidden="true"
								focusable="false"
								class="size-5"
							/>
						</div>

						<div class="space-y-2 font-mono text-xs">
							<p
								v-for="line in profileLines"
								:key="line.key"
								:class="line.class"
							>
								{{ line.value }}
							</p>
						</div>
					</div>
				</aside>

				<div class="space-y-5 p-4 sm:p-5">
					<div class="space-y-3">
						<p class="font-mono text-xs text-primary">{{ t('about.command') }}</p>
						<div
							class="space-y-4 text-sm leading-7 text-muted sm:text-base sm:leading-8"
						>
							<p
								v-for="paragraph in aboutParagraphs"
								:key="paragraph"
							>
								{{ paragraph }}
							</p>
						</div>
					</div>

					<div class="grid gap-2 sm:grid-cols-3">
						<div
							v-for="fact in profileFacts"
							:key="fact.label"
							class="motion-surface motion-surface--subtle rounded-lg border border-border bg-background-secondary px-3 py-2.5"
						>
							<p class="font-mono text-xs text-primary">{{ fact.label }}</p>
							<p class="mt-1 text-sm font-medium leading-5 text-foreground">
								{{ fact.value }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<aside class="motion-surface rounded-xl border border-border-strong bg-surface p-4 sm:p-5">
			<div class="flex h-full flex-col justify-between gap-6">
				<div class="space-y-4">
					<div class="flex items-center justify-between gap-4">
						<div
							class="motion-icon grid size-12 place-items-center rounded-lg border border-border bg-background-secondary text-primary"
						>
							<LucideBlocks
								aria-hidden="true"
								focusable="false"
								class="size-5"
							/>
						</div>
						<span
							class="rounded-full border border-border bg-surface-tag px-2.5 py-1 font-mono text-xs text-muted"
						>
							{{ t('about.stack.label') }}
						</span>
					</div>

					<div class="space-y-2">
						<h3 class="text-xl font-semibold leading-tight text-foreground">
							{{ t('about.stack.title') }}
						</h3>
						<p class="text-sm leading-6 text-muted">
							{{ t('about.stack.description') }}
						</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-2">
					<span
						v-for="item in stackItems"
						:key="item"
						class="rounded-md border border-border bg-surface-tag px-2.5 py-1 text-xs font-medium text-muted"
					>
						{{ item }}
					</span>
				</div>
			</div>
		</aside>
	</div>
</template>
