<script setup lang="ts">
	import { getElementLineHeight } from '~/utils/getElementLineHeight';

	const props = defineProps<{
		description: string;
	}>();

	const { t } = useI18n();

	const lineLimit = 3;
	const descriptionId = useId();
	const descriptionRef = ref<HTMLElement | null>(null);
	const isExpanded = shallowRef(false);
	const canExpand = shallowRef(false);

	const updateExpandableState = () => {
		const element = descriptionRef.value;

		if (!element) {
			return;
		}

		const lineHeight = getElementLineHeight(element);
		const renderedLines = Math.ceil(element.scrollHeight / lineHeight);

		canExpand.value = renderedLines > lineLimit;

		if (!canExpand.value) {
			isExpanded.value = false;
		}
	};
	const updateExpandableStateThrottled = useThrottleFn(updateExpandableState, 50, true, true);

	onMounted(async () => {
		await nextTick();
		updateExpandableState();
	});

	watch(
		() => props.description,
		async () => {
			await nextTick();
			updateExpandableState();
		},
	);

	useResizeObserver(descriptionRef, updateExpandableStateThrottled);
</script>

<template>
	<div class="space-y-1.5">
		<p
			:id="descriptionId"
			ref="descriptionRef"
			class="max-w-3xl overflow-hidden text-sm leading-6 text-muted sm:text-base"
			:class="
				isExpanded
					? ''
					: '[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]'
			"
		>
			{{ props.description }}
		</p>

		<button
			v-if="canExpand"
			type="button"
			:aria-controls="descriptionId"
			:aria-expanded="isExpanded"
			class="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
			@click="isExpanded = !isExpanded"
		>
			{{ isExpanded ? t('common.showLess') : t('common.showMore') }}
			<LucideChevronUp
				v-if="isExpanded"
				aria-hidden="true"
				focusable="false"
				class="size-4"
			/>
			<LucideChevronDown
				v-else
				aria-hidden="true"
				focusable="false"
				class="size-4"
			/>
		</button>
	</div>
</template>
