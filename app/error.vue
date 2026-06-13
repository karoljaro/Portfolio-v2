<script setup lang="ts">
	import type { NuxtError } from '#app';

	const props = defineProps<{
		error: NuxtError;
	}>();

	const { t } = useI18n();
	const localePath = useLocalePath();

	const statusCode = computed(() => props.error.statusCode || 500);
	const isNotFound = computed(() => statusCode.value === 404);

	const title = computed(() =>
		isNotFound.value ? t('error.title.notFound') : t('error.title.fallback'),
	);
	const description = computed(() =>
		isNotFound.value ? t('error.description.notFound') : t('error.description.fallback'),
	);

	const errorLines = computed(() => [
		{ key: 'status', value: String(statusCode.value) },
		{
			key: 'type',
			value: isNotFound.value ? t('error.type.notFound') : t('error.type.fallback'),
		},
		{
			key: 'recover',
			value: isNotFound.value ? t('error.recover.notFound') : t('error.recover.fallback'),
		},
	]);

	const goHome = () => clearError({ redirect: localePath('/') });

	const retry = () => {
		if (import.meta.client) {
			window.location.reload();
		}
	};
</script>

<template>
	<main class="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
		<div class="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center">
			<section class="grid w-full gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
				<div class="overflow-hidden rounded-xl border border-border-strong bg-surface">
					<div
						class="flex min-h-12 items-center justify-between gap-4 border-b border-border bg-background-secondary px-4"
					>
						<div class="flex items-center gap-2">
							<span class="size-2.5 rounded-full bg-primary"></span>
							<span class="size-2.5 rounded-full bg-muted-foreground"></span>
							<span class="size-2.5 rounded-full bg-border-strong"></span>
							<span class="ml-2 font-mono text-xs text-muted">{{
								t('error.errorFile')
							}}</span>
						</div>
						<span class="hidden font-mono text-xs text-subtle-foreground sm:inline">{{
							t('error.runtime')
						}}</span>
					</div>

					<div class="space-y-8 p-4 sm:p-6 lg:p-7">
						<div class="space-y-5">
							<p class="font-mono text-xs text-primary">$ route.inspect --failed</p>

							<div class="space-y-4">
								<p class="font-mono text-sm text-muted">HTTP {{ statusCode }}</p>
								<h1
									class="max-w-3xl text-5xl font-semibold leading-none tracking-normal text-foreground sm:text-6xl lg:text-7xl"
								>
									{{ title }}
								</h1>
								<p class="max-w-2xl text-sm leading-7 text-muted sm:text-base">
									{{ description }}
								</p>
							</div>
						</div>

						<div class="flex flex-wrap gap-3">
							<button
								type="button"
								class="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary bg-primary px-5 text-sm font-semibold text-background transition-colors hover:bg-transparent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-6"
								@click="goHome"
							>
								{{ t('common.goHome') }}
								<LucideArrowRight class="size-4" />
							</button>
							<button
								type="button"
								class="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong bg-background-secondary px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-6"
								@click="retry"
							>
								<LucideRefreshCw class="size-4" />
								{{ t('common.tryAgain') }}
							</button>
						</div>
					</div>
				</div>

				<aside class="grid gap-4">
					<div class="overflow-hidden rounded-xl border border-border-strong bg-surface">
						<div
							class="flex min-h-12 items-center gap-2 border-b border-border bg-background-secondary px-4"
						>
							<span class="size-2.5 rounded-full bg-primary"></span>
							<span class="size-2.5 rounded-full bg-muted-foreground"></span>
							<span class="size-2.5 rounded-full bg-border-strong"></span>
							<span class="ml-2 font-mono text-xs text-muted">{{
								t('error.diagnosticsFile')
							}}</span>
						</div>

						<div class="space-y-4 p-4 font-mono text-sm leading-7 sm:p-5">
							<p>
								<span class="text-muted">system@portfolio:~$ </span>
								<span class="text-foreground">cat error.json</span>
							</p>

							<div class="space-y-1">
								<p
									v-for="line in errorLines"
									:key="line.key"
									class="grid gap-1 sm:grid-cols-[88px_minmax(0,1fr)]"
								>
									<span class="text-primary">{{ line.key }}</span>
									<span class="text-muted">{{ line.value }}</span>
								</p>
							</div>

							<div
								class="rounded-lg border border-border bg-background-secondary px-3 py-2.5"
							>
								<p>
									<span class="text-primary">{{ t('error.nextLabel') }}</span>
									<span class="text-foreground"> {{ t('error.next') }}</span>
								</p>
							</div>
						</div>
					</div>

					<div class="rounded-xl border border-border-strong bg-surface p-4">
						<div class="flex items-center gap-3">
							<div
								class="grid size-10 place-items-center rounded-lg border border-border bg-background-secondary text-primary"
							>
								<LucideTerminal class="size-4" />
							</div>
							<div>
								<p class="font-mono text-xs text-primary">
									{{ t('error.fallback.title') }}
								</p>
								<p class="mt-1 text-sm leading-6 text-muted">
									{{ t('error.fallback.description') }}
								</p>
							</div>
						</div>
					</div>
				</aside>
			</section>
		</div>
	</main>
</template>
