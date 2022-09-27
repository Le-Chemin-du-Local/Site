import { useState } from 'react';
import Layout from '../../components/organisms/layout';
import { Basket } from '../../interfaces/basket';

/**
 * La page du panier
 * @return {JSX.Element} Le panier du client
 */
export default function BasketPage(): JSX.Element {
	const [basket, setBasket] = useState({commerces: []} as Basket);

	return (
		<Layout title="Mon panier">
			<p>Hello Panier</p>
		</Layout>
	);
}
