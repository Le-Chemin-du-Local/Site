export enum RoleUser {
	ADMIN = 'ADMIN',
	STOREKEEPER = 'STOREKEEPER',
	USER = 'USER',
}

export interface User {
	id?: string;
	createdAt?: Date;
	email?: string;
	role?: RoleUser;
	firstName?: string;
	lastName?: string;
}
