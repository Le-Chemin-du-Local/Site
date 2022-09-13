import {NextApiRequest, NextApiResponse} from 'next';
import withSession from '../../helpers/session';

export default withSession(
	async function userRoute(req: NextApiRequest, res: NextApiResponse) {
		res.json({
			...req.session.user,
		});
	}
);
