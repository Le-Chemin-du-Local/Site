import * as CONSTANTS from './app';

const getAPIUrl = () => {
	let url = '';

	if (CONSTANTS.DEV_MODE) {
		url = CONSTANTS.API_URL_DEV;
	} else {
		url = CONSTANTS.API_URL_PROD;
	}

	return url;
};

export const API_URL = getAPIUrl();
