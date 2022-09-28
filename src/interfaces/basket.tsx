/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {CCProduct} from './product';

export interface Basket {
	commerces: Array<BasketCommerce>;
}

export interface BasketCommerce {
	commerceID?: string;
	pickupDate?: Date;
	products?: Array<CCProduct>;
}

/**
 * Ajoute un produit au panier en localStorage
 * @param {string} commerceID L'ID du commerce
 * @param {string} productID L'ID du produit
 * @return {Basket} retourn le basket final
 */
export function basketAddProductToLocal(commerceID: string, productID: string): Basket {
	let basket = {commerces: []} as Basket;

	if (localStorage.getItem('basket') != undefined) {
		basket = JSON.parse(localStorage.getItem('basket') ?? '');
	}

	const commerceIndex = basket.commerces.findIndex((commerce) => commerce.commerceID == commerceID);

	// Premier cas, le commerce existe déjà
	if (commerceIndex >= 0) {
		const productIndex = basket.commerces[commerceIndex].products?.findIndex((product) => product.productID == productID);

		// Premier cas, on doit simplement augmenter la quantitée
		if (productIndex != undefined && productIndex >= 0) {
			basket.commerces[commerceIndex].products![productIndex].quantity++;
		} else {
			// On doit créer le produit
			basket.commerces[commerceIndex].products = [
				...(basket.commerces[commerceIndex].products ?? []),
				{
					productID: productID,
					quantity: 1,
				},
			];
		}
	} else {
		// Cas ou le commerce n'existe pas
		basket = {
			commerces: [
				...basket.commerces,
				{
					commerceID: commerceID,
					products: [
						{
							productID: productID,
							quantity: 1,
						},
					],
				},
			],
		};
	}

	localStorage.setItem('basket', JSON.stringify(basket));
	return basket;
}

/**
 * Enlève un produit du panier (réduit sa quantité de 1)
 * @param {string} commerceID L'ID du commerce
 * @param {string} productID {string} L'ID du produit
 * @return {Basket} Le nouveau panier
 */
export function basketRemoveProductToLocal(commerceID: string, productID: string): Basket {
	let basket = {commerces: []} as Basket;

	if (localStorage.getItem('basket') != undefined) {
		basket = JSON.parse(localStorage.getItem('basket') ?? '');
	}

	const commerceIndex = basket.commerces.findIndex((commerce) => commerce.commerceID == commerceID);

	if (commerceIndex >= 0) {
		const productIndex = basket.commerces[commerceIndex].products?.findIndex((product) => product.productID == productID);

		if (productIndex != undefined && productIndex >= 0) {
			// Soit on réduit la quantité, soit on supprime le produit
			if (basket.commerces[commerceIndex].products![productIndex].quantity > 1) {
				basket.commerces[commerceIndex].products![productIndex].quantity--;
			} else {
				basket.commerces[commerceIndex].products!.splice(productIndex, 1);
			}
		}
	}

	localStorage.setItem('basket', JSON.stringify(basket));
	return basket;
}


/**
 * Enlève un produit du panier (réduit sa quantité de 1)
 * @param {string} commerceID L'ID du commerce
 * @param {string} productID {string} L'ID du produit
 * @return {Basket} Le nouveau panier
 */
export function basketDeleteProductToLocal(commerceID: string, productID: string): Basket {
	let basket = {commerces: []} as Basket;

	if (localStorage.getItem('basket') != undefined) {
		basket = JSON.parse(localStorage.getItem('basket') ?? '');
	}

	const commerceIndex = basket.commerces.findIndex((commerce) => commerce.commerceID == commerceID);

	if (commerceIndex >= 0) {
		const productIndex = basket.commerces[commerceIndex].products?.findIndex((product) => product.productID == productID);

		if (productIndex != undefined && productIndex >= 0) {
			basket.commerces[commerceIndex].products!.splice(productIndex, 1);
		}

		// Si c'était le dernier produit on doit supprimer le commerce
		if (basket.commerces[commerceIndex].products!.length <= 0) {
			basket.commerces.splice(commerceIndex, 1);
		}
	}

	localStorage.setItem('basket', JSON.stringify(basket));
	return basket;
}
