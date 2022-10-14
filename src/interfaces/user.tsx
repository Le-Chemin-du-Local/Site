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
	registeredPaymentMethods?: Array<RegisteredPaymentMethod>;
	defaultPaymentMethod?: RegisteredPaymentMethod;
}

export interface RegisteredPaymentMethod{
	name?: string;
	stripeID?: string;
	cardBrand?: string;
	cardLast4Digits?: string;
}
