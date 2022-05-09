import {AppProps} from 'next/app';
import '../styles/globals.css';

/**
 * L'objet application
 * @param {{Component, pageProps}} param0 Les paramètres passé à l'application
 * @return {AppProps} le HTML de l'application
 */
function MyApp({Component, pageProps}: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
