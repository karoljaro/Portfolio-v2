<script setup lang="ts">
	const props = defineProps<{
		sessionKey: string;
	}>();

	const emit = defineEmits<{
		complete: [];
	}>();

	const { t } = useI18n();
	const isClosing = ref(false);
	let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
	let hasCompleted = false;

	const stages = computed(() => [
		{
			id: 'interface',
			index: '01',
			command: 'ui.mount',
			label: t('splash.stages.interface'),
		},
		{
			id: 'services',
			index: '02',
			command: 'api.connect',
			label: t('splash.stages.services'),
		},
		{
			id: 'delivery',
			index: '03',
			command: 'ops.release',
			label: t('splash.stages.delivery'),
		},
	]);

	const readSessionState = () => {
		try {
			return sessionStorage.getItem(props.sessionKey) === '1';
		} catch {
			return false;
		}
	};

	const rememberSession = () => {
		try {
			sessionStorage.setItem(props.sessionKey, '1');
		} catch {
			// Storage can be unavailable in hardened privacy modes; the intro still works.
		}
	};

	const completeSplash = () => {
		if (hasCompleted) {
			return;
		}

		hasCompleted = true;
		if (fallbackTimer) {
			clearTimeout(fallbackTimer);
		}

		document.documentElement.dataset.splashState = 'seen';
		emit('complete');
	};

	const skipSplash = () => {
		if (!isClosing.value) {
			isClosing.value = true;
		}
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			skipSplash();
		}
	};

	const handleAnimationEnd = (event: AnimationEvent) => {
		if (event.target !== event.currentTarget || event.pseudoElement) {
			return;
		}

		completeSplash();
	};

	onMounted(() => {
		window.addEventListener('keydown', handleKeydown);

		if (readSessionState()) {
			completeSplash();
			return;
		}

		rememberSession();
		document.documentElement.dataset.splashState = 'active';

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			completeSplash();
			return;
		}

		fallbackTimer = setTimeout(completeSplash, 6500);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('keydown', handleKeydown);

		if (fallbackTimer) {
			clearTimeout(fallbackTimer);
		}
	});
</script>

<template>
	<div
		class="splash-screen"
		:class="{ 'splash-screen--closing': isClosing }"
		role="dialog"
		aria-modal="true"
		:aria-label="t('splash.ariaLabel')"
		@animationend="handleAnimationEnd"
	>
		<button
			type="button"
			class="splash-skip"
			@click="skipSplash"
		>
			<span>{{ t('splash.skip') }}</span>
			<span aria-hidden="true">Esc</span>
		</button>

		<div
			class="splash-frame"
			aria-hidden="true"
		>
			<div class="splash-frame__scan"></div>

			<header class="splash-frame__header">
				<div class="splash-window-title">
					<span class="splash-window-controls">
						<span></span>
						<span></span>
						<span></span>
					</span>
					<span>{{ t('splash.windowTitle') }}</span>
				</div>
				<span class="splash-session">{{ t('splash.session') }}</span>
			</header>

			<div class="splash-frame__body">
				<div class="splash-identity">
					<div class="splash-emblem">
						<div class="splash-emblem__orbit"></div>
						<div class="splash-emblem__core">
							<span>&gt;_</span>
						</div>
					</div>

					<div class="splash-identity__copy">
						<p>Karol Jaroń</p>
						<span>Full-Stack Web Developer</span>
					</div>
				</div>

				<div class="splash-console">
					<p class="splash-command">{{ t('splash.command') }}</p>

					<div class="splash-copy">
						<p class="splash-eyebrow">{{ t('splash.eyebrow') }}</p>
						<h1>{{ t('splash.title') }}</h1>
						<p>{{ t('splash.description') }}</p>
					</div>

					<div class="splash-stages">
						<div
							v-for="(stage, index) in stages"
							:key="stage.id"
							class="splash-stage"
							:style="{ '--stage-index': index }"
						>
							<span class="splash-stage__index">{{ stage.index }}</span>
							<span class="splash-stage__label">
								<strong>{{ stage.command }}</strong>
								<small>{{ stage.label }}</small>
							</span>
							<span class="splash-stage__line"></span>
							<span class="splash-stage__status">
								<span></span>
								{{ t('splash.ready') }}
							</span>
						</div>
					</div>
				</div>
			</div>

			<footer class="splash-frame__footer">
				<div class="splash-progress">
					<span class="splash-progress__bar"></span>
				</div>
				<div class="splash-output">
					<span>{{ t('splash.progress') }}</span>
					<code>{{ t('splash.output') }}</code>
				</div>
			</footer>
		</div>

		<p class="splash-screen__sr-only">{{ t('splash.status') }}</p>
	</div>
</template>

<style scoped>
	.splash-screen {
		--splash-ease: cubic-bezier(0.16, 1, 0.3, 1);
		align-items: center;
		animation: splash-life 4.8s var(--splash-ease) both;
		background: #020a14;
		color: #eff6ff;
		display: flex;
		inset: 0;
		isolation: isolate;
		justify-content: center;
		overflow: auto;
		padding: clamp(1rem, 4vw, 3.5rem);
		position: fixed;
		z-index: 100;
	}

	.splash-screen--closing {
		animation: splash-dismiss 420ms var(--splash-ease) both;
	}

	.splash-screen::before {
		background-image:
			linear-gradient(rgb(46 70 101 / 0.16) 1px, transparent 1px),
			linear-gradient(90deg, rgb(46 70 101 / 0.16) 1px, transparent 1px);
		background-size: 44px 44px;
		content: '';
		inset: 0;
		mask-image: radial-gradient(circle at center, black, transparent 78%);
		opacity: 0.5;
		pointer-events: none;
		position: absolute;
		z-index: -2;
	}

	.splash-screen::after {
		animation: splash-glow 4s ease-in-out infinite alternate;
		background: radial-gradient(circle, rgb(34 211 238 / 0.16), transparent 68%);
		border-radius: 999px;
		content: '';
		height: min(56rem, 90vw);
		pointer-events: none;
		position: absolute;
		right: -18rem;
		top: -20rem;
		width: min(56rem, 90vw);
		z-index: -1;
	}

	.splash-skip {
		align-items: center;
		background: rgb(3 13 25 / 0.86);
		border: 1px solid #1f3149;
		border-radius: 999px;
		color: #94a3b8;
		cursor: pointer;
		display: flex;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.75rem;
		gap: 0.75rem;
		min-height: 2.75rem;
		padding: 0.55rem 0.75rem 0.55rem 1rem;
		position: absolute;
		right: clamp(1rem, 3vw, 2rem);
		top: clamp(1rem, 3vw, 2rem);
		transition:
			border-color 180ms ease-out,
			color 180ms ease-out,
			transform 180ms ease-out;
		z-index: 2;
	}

	.splash-skip span:last-child {
		background: #071426;
		border: 1px solid #2e4665;
		border-radius: 999px;
		color: #899ebf;
		padding: 0.2rem 0.45rem;
	}

	.splash-skip:hover {
		border-color: rgb(34 211 238 / 0.7);
		color: #22d3ee;
		transform: translateY(-2px);
	}

	.splash-skip:focus-visible {
		outline: 2px solid #22d3ee;
		outline-offset: 4px;
	}

	.splash-frame {
		animation: splash-frame-in 720ms var(--splash-ease) 120ms both;
		background: rgb(6 18 34 / 0.96);
		border: 1px solid #2e4665;
		border-radius: 0.85rem;
		box-shadow:
			0 40px 100px -52px rgb(34 211 238 / 0.42),
			0 22px 70px -44px rgb(0 0 0 / 0.9);
		max-width: 58rem;
		overflow: hidden;
		position: relative;
		width: 100%;
	}

	.splash-frame__scan {
		animation: splash-scan 1.8s ease-in-out 560ms 2 both;
		background: linear-gradient(90deg, transparent, rgb(34 211 238 / 0.65), transparent);
		box-shadow: 0 0 18px rgb(34 211 238 / 0.45);
		height: 1px;
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 2;
	}

	.splash-frame__header {
		align-items: center;
		background: #030d19;
		border-bottom: 1px solid #1f3149;
		display: flex;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.75rem;
		justify-content: space-between;
		min-height: 3.25rem;
		padding: 0 1rem;
	}

	.splash-window-title,
	.splash-window-controls {
		align-items: center;
		display: flex;
	}

	.splash-window-title {
		color: #94a3b8;
		gap: 0.75rem;
	}

	.splash-window-controls {
		gap: 0.4rem;
	}

	.splash-window-controls span {
		background: #2e4665;
		border-radius: 999px;
		height: 0.55rem;
		width: 0.55rem;
	}

	.splash-window-controls span:first-child {
		animation: splash-dot 1.8s ease-in-out infinite;
		background: #22d3ee;
	}

	.splash-window-controls span:nth-child(2) {
		background: #94a3b8;
	}

	.splash-session {
		color: #899ebf;
	}

	.splash-frame__body {
		display: grid;
		grid-template-columns: minmax(14rem, 0.76fr) minmax(0, 1.5fr);
		min-height: 27rem;
	}

	.splash-identity {
		align-items: center;
		background:
			radial-gradient(circle at center, rgb(34 211 238 / 0.1), transparent 60%), #030d19;
		border-right: 1px solid #1f3149;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem;
		position: relative;
	}

	.splash-identity::before {
		border: 1px solid rgb(46 70 101 / 0.5);
		content: '';
		inset: 1rem;
		pointer-events: none;
		position: absolute;
	}

	.splash-emblem {
		display: grid;
		height: 10rem;
		place-items: center;
		position: relative;
		width: 10rem;
	}

	.splash-emblem::before,
	.splash-emblem::after,
	.splash-emblem__orbit {
		border-radius: 50%;
		content: '';
		position: absolute;
	}

	.splash-emblem::before {
		border: 1px dashed rgb(34 211 238 / 0.34);
		inset: 0.4rem;
	}

	.splash-emblem::after {
		animation: splash-rotate 7s linear infinite reverse;
		border: 1px solid #1f3149;
		border-left-color: #22d3ee;
		border-right-color: #22d3ee;
		inset: 1.45rem;
	}

	.splash-emblem__orbit {
		animation: splash-rotate 4.8s linear infinite;
		background: conic-gradient(from 20deg, transparent 0 62%, #22d3ee 70%, transparent 78%);
		inset: 0;
		mask: radial-gradient(circle, transparent 67%, black 68% 71%, transparent 72%);
	}

	.splash-emblem__orbit::after {
		background: #22d3ee;
		border-radius: 50%;
		box-shadow: 0 0 18px 3px rgb(34 211 238 / 0.55);
		content: '';
		height: 0.55rem;
		position: absolute;
		right: 0.72rem;
		top: 2.1rem;
		width: 0.55rem;
	}

	.splash-emblem__core {
		align-items: center;
		background: #061222;
		border: 1px solid #2e4665;
		border-radius: 1rem;
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.04),
			0 0 38px rgb(34 211 238 / 0.12);
		display: flex;
		height: 4.75rem;
		justify-content: center;
		position: relative;
		width: 4.75rem;
		z-index: 1;
	}

	.splash-emblem__core span {
		animation: splash-core-pulse 2.4s ease-in-out infinite;
		color: #22d3ee;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 1.45rem;
		font-weight: 700;
	}

	.splash-identity__copy {
		animation: splash-copy-in 580ms var(--splash-ease) 520ms both;
		margin-top: 1.4rem;
		text-align: center;
	}

	.splash-identity__copy p {
		font-size: 1.05rem;
		font-weight: 700;
	}

	.splash-identity__copy span {
		color: #899ebf;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.72rem;
	}

	.splash-console {
		display: flex;
		flex-direction: column;
		padding: clamp(1.5rem, 4vw, 2.75rem);
	}

	.splash-command,
	.splash-eyebrow,
	.splash-stage,
	.splash-output {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	}

	.splash-command {
		animation: splash-copy-in 480ms var(--splash-ease) 420ms both;
		color: #22d3ee;
		font-size: 0.75rem;
	}

	.splash-copy {
		animation: splash-copy-in 620ms var(--splash-ease) 560ms both;
		margin-top: 1.5rem;
	}

	.splash-eyebrow {
		color: #899ebf;
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.splash-copy h1 {
		font-size: clamp(1.65rem, 4vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.035em;
		line-height: 1.05;
		margin-top: 0.55rem;
	}

	.splash-copy > p:last-child {
		color: #94a3b8;
		font-size: 0.9rem;
		line-height: 1.65;
		margin-top: 0.85rem;
		max-width: 32rem;
	}

	.splash-stages {
		display: grid;
		gap: 0.6rem;
		margin-top: auto;
		padding-top: 2rem;
	}

	.splash-stage {
		align-items: center;
		animation: splash-stage-in 500ms var(--splash-ease) both;
		animation-delay: calc(940ms + var(--stage-index) * 440ms);
		display: grid;
		font-size: 0.7rem;
		gap: 0.75rem;
		grid-template-columns: auto auto minmax(1rem, 1fr) auto;
	}

	.splash-stage__index {
		color: #899ebf;
	}

	.splash-stage__label {
		display: grid;
		gap: 0.12rem;
	}

	.splash-stage__label strong {
		color: #eff6ff;
		font-size: 0.74rem;
		font-weight: 500;
	}

	.splash-stage__label small {
		color: #899ebf;
		font-family: inherit;
		font-size: 0.65rem;
	}

	.splash-stage__line {
		background: #1f3149;
		height: 1px;
		position: relative;
	}

	.splash-stage__line::after {
		animation: splash-line-fill 620ms ease-out both;
		animation-delay: calc(1080ms + var(--stage-index) * 440ms);
		background: linear-gradient(90deg, #22d3ee, #2dd4bf);
		content: '';
		inset: 0;
		position: absolute;
		transform-origin: left;
	}

	.splash-stage__status {
		align-items: center;
		color: #2dd4bf;
		display: flex;
		gap: 0.4rem;
	}

	.splash-stage__status > span {
		background: #2dd4bf;
		border-radius: 50%;
		box-shadow: 0 0 8px rgb(45 212 191 / 0.55);
		height: 0.38rem;
		width: 0.38rem;
	}

	.splash-frame__footer {
		background: #030d19;
		border-top: 1px solid #1f3149;
		padding: 1rem;
	}

	.splash-progress {
		background: #071426;
		border: 1px solid #1f3149;
		border-radius: 999px;
		height: 0.38rem;
		overflow: hidden;
	}

	.splash-progress__bar {
		animation: splash-progress 3.45s cubic-bezier(0.65, 0, 0.35, 1) 480ms both;
		background: linear-gradient(90deg, #22d3ee, #2dd4bf);
		box-shadow: 0 0 14px rgb(34 211 238 / 0.5);
		display: block;
		height: 100%;
		transform-origin: left;
	}

	.splash-output {
		display: flex;
		font-size: 0.68rem;
		justify-content: space-between;
		margin-top: 0.65rem;
	}

	.splash-output span {
		color: #899ebf;
	}

	.splash-output code {
		animation: splash-output-in 450ms ease-out 3.35s both;
		color: #2dd4bf;
		font-family: inherit;
	}

	.splash-screen__sr-only {
		clip: rect(0, 0, 0, 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	@media (max-width: 720px) {
		.splash-frame__body {
			grid-template-columns: 1fr;
		}

		.splash-identity {
			border-bottom: 1px solid #1f3149;
			border-right: 0;
			flex-direction: row;
			gap: 1.25rem;
			justify-content: flex-start;
			min-height: 9rem;
			padding: 1.35rem;
		}

		.splash-identity::before {
			inset: 0.65rem;
		}

		.splash-emblem {
			height: 6.5rem;
			width: 6.5rem;
		}

		.splash-emblem::after {
			inset: 1rem;
		}

		.splash-emblem__core {
			border-radius: 0.8rem;
			height: 3.5rem;
			width: 3.5rem;
		}

		.splash-emblem__core span {
			font-size: 1.05rem;
		}

		.splash-identity__copy {
			margin-top: 0;
			text-align: left;
		}

		.splash-console {
			min-height: 23rem;
		}

		.splash-session {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.splash-screen {
			align-items: flex-start;
			padding-top: 4.75rem;
		}

		.splash-frame__header {
			min-height: 2.75rem;
		}

		.splash-console {
			padding: 1.3rem;
		}

		.splash-stage {
			gap: 0.5rem;
			grid-template-columns: auto minmax(0, 1fr) auto;
		}

		.splash-stage__line {
			display: none;
		}

		.splash-stage__label small {
			max-width: 10rem;
		}

		.splash-output {
			gap: 1rem;
		}
	}

	@keyframes splash-life {
		0%,
		84% {
			clip-path: inset(0 0 0 0);
			opacity: 1;
			visibility: visible;
		}

		100% {
			clip-path: inset(0 0 100% 0);
			opacity: 0;
			visibility: hidden;
		}
	}

	@keyframes splash-dismiss {
		from {
			clip-path: inset(0 0 0 0);
			opacity: 1;
		}

		to {
			clip-path: inset(0 0 100% 0);
			opacity: 0;
			visibility: hidden;
		}
	}

	@keyframes splash-frame-in {
		from {
			opacity: 0;
			scale: 0.965;
			translate: 0 20px;
		}

		to {
			opacity: 1;
			scale: 1;
			translate: 0 0;
		}
	}

	@keyframes splash-copy-in {
		from {
			opacity: 0;
			translate: 0 10px;
		}

		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes splash-stage-in {
		from {
			opacity: 0;
			translate: 0 8px;
		}

		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes splash-line-fill {
		from {
			scale: 0 1;
		}

		to {
			scale: 1 1;
		}
	}

	@keyframes splash-progress {
		0% {
			scale: 0 1;
		}

		35% {
			scale: 0.28 1;
		}

		68% {
			scale: 0.71 1;
		}

		100% {
			scale: 1 1;
		}
	}

	@keyframes splash-output-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes splash-scan {
		0% {
			opacity: 0;
			translate: 0 0;
		}

		15%,
		80% {
			opacity: 0.75;
		}

		100% {
			opacity: 0;
			translate: 0 30rem;
		}
	}

	@keyframes splash-rotate {
		to {
			rotate: 1turn;
		}
	}

	@keyframes splash-glow {
		from {
			opacity: 0.6;
			translate: 0 0;
		}

		to {
			opacity: 1;
			translate: -8rem 6rem;
		}
	}

	@keyframes splash-dot {
		0%,
		100% {
			box-shadow: 0 0 0 rgb(34 211 238 / 0);
		}

		50% {
			box-shadow: 0 0 12px 2px rgb(34 211 238 / 0.45);
		}
	}

	@keyframes splash-core-pulse {
		0%,
		100% {
			opacity: 0.7;
		}

		50% {
			opacity: 1;
			text-shadow: 0 0 16px rgb(34 211 238 / 0.65);
		}
	}
</style>
