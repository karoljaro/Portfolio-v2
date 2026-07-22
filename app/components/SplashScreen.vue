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

	const bootEntries = computed(() => [
		{
			id: 'kernel',
			tone: 'info',
			status: t('splash.states.info'),
			message: t('splash.boot.kernel'),
			unit: 'kernel',
		},
		{
			id: 'filesystem',
			tone: 'ok',
			status: t('splash.states.ok'),
			message: t('splash.boot.filesystem'),
			unit: 'portfolio.mount',
		},
		{
			id: 'interface',
			tone: 'ok',
			status: t('splash.states.ok'),
			message: t('splash.boot.interface'),
			unit: 'ui.service',
		},
		{
			id: 'api',
			tone: 'ok',
			status: t('splash.states.ok'),
			message: t('splash.boot.api'),
			unit: 'api.routes',
		},
		{
			id: 'automation',
			tone: 'ok',
			status: t('splash.states.ok'),
			message: t('splash.boot.automation'),
			unit: 'automation.worker',
		},
		{
			id: 'private',
			tone: 'skip',
			status: t('splash.states.skip'),
			message: t('splash.boot.private'),
			unit: 'private.mount',
		},
		{
			id: 'deployment',
			tone: 'ok',
			status: t('splash.states.ok'),
			message: t('splash.boot.deployment'),
			unit: 'deployment.target',
		},
		{
			id: 'socket',
			tone: 'ok',
			status: t('splash.states.ok'),
			message: t('splash.boot.socket'),
			unit: 'contact.socket',
		},
	]);

	const systemFacts = computed(() => [
		{ label: t('splash.labels.host'), value: 'portfolio' },
		{ label: t('splash.labels.kernel'), value: '6.8.0-lts' },
		{ label: t('splash.labels.user'), value: 'karol' },
		{ label: t('splash.labels.role'), value: 'full-stack' },
	]);

	const capabilities = ['Nuxt', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'Linux'];

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

		fallbackTimer = setTimeout(completeSplash, 7800);
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
				<section class="splash-terminal">
					<div class="splash-kernel">
						<div class="splash-kernel__brand">
							<span aria-hidden="true">&gt;_</span>
							<strong>portfolioOS</strong>
							<small>v2.6.0-lts</small>
						</div>
						<p>{{ t('splash.kernel') }}</p>
					</div>

					<div class="splash-boot-log">
						<div
							v-for="(entry, index) in bootEntries"
							:key="entry.id"
							class="splash-log-line"
							:style="{ '--boot-index': index }"
						>
							<span
								class="splash-log-line__status"
								:data-tone="entry.tone"
							>
								<span>[</span>
								<strong>{{ entry.status }}</strong>
								<span>]</span>
							</span>
							<span class="splash-log-line__message">{{ entry.message }}</span>
							<code>{{ entry.unit }}</code>
						</div>
					</div>

					<p class="splash-target">
						<span aria-hidden="true">◆</span>
						{{ t('splash.reached') }}
					</p>

					<div class="splash-prompt">
						<p>
							<strong>karol@portfolio</strong><span>:~$</span>
							<code>{{ t('splash.command') }}</code>
						</p>
						<p class="splash-prompt__response">
							<span>{{ t('splash.handoff') }}</span>
							<span
								class="splash-cursor"
								aria-hidden="true"
							></span>
						</p>
					</div>
				</section>

				<aside class="splash-tui">
					<div class="splash-tui__header">
						<span>{{ t('splash.system') }}</span>
					</div>

					<div class="splash-tui__brand">
						<div class="splash-tui__mark">&gt;_</div>
						<div>
							<strong>Karol Jaroń</strong>
							<span>{{ t('splash.runtime') }}</span>
						</div>
					</div>

					<dl class="splash-tui__facts">
						<div
							v-for="(fact, index) in systemFacts"
							:key="fact.label"
							:style="{ '--fact-index': index }"
						>
							<dt>{{ fact.label }}</dt>
							<dd>{{ fact.value }}</dd>
						</div>
					</dl>

					<div class="splash-tui__health">
						<div>
							<span>{{ t('splash.labels.services') }}</span>
							<strong>5/5</strong>
						</div>
						<div>
							<span>{{ t('splash.labels.targets') }}</span>
							<strong>1/1</strong>
						</div>
						<div>
							<span>{{ t('splash.labels.errors') }}</span>
							<strong>0</strong>
						</div>
					</div>

					<div class="splash-tui__stack">
						<span>{{ t('splash.labels.modules') }}</span>
						<div>
							<code
								v-for="capability in capabilities"
								:key="capability"
							>
								{{ capability }}
							</code>
						</div>
					</div>

					<div class="splash-tui__state">
						<span></span>
						{{ t('splash.operational') }}
					</div>
				</aside>
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
		--splash-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		align-items: center;
		animation: splash-life 6s var(--splash-ease) both;
		background:
			radial-gradient(circle at 76% 18%, rgb(34 211 238 / 0.09), transparent 27rem),
			radial-gradient(circle at 14% 82%, rgb(45 212 191 / 0.06), transparent 24rem), #020a14;
		color: #eff6ff;
		display: flex;
		font-family: var(--splash-mono);
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
			linear-gradient(rgb(46 70 101 / 0.15) 1px, transparent 1px),
			linear-gradient(90deg, rgb(46 70 101 / 0.15) 1px, transparent 1px);
		background-size: 44px 44px;
		content: '';
		inset: 0;
		mask-image: radial-gradient(circle at center, black, transparent 78%);
		opacity: 0.42;
		pointer-events: none;
		position: absolute;
		z-index: -2;
	}

	.splash-screen::after {
		animation: splash-glow 4.5s ease-in-out infinite alternate;
		background: radial-gradient(circle, rgb(34 211 238 / 0.14), transparent 68%);
		border-radius: 999px;
		content: '';
		height: min(58rem, 90vw);
		pointer-events: none;
		position: absolute;
		right: -18rem;
		top: -22rem;
		width: min(58rem, 90vw);
		z-index: -1;
	}

	.splash-skip {
		align-items: center;
		background: rgb(3 13 25 / 0.9);
		border: 1px solid #1f3149;
		border-radius: 999px;
		color: #94a3b8;
		cursor: pointer;
		display: flex;
		font-family: inherit;
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
		animation: splash-frame-in 680ms var(--splash-ease) 100ms both;
		background: rgb(3 13 25 / 0.98);
		border: 1px solid #2e4665;
		border-radius: 0.7rem;
		box-shadow:
			0 40px 110px -52px rgb(34 211 238 / 0.4),
			0 24px 80px -48px rgb(0 0 0 / 0.95);
		max-width: 68rem;
		overflow: hidden;
		position: relative;
		width: 100%;
	}

	.splash-frame__scan {
		animation: splash-scan 2.1s ease-in-out 620ms 2 both;
		background: linear-gradient(90deg, transparent, rgb(34 211 238 / 0.58), transparent);
		box-shadow: 0 0 16px rgb(34 211 238 / 0.4);
		height: 1px;
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 3;
	}

	.splash-frame__header {
		align-items: center;
		background: #030d19;
		border-bottom: 1px solid #1f3149;
		display: flex;
		font-size: 0.71rem;
		justify-content: space-between;
		min-height: 3rem;
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
		height: 0.52rem;
		width: 0.52rem;
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
		grid-template-columns: minmax(0, 1.7fr) minmax(16rem, 0.72fr);
		min-height: 30rem;
	}

	.splash-terminal {
		background: linear-gradient(rgb(34 211 238 / 0.018), rgb(34 211 238 / 0.018)), #020a14;
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding: clamp(1.35rem, 3vw, 2.2rem);
	}

	.splash-kernel {
		animation: boot-header-in 420ms steps(4, end) 280ms both;
		border-bottom: 1px dashed rgb(46 70 101 / 0.7);
		padding-bottom: 1rem;
	}

	.splash-kernel__brand {
		align-items: baseline;
		display: flex;
		gap: 0.5rem;
	}

	.splash-kernel__brand > span {
		color: #22d3ee;
		font-size: 0.8rem;
		font-weight: 700;
	}

	.splash-kernel__brand strong {
		font-size: 0.88rem;
		letter-spacing: 0.035em;
	}

	.splash-kernel__brand small {
		color: #2dd4bf;
		font-size: 0.62rem;
	}

	.splash-kernel p {
		color: #899ebf;
		font-size: 0.66rem;
		line-height: 1.55;
		margin-top: 0.45rem;
	}

	.splash-boot-log {
		display: grid;
		margin-top: 1rem;
	}

	.splash-log-line {
		align-items: center;
		animation: boot-line-in 300ms steps(4, end) both;
		animation-delay: calc(520ms + var(--boot-index) * 350ms);
		display: grid;
		font-size: 0.69rem;
		gap: 0.7rem;
		grid-template-columns: 4.7rem minmax(0, 1fr) auto;
		min-height: 2rem;
		position: relative;
	}

	.splash-log-line::before {
		animation: boot-line-flash 420ms ease-out both;
		animation-delay: calc(520ms + var(--boot-index) * 350ms);
		background: linear-gradient(90deg, rgb(34 211 238 / 0.08), transparent 70%);
		content: '';
		inset: 0 -0.4rem;
		pointer-events: none;
		position: absolute;
	}

	.splash-log-line__status {
		display: grid;
		font-size: 0.64rem;
		grid-template-columns: auto 1fr auto;
		position: relative;
		text-align: center;
		z-index: 1;
	}

	.splash-log-line__status strong {
		font-weight: 700;
		letter-spacing: 0.04em;
	}

	.splash-log-line__status[data-tone='ok'] {
		color: #2dd4bf;
	}

	.splash-log-line__status[data-tone='info'] {
		color: #22d3ee;
	}

	.splash-log-line__status[data-tone='skip'] {
		color: #fbbf24;
	}

	.splash-log-line__message {
		color: #cbd5e1;
		min-width: 0;
		position: relative;
		z-index: 1;
	}

	.splash-log-line code {
		color: #607899;
		font-family: inherit;
		font-size: 0.6rem;
		position: relative;
		z-index: 1;
	}

	.splash-target {
		animation: boot-target-in 380ms var(--splash-ease) 3.38s both;
		border-bottom: 1px dashed rgb(45 212 191 / 0.25);
		border-top: 1px dashed rgb(45 212 191 / 0.25);
		color: #2dd4bf;
		font-size: 0.68rem;
		margin-top: 0.75rem;
		padding: 0.65rem 0;
	}

	.splash-target span {
		display: inline-block;
		font-size: 0.55rem;
		margin-right: 0.55rem;
	}

	.splash-prompt {
		animation: boot-prompt-in 480ms var(--splash-ease) 3.75s both;
		background: #030d19;
		border: 1px solid #1f3149;
		font-size: 0.68rem;
		line-height: 1.6;
		margin-top: auto;
		padding: 0.8rem 0.9rem;
	}

	.splash-prompt strong {
		color: #22d3ee;
		font-weight: 600;
	}

	.splash-prompt > p:first-child > span {
		color: #94a3b8;
	}

	.splash-prompt code {
		color: #eff6ff;
		font-family: inherit;
		margin-left: 0.55rem;
	}

	.splash-prompt__response {
		animation: boot-response-in 240ms steps(2, end) 4.18s both;
		color: #2dd4bf;
	}

	.splash-cursor {
		animation: boot-cursor 700ms step-end 4.2s infinite;
		background: #2dd4bf;
		display: inline-block;
		height: 0.75rem;
		margin-left: 0.3rem;
		vertical-align: -0.1rem;
		width: 0.38rem;
	}

	.splash-tui {
		animation: tui-in 540ms var(--splash-ease) 580ms both;
		background: linear-gradient(rgb(34 211 238 / 0.025), rgb(34 211 238 / 0.025)), #030d19;
		border-left: 1px solid #1f3149;
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding: 1.25rem;
	}

	.splash-tui__header {
		align-items: center;
		color: #22d3ee;
		display: flex;
		font-size: 0.62rem;
		gap: 0.65rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.splash-tui__header::before,
	.splash-tui__header::after {
		background: #2e4665;
		content: '';
		height: 1px;
	}

	.splash-tui__header::before {
		width: 0.75rem;
	}

	.splash-tui__header::after {
		flex: 1;
	}

	.splash-tui__brand {
		align-items: center;
		border-bottom: 1px solid #1f3149;
		display: flex;
		gap: 0.8rem;
		padding: 1.2rem 0;
	}

	.splash-tui__mark {
		align-items: center;
		background: #061222;
		border: 1px solid #2e4665;
		color: #22d3ee;
		display: flex;
		font-size: 0.9rem;
		height: 2.65rem;
		justify-content: center;
		width: 2.65rem;
	}

	.splash-tui__brand > div:last-child {
		display: grid;
		gap: 0.2rem;
	}

	.splash-tui__brand strong {
		font-size: 0.72rem;
	}

	.splash-tui__brand span {
		color: #899ebf;
		font-size: 0.58rem;
	}

	.splash-tui__facts {
		display: grid;
		margin-top: 0.85rem;
	}

	.splash-tui__facts > div {
		animation: tui-row-in 280ms steps(3, end) both;
		animation-delay: calc(900ms + var(--fact-index) * 180ms);
		border-bottom: 1px dashed rgb(46 70 101 / 0.55);
		display: flex;
		font-size: 0.62rem;
		justify-content: space-between;
		padding: 0.48rem 0;
	}

	.splash-tui__facts dt {
		color: #607899;
		text-transform: uppercase;
	}

	.splash-tui__facts dd {
		color: #cbd5e1;
	}

	.splash-tui__health {
		display: grid;
		gap: 0.4rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 1rem;
	}

	.splash-tui__health > div {
		animation: tui-cell-in 360ms var(--splash-ease) 1.6s both;
		background: #061222;
		border: 1px solid #1f3149;
		display: grid;
		gap: 0.3rem;
		padding: 0.55rem 0.25rem;
		text-align: center;
	}

	.splash-tui__health span {
		color: #607899;
		font-size: 0.5rem;
		text-transform: uppercase;
	}

	.splash-tui__health strong {
		color: #2dd4bf;
		font-size: 0.72rem;
	}

	.splash-tui__stack {
		animation: tui-row-in 360ms var(--splash-ease) 1.9s both;
		margin-top: 1rem;
	}

	.splash-tui__stack > span {
		color: #607899;
		font-size: 0.55rem;
		text-transform: uppercase;
	}

	.splash-tui__stack > div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.55rem;
	}

	.splash-tui__stack code {
		background: #061222;
		border: 1px solid #1f3149;
		color: #899ebf;
		font-family: inherit;
		font-size: 0.5rem;
		padding: 0.2rem 0.35rem;
	}

	.splash-tui__state {
		align-items: center;
		animation: tui-state-in 380ms var(--splash-ease) 3.25s both;
		border-top: 1px solid #1f3149;
		color: #2dd4bf;
		display: flex;
		font-size: 0.62rem;
		gap: 0.5rem;
		margin-top: auto;
		padding-top: 0.85rem;
		text-transform: uppercase;
	}

	.splash-tui__state span {
		animation: tui-state-pulse 1.25s ease-in-out infinite;
		background: #2dd4bf;
		border-radius: 50%;
		box-shadow: 0 0 8px rgb(45 212 191 / 0.55);
		height: 0.42rem;
		width: 0.42rem;
	}

	.splash-frame__footer {
		background: #030d19;
		border-top: 1px solid #1f3149;
		padding: 0.85rem 1rem;
	}

	.splash-progress {
		background: #071426;
		border: 1px solid #1f3149;
		height: 0.3rem;
		overflow: hidden;
	}

	.splash-progress__bar {
		animation: splash-progress 4.55s cubic-bezier(0.65, 0, 0.35, 1) 300ms both;
		background: linear-gradient(90deg, #22d3ee, #2dd4bf);
		box-shadow: 0 0 14px rgb(34 211 238 / 0.5);
		display: block;
		height: 100%;
		transform-origin: left;
	}

	.splash-output {
		display: flex;
		font-size: 0.61rem;
		justify-content: space-between;
		margin-top: 0.55rem;
	}

	.splash-output span {
		color: #607899;
	}

	.splash-output code {
		animation: splash-output-in 320ms steps(2, end) 4.35s both;
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

	@media (max-width: 800px) {
		.splash-frame__body {
			grid-template-columns: 1fr;
		}

		.splash-terminal {
			min-height: 27rem;
		}

		.splash-tui {
			border-left: 0;
			border-top: 1px solid #1f3149;
			padding: 0.85rem 1.1rem;
		}

		.splash-tui__brand,
		.splash-tui__facts,
		.splash-tui__stack {
			display: none;
		}

		.splash-tui__header {
			margin-bottom: 0.7rem;
		}

		.splash-tui__health {
			margin-top: 0;
		}

		.splash-tui__health > div {
			padding: 0.45rem 0.25rem;
		}

		.splash-tui__state {
			justify-content: flex-end;
			margin-top: 0.65rem;
			padding-top: 0.65rem;
		}
	}

	@media (max-width: 520px) {
		.splash-screen {
			align-items: flex-start;
			padding: 4.75rem 0.75rem 1rem;
		}

		.splash-frame__header {
			min-height: 2.7rem;
			padding: 0 0.75rem;
		}

		.splash-session {
			display: none;
		}

		.splash-terminal {
			min-height: 25.25rem;
			padding: 1rem;
		}

		.splash-kernel {
			padding-bottom: 0.7rem;
		}

		.splash-kernel p {
			font-size: 0.56rem;
		}

		.splash-boot-log {
			margin-top: 0.7rem;
		}

		.splash-log-line {
			font-size: 0.6rem;
			gap: 0.35rem;
			grid-template-columns: 4rem minmax(0, 1fr);
			min-height: 1.72rem;
		}

		.splash-log-line__status {
			font-size: 0.55rem;
		}

		.splash-log-line code {
			display: none;
		}

		.splash-target {
			font-size: 0.58rem;
			margin-top: 0.55rem;
			padding: 0.5rem 0;
		}

		.splash-prompt {
			font-size: 0.59rem;
			padding: 0.6rem 0.7rem;
		}

		.splash-prompt code {
			display: block;
			margin-left: 0;
		}

		.splash-tui {
			padding: 0.7rem 0.85rem;
		}

		.splash-frame__footer {
			padding: 0.7rem 0.75rem;
		}

		.splash-output {
			font-size: 0.54rem;
			gap: 0.75rem;
		}
	}

	@media (max-height: 760px) and (min-width: 801px) {
		.splash-frame__body {
			min-height: 26rem;
		}

		.splash-terminal {
			padding-bottom: 1.25rem;
			padding-top: 1.25rem;
		}

		.splash-log-line {
			min-height: 1.75rem;
		}
	}

	@keyframes splash-life {
		0%,
		87% {
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
			scale: 0.98;
			translate: 0 14px;
		}

		to {
			opacity: 1;
			scale: 1;
			translate: 0 0;
		}
	}

	@keyframes boot-header-in {
		from {
			clip-path: inset(0 100% 0 0);
			opacity: 0;
		}

		to {
			clip-path: inset(0 0 0 0);
			opacity: 1;
		}
	}

	@keyframes boot-line-in {
		from {
			clip-path: inset(0 100% 0 0);
			opacity: 0;
			translate: 0 3px;
		}

		to {
			clip-path: inset(0 0 0 0);
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes boot-line-flash {
		from {
			opacity: 0.9;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes boot-target-in {
		from {
			opacity: 0;
			translate: 0 8px;
		}

		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes boot-prompt-in {
		from {
			border-color: transparent;
			opacity: 0;
			translate: 0 8px;
		}

		to {
			border-color: #1f3149;
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes boot-response-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes boot-cursor {
		0%,
		49% {
			opacity: 1;
		}

		50%,
		100% {
			opacity: 0;
		}
	}

	@keyframes tui-in {
		from {
			opacity: 0;
			translate: 12px 0;
		}

		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes tui-row-in {
		from {
			clip-path: inset(0 100% 0 0);
			opacity: 0;
		}

		to {
			clip-path: inset(0 0 0 0);
			opacity: 1;
		}
	}

	@keyframes tui-cell-in {
		from {
			opacity: 0;
			scale: 0.94;
		}

		to {
			opacity: 1;
			scale: 1;
		}
	}

	@keyframes tui-state-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes tui-state-pulse {
		0%,
		100% {
			box-shadow: 0 0 0 rgb(45 212 191 / 0);
			opacity: 0.65;
		}

		50% {
			box-shadow: 0 0 9px 2px rgb(45 212 191 / 0.48);
			opacity: 1;
		}
	}

	@keyframes splash-progress {
		0% {
			scale: 0 1;
		}

		18% {
			scale: 0.12 1;
		}

		48% {
			scale: 0.46 1;
		}

		76% {
			scale: 0.78 1;
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
			opacity: 0.65;
		}

		100% {
			opacity: 0;
			translate: 0 34rem;
		}
	}

	@keyframes splash-glow {
		from {
			opacity: 0.55;
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
</style>
