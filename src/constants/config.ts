import * as CONSTANTS from './app';

const getAPIUrl = () => {
	let url = '';

	if (CONSTANTS.DEV_MODE) {
		url = CONSTANTS.BACKEND_URL_DEV + '/query';
	} else {
		url = CONSTANTS.BACKEND_URL_PROD + '/query';
	}

	return url;
};

const getBackendUrl = () => {
	let url = '';

	if (CONSTANTS.DEV_MODE) {
		url = CONSTANTS.BACKEND_URL_DEV;
	} else {
		url = CONSTANTS.BACKEND_URL_PROD;
	}

	return url;
};

const getAppUrl = () => {
	let url = '';

	if (CONSTANTS.DEV_MODE) {
		url = CONSTANTS.APP_URL_DEV;
	} else {
		url = CONSTANTS.APP_URL_PROD;
	}

	return url;
};

export const API_URL = getAPIUrl();
export const BACKEND_URL = getBackendUrl();
export const APP_URL = getAppUrl();
