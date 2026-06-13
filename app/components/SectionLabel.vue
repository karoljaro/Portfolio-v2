<script setup lang="ts">
	withDefaults(
		defineProps<{
			id?: string;
			index?: string;
		}>(),
		{
			id: undefined,
			index: undefined,
		},
	);
</script>

<template>
	<div class="flex items-center gap-3">
		<span
			v-if="index"
			aria-hidden="true"
			class="font-mono text-xs text-subtle-foreground"
		>
			{{ index }}
		</span>
		<h2
			:id="id"
			class="font-mono text-sm font-semibold tracking-normal text-primary sm:text-base"
		>
			<span
				aria-hidden="true"
				class="text-subtle-foreground"
				>&gt;</span
			>
			<span class="ml-2"><slot /></span>
		</h2>
		<div
			aria-hidden="true"
			class="h-px min-w-6 flex-1 bg-border"
		></div>
	</div>
</template>
