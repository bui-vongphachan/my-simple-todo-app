import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

export const user = (() => {
	if (!isBrowser) return null;
	return localStorage.getItem('user');
})();

export const isAuthenticated = writable(!!user);
