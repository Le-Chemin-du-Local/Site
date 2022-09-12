import {ApolloProvider} from '@apollo/client';
import {AppProps} from 'next/app';
import '../../styles/globals.css';
import client from '../apollo/client';

/**
 * L'objet application
 * @param {{Component, pageProps}} param0 Les paramètres passé à l'application
 * @return {JSX.Element} le HTML de l'application
 */
function MyApp({Component, pageProps}: AppProps): JSX.Element {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
