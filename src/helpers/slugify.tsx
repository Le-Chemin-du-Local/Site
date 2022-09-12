/**
 * Permet de slugifier une chaine de caractères
 * @param {string} toSlugify la chaine dont on veut le slug
 * @return {string} le slug de la chaine
 */
export default function slugify(toSlugify: string) {
	toSlugify = toSlugify.replace(/^\s+|\s+$/g, ''); // trim
	toSlugify = toSlugify.toLowerCase();

	// remove accents, swap ñ for n, etc
	const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
	const to = 'aaaaeeeeiiiioooouuuunc------';

	for (let i=0, l=from.length; i<l; i++) {
		toSlugify = toSlugify.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	toSlugify = toSlugify.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return toSlugify;
}
