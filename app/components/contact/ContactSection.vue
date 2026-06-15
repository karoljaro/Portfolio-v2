<script setup lang="ts">
	const { t } = useI18n();

	const contactEmail = 'karol_jaron@vp.pl';
	const githubProfileUrl = 'https://github.com/karoljaro';

	const contactLines = computed(() => [
		{ key: t('contact.lines.status.key'), value: t('contact.lines.status.value') },
		{ key: t('contact.lines.work.key'), value: t('contact.lines.work.value') },
		{ key: t('contact.lines.location.key'), value: t('contact.lines.location.value') },
		{ key: t('contact.lines.reply.key'), value: t('contact.lines.reply.value') },
	]);
</script>

<template>
	<div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
		<div class="overflow-hidden rounded-xl border border-border-strong bg-surface">
			<PanelHeader :title="t('contact.file')" />

			<div class="space-y-4 p-4 font-mono text-sm leading-7 sm:p-5">
				<p>
					<span class="text-muted">{{ t('contact.terminalUser') }}</span>
					<span class="text-foreground">{{ t('contact.command') }}</span>
				</p>

				<div class="space-y-1">
					<p
						v-for="line in contactLines"
						:key="line.key"
						class="grid gap-1 sm:grid-cols-[112px_minmax(0,1fr)]"
					>
						<span class="text-primary">{{ line.key }}</span>
						<span class="text-muted">{{ line.value }}</span>
					</p>
				</div>

				<p class="text-foreground">
					{{ t('contact.outputLabel') }}
					<span class="text-primary">{{ t('contact.output') }}</span>
				</p>
			</div>
		</div>

		<aside class="rounded-xl border border-border-strong bg-surface p-4 sm:p-5">
			<div class="flex h-full flex-col justify-between gap-6">
				<div class="space-y-3">
					<div
						class="grid size-12 place-items-center rounded-lg border border-border bg-background-secondary text-primary"
					>
						<LucideTerminal
							aria-hidden="true"
							focusable="false"
							class="size-5"
						/>
					</div>
					<div class="space-y-2">
						<h3 class="text-xl font-semibold leading-tight text-foreground">
							{{ t('contact.title') }}
						</h3>
						<p class="text-sm leading-6 text-muted">
							{{ t('contact.description') }}
						</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-2">
					<a
						:href="`mailto:${contactEmail}`"
						class="inline-flex min-h-10 items-center gap-2 rounded-md border border-primary bg-primary px-3.5 text-sm font-semibold text-background transition-colors hover:bg-transparent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						<LucideMail
							aria-hidden="true"
							focusable="false"
							class="size-4"
						/>
						{{ t('common.email') }}
					</a>
					<a
						:href="githubProfileUrl"
						target="_blank"
						rel="noopener noreferrer"
						:aria-label="t('common.externalLinkLabel', { label: t('common.github') })"
						class="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						<LucideFolderGit2
							aria-hidden="true"
							focusable="false"
							class="size-4"
						/>
						{{ t('common.github') }}
					</a>
				</div>
			</div>
		</aside>
	</div>
</template>
