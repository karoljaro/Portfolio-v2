<script setup lang="ts">
	import {
		AudioLines,
		Bot,
		Boxes,
		Code2,
		FileText,
		Server,
		Terminal,
		Utensils,
		Workflow,
	} from '@lucide/vue';

	const props = withDefaults(
		defineProps<{
			name?: string;
		}>(),
		{
			name: 'code',
		},
	);

	const iconComponents = {
		audio: AudioLines,
		bot: Bot,
		boxes: Boxes,
		code: Code2,
		'file-text': FileText,
		server: Server,
		terminal: Terminal,
		utensils: Utensils,
		workflow: Workflow,
	} as const;

	const iconComponent = computed(() =>
		props.name in iconComponents
			? iconComponents[props.name as keyof typeof iconComponents]
			: Code2,
	);
</script>

<template>
	<component
		:is="iconComponent"
		aria-hidden="true"
		focusable="false"
	/>
</template>
