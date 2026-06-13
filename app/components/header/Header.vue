<script setup lang="ts">
const { locale, setLocale, t } = useI18n();

type LocaleCode = 'pl' | 'en';

const languageButtonClass = (code: LocaleCode) => [
    'cursor-pointer transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
    locale.value === code ? 'text-foreground' : 'text-muted',
];

const switchLanguage = (code: LocaleCode) => {
    if (locale.value !== code) {
        setLocale(code);
    }
};
</script>

<template>
    <header class="sticky top-4 z-50 overflow-hidden rounded-xl border border-border-strong bg-surface/95 backdrop-blur">
        <div class="flex min-h-14 items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
            <a
                href="#"
                class="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                :aria-label="t('header.goToTop')"
            >
                <div class="hidden items-center gap-1.5 sm:flex">
                    <span class="size-2.5 rounded-full bg-primary"></span>
                    <span class="size-2.5 rounded-full bg-muted-foreground"></span>
                    <span class="size-2.5 rounded-full bg-border-strong"></span>
                </div>

                <div class="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background-secondary text-primary sm:hidden">
                    <LucideTerminal class="size-4" />
                </div>

                <div class="min-w-0">
                    <p class="truncate font-mono text-sm font-semibold text-foreground">
                        {{ t('header.brand') }}
                    </p>
                    <p class="hidden font-mono text-[11px] text-muted sm:block">
                        {{ t('header.runtime') }}
                    </p>
                </div>
            </a>

            <nav
                :aria-label="t('header.primaryNav')"
                class="hidden items-center gap-1 md:flex"
            >
                <a
                    href="#projects"
                    class="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                    {{ t('header.nav.projects') }}
                </a>
                <a
                    href="#expertise"
                    class="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                    {{ t('header.nav.expertise') }}
                </a>
                <a
                    href="#process"
                    class="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                    {{ t('header.nav.process') }}
                </a>
                <a
                    href="#contact"
                    class="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                    {{ t('header.nav.contact') }}
                </a>
            </nav>

            <div class="flex shrink-0 items-center gap-2">
                <div class="hidden items-center gap-2 rounded-full border border-border bg-background-secondary px-3 py-2 sm:flex">
                    <span class="relative flex size-2">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60"></span>
                        <span class="relative inline-flex size-2 rounded-full bg-primary"></span>
                    </span>
                    <span class="font-mono text-xs text-muted">{{ t('header.status') }}</span>
                </div>

                <nav
                    :aria-label="t('header.language')"
                    class="flex items-center gap-1 rounded-full border border-border bg-background-secondary px-2.5 py-2 font-mono text-xs text-muted"
                >
                    <button
                        type="button"
                        :class="languageButtonClass('pl')"
                        @click="switchLanguage('pl')"
                    >
                        PL
                    </button>
                    <span
                        aria-hidden="true"
                        class="select-none text-subtle-foreground"
                    >/</span>
                    <button
                        type="button"
                        :class="languageButtonClass('en')"
                        @click="switchLanguage('en')"
                    >
                        EN
                    </button>
                </nav>

                <a
                    href="#contact"
                    class="hidden min-h-10 items-center gap-2 rounded-full border border-primary bg-primary px-4 text-sm font-semibold text-background transition-colors hover:bg-transparent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:inline-flex"
                >
                    {{ t('header.contact') }}
                    <LucideArrowUpRight class="size-4" />
                </a>
            </div>
        </div>

        <nav
            :aria-label="t('header.mobilePrimaryNav')"
            class="grid grid-cols-4 border-t border-border bg-background-secondary/70 text-center md:hidden"
        >
            <a
                href="#projects"
                class="px-2 py-2.5 font-mono text-[11px] text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary"
            >
                {{ t('header.nav.projects') }}
            </a>
            <a
                href="#expertise"
                class="px-2 py-2.5 font-mono text-[11px] text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary"
            >
                {{ t('header.nav.expertise') }}
            </a>
            <a
                href="#process"
                class="px-2 py-2.5 font-mono text-[11px] text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary"
            >
                {{ t('header.nav.process') }}
            </a>
            <a
                href="#contact"
                class="px-2 py-2.5 font-mono text-[11px] text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary"
            >
                {{ t('header.nav.contact') }}
            </a>
        </nav>
    </header>
</template>
