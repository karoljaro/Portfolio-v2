<script setup lang="ts">
	const { t } = useI18n();
</script>

<template>
	<div class="max-w-7xl mx-auto space-y-12 md:space-y-14.5 lg:space-y-16">
		<slot />
		<footer
			class="scroll-reveal-self border-t border-border py-6 text-center text-sm text-muted"
		>
			{{ t('footer.rights') }}
		</footer>
	</div>
</template>
