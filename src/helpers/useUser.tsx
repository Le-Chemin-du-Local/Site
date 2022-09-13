import useSWR from 'swr';
import {Login} from '../pages/api/login';

// eslint-disable-next-line require-jsdoc
export default function useUser() {
	const fetcher = (...args: unknown[]) => fetch(...(args as [string])).then((res) => res.json());

	const {data: login, mutate: mutateLogin} = useSWR<Login>(
		'/api/user',
		fetcher
	) as {
		data: Login;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mutate: any;
	};

	return {login, mutateLogin};
}
