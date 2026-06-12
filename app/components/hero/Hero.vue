<template>
    <section class="relative isolate grid gap-10 pt-9.5 pb-2 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:justify-between">
        <div
            aria-hidden="true"
            class="pointer-events-none absolute -left-24 top-4 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-[120px] sm:-left-32 sm:h-96 sm:w-96"
        ></div>

        <div class="max-w-3xl">
            <div class="flex flex-col text-5xl font-semibold leading-none tracking-normal sm:text-6xl lg:text-7xl">
                <span>Karol Jaroń</span>
                <span class="text-primary">Full-Stack</span>
                <span>Web Developer</span>
            </div>

            <p class="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                I build practical websites, web applications, backend APIs and automation tools &mdash; from frontend implementation to database design and deployment.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
                <a
                    href="#projects"
                    class="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary bg-primary px-6 text-sm font-semibold text-background transition-colors hover:bg-transparent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                    View Projects
                    <span aria-hidden="true">-&gt;</span>
                </a>
                <a
                    href="#contact"
                    class="inline-flex min-h-12 items-center rounded-full border border-border-strong px-6 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                    Contact Me
                </a>
            </div>
        </div>

        <aside class="rounded-2xl border border-border-strong bg-surface p-7 text-muted">
            <div class="space-y-4.5">

                <div class="flex items-center gap-3">
                    <div class="size-6 grid place-items-center">
                        <span class="relative flex size-3">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        </span>
                    </div>

                    <div class="space-y-1">
                        <p class="flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                            Status
                        </p>
                        <p class="text-sm font-semibold leading-tight text-foreground">Available for new projects</p>
                    </div>
                </div>

                <div class="h-px bg-muted-foreground"></div>

                <div class="flex items-center gap-3">
                    <LucideBriefcaseBusiness />
                    <div class="space-y-1">
                        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Experience</p>
                        <p class="text-sm font-semibold leading-tight">Commercial experience</p>
                    </div>
                </div>

                <div class="h-px bg-muted-foreground"></div>

                <div class="flex items-center gap-3">
                    <LucideMapPin />
                    <div class="space-y-1">
                        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Location</p>
                        <p class="text-sm font-semibold leading-tight">Poland</p>
                    </div>
                </div>

                <div class="h-px bg-muted-foreground"></div>

                <div class="flex items-center gap-3">
                    <LucideCode />
                    <div class="space-y-1">
                        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Main stack</p>
                        <p class="text-sm font-medium leading-6 text-muted">Typescript / Python / Nuxt.js / Next.js / Nest.js</p>
                    </div>
                </div>
            </div>
        </aside>
    </section>
</template>
