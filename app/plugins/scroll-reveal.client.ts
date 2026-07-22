const revealTargetSelector = '.scroll-reveal-self, .scroll-reveal-item, .scroll-reveal > *';
const sectionLabelSelector = '.section-label';
const viewportEdgeTargetSelector = 'footer.scroll-reveal-self';
const fallbackStateAttribute = 'data-scroll-reveal-fallback';
const loadOnPageMediaQuery = '(min-width: 64rem) and (min-height: 48rem)';

const supportsNativeScrollReveal = () => {
	const probe = document.createElement('div').style;

	probe.setProperty('animation-timeline', 'view()');
	probe.setProperty('animation-range', 'entry 0% cover 24%');

	return (
		probe.getPropertyValue('animation-timeline') !== '' &&
		probe.getPropertyValue('animation-range') !== ''
	);
};

export default defineNuxtPlugin((nuxtApp) => {
	if (supportsNativeScrollReveal() || !('IntersectionObserver' in window)) {
		return;
	}

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	const loadOnPage = window.matchMedia(loadOnPageMediaQuery);
	const processedTargets = new Set<HTMLElement>();
	let observer: IntersectionObserver | undefined;
	let viewportEdgeObserver: IntersectionObserver | undefined;

	const resetFallback = () => {
		observer?.disconnect();
		viewportEdgeObserver?.disconnect();
		observer = undefined;
		viewportEdgeObserver = undefined;

		for (const target of processedTargets) {
			target.removeAttribute(fallbackStateAttribute);
			target.style.removeProperty('--reveal-fallback-delay');
		}

		processedTargets.clear();
	};

	const revealTarget = (target: HTMLElement) => {
		target.setAttribute(fallbackStateAttribute, 'revealed');
		observer?.unobserve(target);
		viewportEdgeObserver?.unobserve(target);
	};

	const createObserver = (rootMargin: string) =>
		new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						revealTarget(entry.target as HTMLElement);
					}
				}
			},
			{
				rootMargin,
				threshold: 0.01,
			},
		);

	const usesLoadOnPageAnimation = (target: HTMLElement) =>
		loadOnPage.matches &&
		(target.classList.contains('about-load-reveal') ||
			target.classList.contains('section-label--load'));

	const observeTarget = (target: HTMLElement, delay = 0) => {
		if (processedTargets.has(target)) {
			return;
		}

		processedTargets.add(target);

		if (usesLoadOnPageAnimation(target)) {
			return;
		}

		target.setAttribute(fallbackStateAttribute, 'pending');
		if (delay > 0) {
			target.style.setProperty('--reveal-fallback-delay', `${delay}ms`);
		}

		const targetObserver = target.matches(viewportEdgeTargetSelector)
			? viewportEdgeObserver
			: observer;

		targetObserver?.observe(target);
	};

	const observePage = () => {
		if (reducedMotion.matches) {
			resetFallback();
			return;
		}

		try {
			observer ??= createObserver('0px 0px -10% 0px');
			viewportEdgeObserver ??= createObserver('0px');

			const revealTargets = Array.from(
				document.querySelectorAll<HTMLElement>(revealTargetSelector),
			);
			const siblingIndexes = new Map<Element, number>();

			for (const target of revealTargets) {
				const parent = target.parentElement;
				const siblingIndex = parent ? (siblingIndexes.get(parent) ?? 0) : 0;
				const delay = Math.min(siblingIndex * 70, 210);

				if (parent) {
					siblingIndexes.set(parent, siblingIndex + 1);
				}

				observeTarget(target, delay);
			}

			for (const label of document.querySelectorAll<HTMLElement>(sectionLabelSelector)) {
				observeTarget(label);
			}
		} catch {
			resetFallback();
		}
	};

	nuxtApp.hook('app:mounted', observePage);
	nuxtApp.hook('page:finish', () => {
		requestAnimationFrame(observePage);
	});

	reducedMotion.addEventListener('change', observePage);
});
