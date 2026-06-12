<script setup lang="ts">
import ProjectDescription from '~/components/projects/ProjectDescription.vue';

type Project = {
    name: string;
    description: string;
    stack: string[];
    demoUrl?: string;
    githubUrl?: string;
    icon: 'code' | 'server' | 'workflow';
};

const githubProfileUrl = 'https://github.com/karoljaron';

const projects: Project[] = [
    {
        name: 'Portfolio v2',
        description: 'Personal portfolio built with Nuxt, Tailwind CSS and reusable content sections.',
        stack: ['Nuxt', 'Vue', 'Tailwind CSS'],
        demoUrl: '/',
        githubUrl: '',
        icon: 'code',
    },
    {
        name: 'API Automation Toolkit',
        description: 'Backend utilities for integrating APIs, automating workflows and processing structured data.',
        stack: ['Nest.js', 'PostgreSQL', 'Bun'],
        demoUrl: '',
        githubUrl: '',
        icon: 'workflow',
    },
    {
        name: 'Deployment Dashboard',
        description: 'Operational interface for monitoring application services, environments and deployment status.',
        stack: ['TypeScript', 'Docker', 'Linux'],
        demoUrl: '',
        githubUrl: '',
        icon: 'server',
    },
];
</script>

<template>
    <div class="space-y-5">
        <div class="space-y-3">
            <article
                v-for="project in projects"
                :key="project.name"
                class="grid gap-4 rounded-xl border border-border-strong bg-surface p-4 sm:p-5 md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-center"
            >
                <div class="grid size-14 place-items-center rounded-lg border border-border bg-background-secondary text-primary sm:size-16">
                    <LucideCode2
                        v-if="project.icon === 'code'"
                        class="size-6 sm:size-7"
                    />
                    <LucideWorkflow
                        v-else-if="project.icon === 'workflow'"
                        class="size-6 sm:size-7"
                    />
                    <LucideServer
                        v-else
                        class="size-6 sm:size-7"
                    />
                </div>

                <div class="min-w-0 space-y-3">
                    <div class="space-y-1.5">
                        <h3 class="text-lg font-semibold leading-tight text-foreground sm:text-xl">
                            {{ project.name }}
                        </h3>
                        <ProjectDescription :description="project.description" />
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="item in project.stack"
                            :key="item"
                            class="rounded-md border border-border bg-surface-tag px-2.5 py-1 text-xs font-medium text-muted"
                        >
                            {{ item }}
                        </span>
                    </div>
                </div>

                <div class="flex flex-wrap gap-2 md:justify-end">
                    <a
                        v-if="project.demoUrl"
                        :href="project.demoUrl"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                        <LucideExternalLink class="size-4" />
                        Demo
                    </a>

                    <a
                        v-if="project.githubUrl"
                        :href="project.githubUrl"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                        <LucideFolderGit2 class="size-4" />
                        GitHub
                    </a>

                    <span
                        v-else
                        class="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background-secondary px-3.5 text-sm font-medium text-muted"
                    >
                        <LucideLockKeyhole class="size-4" />
                        Private code
                    </span>
                </div>
            </article>
        </div>

        <a
            :href="githubProfileUrl"
            target="_blank"
            rel="noreferrer"
            class="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-base"
        >
            View more projects on GitHub
            <span aria-hidden="true">-&gt;</span>
        </a>
    </div>
</template>
