<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
    <section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-stretch">
        <div class="overflow-hidden rounded-xl border border-border-strong bg-surface">
            <div class="flex min-h-12 items-center justify-between gap-4 border-b border-border bg-background-secondary px-4">
                <div class="flex items-center gap-2">
                    <span class="size-2.5 rounded-full bg-primary"></span>
                    <span class="size-2.5 rounded-full bg-muted-foreground"></span>
                    <span class="size-2.5 rounded-full bg-border-strong"></span>
                    <span class="ml-2 font-mono text-xs text-muted">{{ t('hero.windowTitle') }}</span>
                </div>
                <span class="hidden font-mono text-xs text-subtle-foreground sm:inline">{{ t('hero.runtime') }}</span>
            </div>

            <div class="space-y-8 p-4 sm:p-6 lg:p-7">
                <div class="space-y-5">
                    <p class="font-mono text-xs text-primary">{{ t('hero.command') }}</p>

                    <div class="space-y-4">
                        <h1 class="max-w-4xl text-5xl font-semibold leading-none tracking-normal text-foreground sm:text-6xl lg:text-7xl">
                            {{ t('hero.name') }}
                        </h1>
                        <p class="max-w-2xl text-xl font-medium leading-8 text-foreground sm:text-2xl">
                            {{ t('hero.headline') }}
                        </p>
                        <p class="max-w-2xl text-sm leading-7 text-muted sm:text-base">
                            {{ t('hero.lead') }}
                        </p>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3">
                    <a
                        href="#projects"
                        class="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary bg-primary px-5 text-sm font-semibold text-background transition-colors hover:bg-transparent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-6"
                    >
                        {{ t('hero.viewProjects') }}
                        <LucideArrowRight class="size-4" />
                    </a>
                    <a
                        href="#contact"
                        class="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong bg-background-secondary px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-6"
                    >
                        <LucideSend class="size-4" />
                        {{ t('hero.contactCta') }}
                    </a>
                </div>

                <div class="grid gap-2 sm:grid-cols-3">
                    <div class="rounded-lg border border-border bg-background-secondary px-3 py-2.5">
                        <p class="font-mono text-xs text-primary">01</p>
                        <p class="mt-1 text-sm font-medium text-foreground">{{ t('hero.signals.product') }}</p>
                    </div>
                    <div class="rounded-lg border border-border bg-background-secondary px-3 py-2.5">
                        <p class="font-mono text-xs text-primary">02</p>
                        <p class="mt-1 text-sm font-medium text-foreground">{{ t('hero.signals.api') }}</p>
                    </div>
                    <div class="rounded-lg border border-border bg-background-secondary px-3 py-2.5">
                        <p class="font-mono text-xs text-primary">03</p>
                        <p class="mt-1 text-sm font-medium text-foreground">{{ t('hero.signals.release') }}</p>
                    </div>
                </div>
            </div>
        </div>

        <aside class="grid gap-4">
            <div class="overflow-hidden rounded-xl border border-border-strong bg-surface">
                <div class="flex min-h-12 items-center gap-2 border-b border-border bg-background-secondary px-4">
                    <span class="size-2.5 rounded-full bg-primary"></span>
                    <span class="size-2.5 rounded-full bg-muted-foreground"></span>
                    <span class="size-2.5 rounded-full bg-border-strong"></span>
                    <span class="ml-2 font-mono text-xs text-muted">{{ t('hero.logTitle') }}</span>
                </div>

                <div class="space-y-4 p-4 font-mono text-sm leading-7 sm:p-5">
                    <p>
                        <span class="text-muted">{{ t('hero.terminalUser') }}</span>
                        <span class="text-foreground">{{ t('hero.buildCommand') }}</span>
                    </p>

                    <div class="space-y-2">
                        <p class="grid grid-cols-[22px_minmax(0,1fr)] gap-2">
                            <LucideCheck class="mt-1 size-4 text-primary" />
                            <span class="text-muted">{{ t('hero.steps.interface') }}</span>
                        </p>
                        <p class="grid grid-cols-[22px_minmax(0,1fr)] gap-2">
                            <LucideCheck class="mt-1 size-4 text-primary" />
                            <span class="text-muted">{{ t('hero.steps.flow') }}</span>
                        </p>
                        <p class="grid grid-cols-[22px_minmax(0,1fr)] gap-2">
                            <LucideCheck class="mt-1 size-4 text-primary" />
                            <span class="text-muted">{{ t('hero.steps.release') }}</span>
                        </p>
                    </div>

                    <div class="rounded-lg border border-border bg-background-secondary px-3 py-2.5">
                        <p>
                            <span class="text-primary">{{ t('hero.outputLabel') }}</span>
                            <span class="text-foreground"> {{ t('hero.outputValue') }}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div class="rounded-xl border border-border-strong bg-surface p-4">
                    <div class="flex items-center gap-3">
                        <div class="grid size-10 place-items-center rounded-lg border border-border bg-background-secondary text-primary">
                            <LucideLayers class="size-4" />
                        </div>
                        <div>
                            <p class="font-mono text-xs text-primary">{{ t('hero.cards.systems.title') }}</p>
                            <p class="mt-1 text-sm leading-6 text-muted">{{ t('hero.cards.systems.description') }}</p>
                        </div>
                    </div>
                </div>

                <div class="rounded-xl border border-border-strong bg-surface p-4">
                    <div class="flex items-center gap-3">
                        <div class="grid size-10 place-items-center rounded-lg border border-border bg-background-secondary text-primary">
                            <LucideWrench class="size-4" />
                        </div>
                        <div>
                            <p class="font-mono text-xs text-primary">{{ t('hero.cards.delivery.title') }}</p>
                            <p class="mt-1 text-sm leading-6 text-muted">{{ t('hero.cards.delivery.description') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    </section>
</template>
