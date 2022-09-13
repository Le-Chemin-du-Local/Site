import {NextApiRequest, NextApiResponse} from 'next';
import withSession from '../../helpers/session';

export type Login = {
	jwt: string;
}

export default withSession(
	async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
		const {jwt} = await req.body;
		const user = {jwt: jwt} as Login;

		req.session.user = user;
		await req.session.save();

		res.json(user);
	}
);
