export const capitalize = (str: string) =>
	`${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const qs = (selector: string, scope = document) =>
	scope.querySelector(selector);

export const qsa = (selector: string, scope = document) =>
	scope.querySelectorAll(selector);

export const ref = (id: string) => qs(`[data-ref=${id}]`);

export const shuffleArray = <T>(array: T[]): T[] => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export const formatBigNumber = (number: number): string => {
	if (number < 1000) {
		return number.toString();
	} else if (number < 1000000) {
		return `${(number / 1000).toFixed(1)}k`;
	} else if (number < 1000000000) {
		return `${(number / 1000000).toFixed(1)}M`;
	} else {
		return `${(number / 1000000000).toFixed(1)}B`;
	}
};

export const scrollRestoration = () => {
	const mainContainer = ref('main');
	mainContainer?.scrollTo({ top: 0, behavior: 'smooth' });
};

export const constructName = (
	firstName: string | undefined | null,
	lastName: string | undefined | null,
	username: string | undefined | null
) => {
	if (firstName && lastName) {
		return `${firstName} ${lastName}`;
	}

	if (firstName) {
		return firstName;
	}

	if (username) {
		return username;
	}

	return 'Anonymous';
};

export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));
