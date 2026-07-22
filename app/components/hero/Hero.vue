<script setup lang="ts">
	const { t } = useI18n();

	const signalItems = ['product', 'api', 'release'] as const;
	const buildSteps = ['interface', 'flow', 'release'] as const;
	const heroCards = [
		{ key: 'systems', icon: 'layers' },
		{ key: 'delivery', icon: 'wrench' },
	] as const;

	const formatIndex = (index: number) => String(index + 1).padStart(2, '0');
</script>

<template>
	<section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-stretch">
		<div
			class="motion-enter overflow-hidden rounded-xl border border-border-strong bg-surface"
			style="--motion-delay: 0ms"
		>
			<PanelHeader
				:title="t('hero.windowTitle')"
				:meta="t('hero.runtime')"
			/>

			<div class="space-y-8 p-4 sm:p-6 lg:p-7">
				<div class="space-y-5">
					<p
						class="motion-line font-mono text-xs text-primary"
						style="--motion-delay: 120ms"
					>
						{{ t('hero.command') }}
					</p>

					<div class="space-y-4">
						<h1
							class="motion-line max-w-4xl text-5xl font-semibold leading-none tracking-normal text-foreground sm:text-6xl lg:text-7xl"
							style="--motion-delay: 170ms"
						>
							{{ t('hero.name') }}
						</h1>
						<p
							class="motion-line max-w-2xl text-xl font-medium leading-8 text-foreground sm:text-2xl"
							style="--motion-delay: 220ms"
						>
							{{ t('hero.headline') }}
						</p>
						<p
							class="motion-line max-w-2xl text-sm leading-7 text-muted sm:text-base"
							style="--motion-delay: 270ms"
						>
							{{ t('hero.lead') }}
						</p>
					</div>
				</div>

				<div
					class="motion-line flex flex-wrap gap-3"
					style="--motion-delay: 320ms"
				>
					<a
						href="#projects"
						class="motion-button inline-flex min-h-12 items-center gap-2 rounded-full border border-primary bg-primary px-5 text-sm font-semibold text-background hover:bg-transparent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-6"
					>
						{{ t('hero.viewProjects') }}
						<LucideArrowRight
							aria-hidden="true"
							focusable="false"
							class="size-4"
						/>
					</a>
					<a
						href="#contact"
						class="motion-button inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong bg-background-secondary px-5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-6"
					>
						<LucideSend
							aria-hidden="true"
							focusable="false"
							class="size-4"
						/>
						{{ t('hero.contactCta') }}
					</a>
				</div>

				<div
					class="motion-line grid gap-2 sm:grid-cols-3"
					style="--motion-delay: 370ms"
				>
					<div
						v-for="(item, index) in signalItems"
						:key="item"
						class="motion-surface motion-surface--subtle rounded-lg border border-border bg-background-secondary px-3 py-2.5"
					>
						<p class="font-mono text-xs text-primary">
							{{ formatIndex(index) }}
						</p>
						<p class="mt-1 text-sm font-medium text-foreground">
							{{ t(`hero.signals.${item}`) }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<aside class="grid gap-4">
			<div
				class="motion-enter overflow-hidden rounded-xl border border-border-strong bg-surface"
				style="--motion-delay: 90ms"
			>
				<PanelHeader :title="t('hero.logTitle')" />

				<div class="space-y-4 p-4 font-mono text-sm leading-7 sm:p-5">
					<p>
						<span class="text-muted">{{ t('hero.terminalUser') }}</span>
						<span class="text-foreground">{{ t('hero.buildCommand') }}</span>
					</p>

					<div class="space-y-2">
						<p
							v-for="(step, index) in buildSteps"
							:key="step"
							class="motion-line grid grid-cols-[22px_minmax(0,1fr)] gap-2"
							:style="{ '--motion-delay': `${220 + index * 55}ms` }"
						>
							<LucideCheck
								aria-hidden="true"
								focusable="false"
								class="mt-1 size-4 text-primary"
							/>
							<span class="text-muted">{{ t(`hero.steps.${step}`) }}</span>
						</p>
					</div>

					<div
						class="rounded-lg border border-border bg-background-secondary px-3 py-2.5"
					>
						<p>
							<span class="text-primary">{{ t('hero.outputLabel') }}</span>
							<span class="text-foreground"> {{ t('hero.outputValue') }}</span>
						</p>
					</div>
				</div>
			</div>

			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
				<div
					v-for="(card, index) in heroCards"
					:key="card.key"
					class="motion-enter motion-surface rounded-xl border border-border-strong bg-surface p-4"
					:style="{ '--motion-delay': `${180 + index * 70}ms` }"
				>
					<div class="flex items-center gap-3">
						<div
							class="motion-icon grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-background-secondary text-primary"
						>
							<DynamicIcon
								:name="card.icon"
								class="size-4"
							/>
						</div>
						<div>
							<p class="font-mono text-xs text-primary">
								{{ t(`hero.cards.${card.key}.title`) }}
							</p>
							<p class="mt-1 text-sm leading-6 text-muted">
								{{ t(`hero.cards.${card.key}.description`) }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
	</section>
</template>
