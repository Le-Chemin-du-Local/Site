import {IronSessionOptions} from 'iron-session';
import {withIronSessionApiRoute} from 'iron-session/next';
import {NextApiHandler} from 'next';
import {COOKIE_SECRET, DEV_MODE} from '../constants/app';
import {Login} from '../pages/api/login';

const sessionOptions: IronSessionOptions = {
	password: COOKIE_SECRET + '',
	cookieName: 'iron-session/chemin-du-local.bzh',
	cookieOptions: {
		sameSite: 'lax',
		maxAge: 10000000,
		secure: DEV_MODE ? false : true,
	},
};

/**
 * Permet de faire des requêtes avec les infos de la session
 * @param {NextApiHandler} handler L'handler
 * @return {NextApiHandler} le handler avec un session
 */
export default function withSession(handler: NextApiHandler) {
	return withIronSessionApiRoute(handler, sessionOptions);
}

// C'est ici qu'on spécifie le type de `req.session`
declare module 'iron-session' {
	interface IronSessionData {
		user?: Login;
	}
}
