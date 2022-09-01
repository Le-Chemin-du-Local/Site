module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
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
		},
	},
	plugins: [],
};
