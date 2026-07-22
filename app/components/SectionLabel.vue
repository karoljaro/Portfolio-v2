<script setup lang="ts">
	withDefaults(
		defineProps<{
			id?: string;
			index?: string;
			loadOnPage?: boolean;
		}>(),
		{
			id: undefined,
			index: undefined,
			loadOnPage: false,
		},
	);
</script>

<template>
	<div
		class="section-label flex items-center gap-3"
		:class="{ 'section-label--load': loadOnPage }"
	>
		<span
			v-if="index"
			aria-hidden="true"
			class="section-label__index font-mono text-xs text-subtle-foreground"
		>
			{{ index }}
		</span>
		<h2
			:id="id"
			class="inline-flex items-center font-mono text-sm font-semibold tracking-normal text-primary sm:text-base"
		>
			<span
				aria-hidden="true"
				class="section-label__prompt text-subtle-foreground"
				>&gt;</span
			>
			<span class="section-label__typing ml-2">
				<span class="section-label__text"><slot /></span>
				<span
					aria-hidden="true"
					class="section-label__cursor"
				></span>
			</span>
		</h2>
		<div
			aria-hidden="true"
			class="section-label__rule h-px min-w-6 flex-1 bg-border"
		></div>
	</div>
</template>
