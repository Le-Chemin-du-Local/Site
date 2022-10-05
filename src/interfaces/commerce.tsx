import {Address} from './address';
import {Product, ProductConnection} from './product';

export interface CommerceConnection{
    totalCount: number;
	edges: Array<CommerceEdge>;
	pageInfo?: CommercePageInfo;
}

export interface CommerceEdge{
	node:	Commerce;
	cursor?: string;
}

export interface CommercePageInfo{
	startCursor?: string;
	endCursor?: string;
	hasNextPage?: boolean;
}

export interface Commerce{
	id: string;
	// storekeeper?: User;
	name?: string;
	description?: string;
	storekeeperWord?: string;
	address?: Address;
	latitude?: number;
	longitude?: number;
	phone?: string;
	email?: string;
	facebook?: string;
	twitter?: string;
	instagram?: string
	businessHours?: BusinessHours;
	clickAndCollectHours?: BusinessHours;
	categories?: Array<string>;
	products?: ProductConnection;
	services?: Array<string>;
	productsAvailableForClickAndCollect?: Array<Product>;
	// paniers?: PanierConnection;
}

export interface BusinessHours {
	monday: Array<Schedule>;
	tuesday: Array<Schedule>;
	wednesday: Array<Schedule>;
	thursday: Array<Schedule>;
	friday: Array<Schedule>;
	saturday: Array<Schedule>;
	sunday: Array<Schedule>;
}

/**
 * Vérifie que les horaires sont vides
 * @param {BusinessHours} businessHours Les horaires à vérifier
 * @return {bool} si il y a bien des horaires
 */
export function isBusinessHoursEmpty(businessHours: BusinessHours): boolean {
	if (businessHours.monday.length > 0) return false;
	if (businessHours.tuesday.length > 0) return false;
	if (businessHours.wednesday.length > 0) return false;
	if (businessHours.thursday.length > 0) return false;
	if (businessHours.friday.length > 0) return false;
	if (businessHours.saturday.length > 0) return false;
	if (businessHours.sunday.length > 0) return false;

	return true;
}

/**
 * Retourn si est ouvert à la date indiqué
 * @param {boolean} date La date dont on cherche l'ouverture
 * @param {BusinessHours} businessHours Les horaires d'ouverture
 * @return {boolean} Si la date est ouverte pour les horaires
 */
export function isOpenOnBusinessHours(date: Date, businessHours: BusinessHours): boolean {
	if (date.getDay() == 0 && businessHours.sunday.length > 0) return true;
	if (date.getDay() == 1 && businessHours.monday.length > 0) return true;
	if (date.getDay() == 2 && businessHours.tuesday.length > 0) return true;
	if (date.getDay() == 3 && businessHours.wednesday.length > 0) return true;
	if (date.getDay() == 4 && businessHours.thursday.length > 0) return true;
	if (date.getDay() == 5 && businessHours.friday.length > 0) return true;
	if (date.getDay() == 6 && businessHours.saturday.length > 0) return true;
	return false;
}


export interface Schedule{
	opening: string;
	closing: string;
}
