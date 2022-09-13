import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {API_URL} from '../constants/config';

const httpLink = createHttpLink({
	uri: API_URL,
});

const authLink = setContext((_, context) => {
	const {accessToken} = context;

	return {
		headers: {
			...context.headers,
			authorization: accessToken ? accessToken : '',
		},
	};
});

const clientWithHeader = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default clientWithHeader;
