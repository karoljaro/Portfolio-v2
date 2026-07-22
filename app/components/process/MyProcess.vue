<script setup lang="ts">
	const { t } = useI18n();

	type ProcessStep = {
		key: string;
		name: string;
		command: string;
		description: string;
		icon: string;
	};

	const stepConfig = [
		{ key: 'plan', icon: 'clipboard-list' },
		{ key: 'build', icon: 'hammer' },
		{ key: 'test', icon: 'test-tube' },
		{ key: 'deploy', icon: 'rocket' },
	] as const;

	const steps = computed<ProcessStep[]>(() =>
		stepConfig.map((step) => {
			const path = `process.steps.${step.key}`;

			return {
				key: step.key,
				name: t(`${path}.name`),
				command: t(`${path}.command`),
				description: t(`${path}.description`),
				icon: step.icon,
			};
		}),
	);
</script>

<template>
	<div class="space-y-4">
		<div
			class="scroll-reveal-item rounded-xl border border-border bg-background-secondary px-4 py-3 font-mono text-xs leading-6 sm:px-5 sm:text-sm"
			style="--reveal-start: 10%; --reveal-end: 30%; --reveal-y: 18px"
		>
			<span class="text-muted">{{ t('process.terminalUser') }}</span>
			<span class="text-foreground">{{ t('process.terminal') }}</span>
		</div>

		<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
			<article
				v-for="(step, index) in steps"
				:key="step.key"
				class="scroll-reveal-item motion-surface rounded-xl border border-border-strong bg-surface p-4 sm:p-5"
				:style="{
					'--reveal-start': `${10 + index * 2}%`,
					'--reveal-end': `${34 + index * 2}%`,
				}"
			>
				<div class="space-y-5">
					<div class="flex items-center justify-between gap-4">
						<div
							class="motion-icon grid size-11 place-items-center rounded-lg border border-border bg-background-secondary text-primary"
						>
							<DynamicIcon
								:name="step.icon"
								class="size-5"
							/>
						</div>

						<span
							class="rounded-full border border-border bg-surface-tag px-2.5 py-1 font-mono text-xs text-muted"
						>
							{{ String(index + 1).padStart(2, '0') }}
						</span>
					</div>

					<div class="space-y-2">
						<p class="font-mono text-xs text-primary">./{{ step.command }}</p>
						<h3 class="text-lg font-semibold leading-tight text-foreground">
							{{ step.name }}
						</h3>
						<p class="text-sm leading-6 text-muted">
							{{ step.description }}
						</p>
					</div>
				</div>
			</article>
		</div>
	</div>
</template>
