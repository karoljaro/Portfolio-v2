<script setup lang="ts">
const contactEmail = 'hello@karoljaron.dev';
const githubProfileUrl = 'https://github.com/karoljaron';

const contactLines = [
    { key: 'status', value: 'available for scoped web projects' },
    { key: 'work', value: 'frontend / backend / automation' },
    { key: 'location', value: 'Poland, remote-friendly' },
    { key: 'reply', value: 'async, practical and direct' },
];
</script>

<template>
    <div
        id="contact"
        class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]"
    >
        <div class="overflow-hidden rounded-xl border border-border-strong bg-surface">
            <div class="flex min-h-12 items-center gap-2 border-b border-border bg-background-secondary px-4">
                <span class="size-2.5 rounded-full bg-primary"></span>
                <span class="size-2.5 rounded-full bg-muted-foreground"></span>
                <span class="size-2.5 rounded-full bg-border-strong"></span>
                <span class="ml-2 font-mono text-xs text-muted">contact.sh</span>
            </div>

            <div class="space-y-4 p-4 font-mono text-sm leading-7 sm:p-5">
                <p>
                    <span class="text-muted">karol@portfolio:~$ </span>
                    <span class="text-foreground">./contact.sh --open</span>
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
                    output: <span class="text-primary">ready_to_talk=true</span>
                </p>
            </div>
        </div>

        <aside class="rounded-xl border border-border-strong bg-surface p-4 sm:p-5">
            <div class="flex h-full flex-col justify-between gap-6">
                <div class="space-y-3">
                    <div class="grid size-12 place-items-center rounded-lg border border-border bg-background-secondary text-primary">
                        <LucideTerminal class="size-5" />
                    </div>
                    <div class="space-y-2">
                        <h3 class="text-xl font-semibold leading-tight text-foreground">
                            Start a conversation
                        </h3>
                        <p class="text-sm leading-6 text-muted">
                            Send project context, links, constraints or a short brief. I will answer with next steps.
                        </p>
                    </div>
                </div>

                <div class="flex flex-wrap gap-2">
                    <a
                        :href="`mailto:${contactEmail}`"
                        class="inline-flex min-h-10 items-center gap-2 rounded-md border border-primary bg-primary px-3.5 text-sm font-semibold text-background transition-colors hover:bg-transparent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                        <LucideMail class="size-4" />
                        Email
                    </a>
                    <a
                        :href="githubProfileUrl"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                        <LucideFolderGit2 class="size-4" />
                        GitHub
                    </a>
                </div>
            </div>
        </aside>
    </div>
</template>
