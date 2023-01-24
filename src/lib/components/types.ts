export interface Pagination<T> {
	items: T[];
	total: number;
	skip: number;
	limit: number;
}

export interface Todo {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
}

export interface User {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
}

export interface Auth extends User {
	token: string;
}
