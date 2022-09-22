/**
 * Converti la valeur unit en une unité lisible
 * @param {string} unit string
 * @return {string} libellé de l'unité
 */
export default function getUnitLabel(unit?: string) {
	switch (unit) {
	case 'unit':
		return 'pièce';
	case 'gramme':
		return 'gramme';
	case 'pack':
		return 'Pack';
	default:
		return '';
	}
}
