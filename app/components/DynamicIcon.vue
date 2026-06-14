<script setup lang="ts">
	import {
		AudioLines,
		Bot,
		Boxes,
		ClipboardList,
		Code2,
		Database,
		ExternalLink,
		FileText,
		FolderGit2,
		Hammer,
		Layers,
		LockKeyhole,
		Rocket,
		Server,
		Terminal,
		TestTube,
		Utensils,
		Workflow,
		Wrench,
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
		'clipboard-list': ClipboardList,
		code: Code2,
		database: Database,
		'external-link': ExternalLink,
		'file-text': FileText,
		'folder-git': FolderGit2,
		hammer: Hammer,
		layers: Layers,
		'lock-keyhole': LockKeyhole,
		rocket: Rocket,
		server: Server,
		terminal: Terminal,
		'test-tube': TestTube,
		utensils: Utensils,
		workflow: Workflow,
		wrench: Wrench,
	} as const;

	type IconName = keyof typeof iconComponents;

	const isIconName = (name: string): name is IconName => name in iconComponents;

	const iconComponent = computed(() =>
		isIconName(props.name) ? iconComponents[props.name] : iconComponents.code,
	);
</script>

<template>
	<component
		:is="iconComponent"
		aria-hidden="true"
		focusable="false"
	/>
</template>
