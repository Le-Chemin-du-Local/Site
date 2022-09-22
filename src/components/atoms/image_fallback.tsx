import Image from 'next/image';
import {useEffect, useState} from 'react';

interface ImageFallbackProps {
	src: string
	fallbackSrc: string
	alt: string
	className?: string
	layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	objectFit?: any
}

/**
 * Image avec une image de remplacement si elle ne charge pas
 * @param {ImageFallbackProps} options Les informations des images
 * @return {JSX.Element} L'image ou son fallback
 */
export default function ImageFallback(options: ImageFallbackProps) {
	const {src, fallbackSrc, alt, className, layout, objectFit} = options;
	const [imageSrc, setImageSrc] = useState(src);

	useEffect(() => {
		setImageSrc(src);
	}, [src]);

	return (
		<Image
			src={imageSrc}
			className={className}
			onLoadingComplete={(result) => {
				if (result.naturalWidth === 0) {
					// Dans ce cas, l'image est cassé
					setImageSrc(fallbackSrc);
				}
			}}
			onError={() => {
				setImageSrc(fallbackSrc);
			}}
			alt={alt}
			layout={layout}
			objectFit={objectFit}
		/>
	);
}
