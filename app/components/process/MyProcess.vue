<script setup lang="ts">
type ProcessStep = {
    name: string;
    command: string;
    description: string;
    icon: 'plan' | 'build' | 'test' | 'deploy';
};

const steps: ProcessStep[] = [
    {
        name: 'Plan',
        command: 'scope --map',
        description: 'Define goals, data shape, integrations and the smallest useful release.',
        icon: 'plan',
    },
    {
        name: 'Build',
        command: 'feature --ship',
        description: 'Implement the interface, API and persistence with small, reviewable pieces.',
        icon: 'build',
    },
    {
        name: 'Test',
        command: 'verify --flow',
        description: 'Check core paths, edge cases and deployment assumptions before release.',
        icon: 'test',
    },
    {
        name: 'Deploy',
        command: 'release --prod',
        description: 'Package, deploy and leave the system observable enough to maintain.',
        icon: 'deploy',
    },
];
</script>

<template>
    <div class="space-y-4">
        <div class="rounded-xl border border-border bg-background-secondary px-4 py-3 font-mono text-xs leading-6 sm:px-5 sm:text-sm">
            <span class="text-muted">karol@portfolio:~$ </span>
            <span class="text-foreground">plan -&gt; build -&gt; test -&gt; deploy</span>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <article
                v-for="(step, index) in steps"
                :key="step.name"
                class="rounded-xl border border-border-strong bg-surface p-4 sm:p-5"
            >
                <div class="space-y-5">
                    <div class="flex items-center justify-between gap-4">
                        <div class="grid size-11 place-items-center rounded-lg border border-border bg-background-secondary text-primary">
                            <LucideClipboardList
                                v-if="step.icon === 'plan'"
                                class="size-5"
                            />
                            <LucideHammer
                                v-else-if="step.icon === 'build'"
                                class="size-5"
                            />
                            <LucideTestTube
                                v-else-if="step.icon === 'test'"
                                class="size-5"
                            />
                            <LucideRocket
                                v-else
                                class="size-5"
                            />
                        </div>

                        <span class="rounded-full border border-border bg-surface-tag px-2.5 py-1 font-mono text-xs text-muted">
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
