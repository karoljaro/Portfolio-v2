export const getElementLineHeight = (element: HTMLElement) => {
	const styles = window.getComputedStyle(element);
	const parsed = Number.parseFloat(styles.lineHeight);

	if (Number.isFinite(parsed)) {
		return parsed;
	}

	const fontSize = Number.parseFloat(styles.fontSize);
	return Number.isFinite(fontSize) ? fontSize * 1.2 : 16;
};
