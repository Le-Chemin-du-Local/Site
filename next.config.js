/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = {
	...nextConfig,
	reactStrictMode: false,
	images: {
		domains: [
			'localhost',
			'api-beta.chemin-du-local.bzh',
			'chemin-du-local.bzh',
		],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	async redirects() {
		return [
			{
				source: '/commerces',
				destination: '/commerces/page/1',
				permanent: true,
			},
			{
				source: '/commerces/:slug(\\d{1,})',
				destination: '/commerces/page/:slug',
				permanent: true,
			},
		];
	},
};
