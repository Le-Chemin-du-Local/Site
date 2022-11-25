module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				Rubik: ['Rubik', 'sans-serif'],
			},
			colors: {
				'primary-color': '#ff5858',
				'secondary-color': '#ff8c60',
				'primary-color-lightened': '#ffc9c9',
				'secondary-color-lightened': '#ffc9b2',

				'light-grey-1': '#f4f4f4',
				'light-grey-2': '#dadada',
				'light-grey-3': '#bbbbbb',
				'dark-grey': '#454545',

				'error': '#e34141',
				'error-container': '#ffadad',
				'success': '#519B53',
				'success-container': '#B8FFBA',
				'warning-container': '#F4BD2A',
				'information-container': '#36A2B1',
			},
			backgroundImage: {
				'illustration-1': 'url("/images/illustration_1.png")',
				'illustration-2': 'url("/images/illustration_2.png")',
				'illustration-3': 'url("/images/illustration_3.png")',
				'illustration-4': 'url("/images/illustration_4.png")',
				'home-header': 'url("/images/homeheader.webp")',
				'illustration-click-and-collect': 'url("/images/illustration_click_and_collect.png")',
				'hero-pattern': 'linear-gradient(90deg, #292929 0%, rgba(0, 0, 0, 0) 62.46%), url("/images/homeheader.webp")',
				'breizhine-header-pattern': 'linear-gradient(90deg, #292929 0%, rgba(0, 0, 0, 0) 62.46%), url("/images/breizhineheader.webp")',
				'qui-sommes-nous-header-pattern': 'linear-gradient(90deg, #292929 0%, rgba(0, 0, 0, 0) 62.46%), url("/images/quisommesnousheader.webp")',
				'devenir-commercant-header-pattern': 'linear-gradient(90deg, #292929 0%, rgba(0, 0, 0, 0) 62.46%), url("/images/devenircommercantheader.webp")',
				'hero2': 'linear-gradient(90deg, #292929 0%, rgba(0, 0, 0, 0) 62.46%), url("/images/hero2.webp")',
			},
			maxWidth: {
				'max-content': '1386px',
			},
		},
	},
	plugins: [],
};
