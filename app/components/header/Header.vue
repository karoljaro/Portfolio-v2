<template>
    <header class="relative flex min-h-14 items-center border-b border-border border bg-background-secondary px-4 sm:px-6 lg:px-8 rounded-xl">
        <nav aria-label="Language" class="absolute left-4 sm:left-6 lg:left-8">
            <div class="flex items-center gap-1 text-sm font-medium text-muted">
                <button type="button" class="cursor-pointer transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    PL
                </button>
                <span aria-hidden="true" class="text-subtle-foreground select-none">/</span>
                <button type="button" class="cursor-pointer transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    EN
                </button>
            </div>
        </nav>

        <p class="absolute left-1/2 whitespace-nowrap font-medium text-foreground -translate-x-1/2">
            &bull; Karol Jaroń &bull;
        </p>
    </header>
</template>
