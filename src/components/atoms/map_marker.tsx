/* eslint-disable @typescript-eslint/no-unused-vars */
interface MapMarkerProps {
	lat: number
	lng: number
}

/**
 * Un pointeur sur une carte
 * @param {MapMarkerProps} options les coordonnées du point
 * @return {JSX.Element} Le pointeur sur la carte
 */
export default function MapMarker(options: MapMarkerProps): JSX.Element {
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src="/images/map_pointer.png"
			alt="Un pointeur de carte"
			width={32}
			height={32} />
	);
}
