<script setup lang="ts">
const contentRef = ref<HTMLElement | null>(null);
const lineCount = shallowRef(1);

const getLineHeight = (element: HTMLElement) => {
    const styles = window.getComputedStyle(element);
    const parsed = Number.parseFloat(styles.lineHeight);

    if (Number.isFinite(parsed)) {
        return parsed;
    }

    const fontSize = Number.parseFloat(styles.fontSize);
    return Number.isFinite(fontSize) ? fontSize * 1.2 : 16;
};

const updateLineCount = useThrottleFn(
    (entries: ResizeObserverEntry[]) => {
        const element = contentRef.value;
        const entry = entries[0];

        if (!element || !entry) {
            return;
        }

        const lineHeight = getLineHeight(element);
        const contentHeight = entry.contentRect.height;

        lineCount.value = Math.max(1, Math.ceil(contentHeight / lineHeight));
    },
    16,
    true,
    true,
);

useResizeObserver(contentRef, updateLineCount);

const lineNumbers = computed(() =>
    Array.from({ length: lineCount.value }, (_, index) => String(index + 1).padStart(2, '0')),
);
</script>

<template>
    <div class="flex items-start gap-2 rounded-xl border border-border-strong bg-surface font-mono text-xs leading-6 sm:gap-4 sm:text-sm sm:leading-7">
        <div class="select-none text-right text-muted bg-background-secondary rounded-l-xl px-3 py-3 sm:px-4 sm:py-4 md:px-6">
            <span
                v-for="lineNumber in lineNumbers"
                :key="lineNumber"
                class="block h-6 sm:h-7"
            >
                {{ lineNumber }}
            </span>
        </div>

        <div
            ref="contentRef"
            class="min-w-0 flex-1 whitespace-pre-wrap text-foreground py-3 pr-3 sm:py-4 sm:pr-4 md:pr-6"
        >
            <slot />
        </div>
    </div>
</template>
