<script setup lang="ts">
	const { locale, setLocale, t } = useI18n();

	type LocaleCode = 'pl' | 'en';
	type LocaleOption = {
		code: LocaleCode;
		shortLabel: string;
		name: string;
	};
	type NavItem = {
		href: string;
		label: string;
	};

	const languages = computed<LocaleOption[]>(() => [
		{ code: 'pl', shortLabel: 'PL', name: t('header.languageNames.pl') },
		{ code: 'en', shortLabel: 'EN', name: t('header.languageNames.en') },
	]);

	const navItems = computed<NavItem[]>(() => [
		{ href: '#projects', label: t('header.nav.projects') },
		{ href: '#expertise', label: t('header.nav.expertise') },
		{ href: '#process', label: t('header.nav.process') },
		{ href: '#contact', label: t('header.nav.contact') },
	]);

	const activeLanguageIndex = computed(() =>
		Math.max(
			0,
			languages.value.findIndex((language) => language.code === locale.value),
		),
	);

	const isActiveLanguage = (code: LocaleCode) => locale.value === code;

	const switchLanguage = (code: LocaleCode) => {
		if (!isActiveLanguage(code)) {
			setLocale(code);
		}
	};
</script>

<template>
	<header
		class="motion-enter sticky top-4 z-50 overflow-hidden rounded-xl border border-border-strong bg-surface/95 backdrop-blur"
	>
		<div class="flex min-h-14 items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
			<a
				href="#top"
				class="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
				:aria-label="t('header.goToTop')"
			>
				<div
					aria-hidden="true"
					class="hidden items-center gap-1.5 sm:flex"
				>
					<span class="size-2.5 rounded-full bg-primary"></span>
					<span class="size-2.5 rounded-full bg-muted-foreground"></span>
					<span class="size-2.5 rounded-full bg-border-strong"></span>
				</div>

				<div
					class="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background-secondary text-primary sm:hidden"
				>
					<LucideTerminal
						aria-hidden="true"
						focusable="false"
						class="size-4"
					/>
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
					v-for="item in navItems"
					:key="item.href"
					:href="item.href"
					class="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
				>
					{{ item.label }}
				</a>
			</nav>

			<div class="flex shrink-0 items-center gap-2">
				<div
					class="hidden items-center gap-2 rounded-full border border-border bg-background-secondary px-3 py-2 sm:flex"
				>
					<span
						aria-hidden="true"
						class="relative flex size-2"
					>
						<span
							class="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping"
						></span>
						<span class="relative inline-flex size-2 rounded-full bg-primary"></span>
					</span>
					<span class="font-mono text-xs text-muted">{{ t('header.status') }}</span>
				</div>

				<div
					role="group"
					:aria-label="t('header.language')"
					class="relative grid h-11 grid-cols-2 items-center rounded-full border border-border bg-background-secondary p-1 font-mono text-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
				>
					<span
						aria-hidden="true"
						class="absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-full border border-primary bg-primary transition-transform duration-200 ease-out"
						:style="{ transform: `translateX(${activeLanguageIndex * 100}%)` }"
					></span>
					<button
						v-for="language in languages"
						:key="language.code"
						type="button"
						class="relative z-10 grid h-9 min-w-11 cursor-pointer place-items-center rounded-full px-3 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
						:class="
							isActiveLanguage(language.code)
								? 'text-background'
								: 'text-muted hover:text-foreground'
						"
						:aria-pressed="isActiveLanguage(language.code)"
						:aria-label="t('header.languageOption', { language: language.name })"
						@click="switchLanguage(language.code)"
					>
						{{ language.shortLabel }}
					</button>
				</div>

				<a
					href="#contact"
					class="motion-button hidden min-h-10 items-center gap-2 rounded-full border border-primary bg-primary px-4 text-sm font-semibold text-background hover:bg-transparent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:inline-flex"
				>
					{{ t('header.contact') }}
					<LucideArrowUpRight
						aria-hidden="true"
						focusable="false"
						class="size-4"
					/>
				</a>
			</div>
		</div>

		<nav
			:aria-label="t('header.mobilePrimaryNav')"
			class="grid grid-cols-4 border-t border-border bg-background-secondary/70 text-center md:hidden"
		>
			<a
				v-for="item in navItems"
				:key="item.href"
				:href="item.href"
				class="min-h-11 px-2 py-3 font-mono text-[11px] text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary"
			>
				{{ item.label }}
			</a>
		</nav>
	</header>
</template>
