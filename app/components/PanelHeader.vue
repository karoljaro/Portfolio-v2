<script setup lang="ts">
	defineProps<{
		title: string;
		meta?: string;
	}>();
</script>

<template>
	<div
		class="flex min-h-12 items-center border-b border-border bg-background-secondary px-4"
		:class="meta ? 'justify-between gap-4' : 'gap-2'"
	>
		<div class="flex min-w-0 items-center gap-2">
			<span class="size-2.5 shrink-0 rounded-full bg-primary"></span>
			<span class="size-2.5 shrink-0 rounded-full bg-muted-foreground"></span>
			<span class="size-2.5 shrink-0 rounded-full bg-border-strong"></span>
			<span class="ml-2 truncate font-mono text-xs text-muted">{{ title }}</span>
		</div>

		<span
			v-if="meta"
			class="hidden shrink-0 font-mono text-xs text-subtle-foreground sm:inline"
		>
			{{ meta }}
		</span>
	</div>
</template>
