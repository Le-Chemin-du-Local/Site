import Image from 'next/image';
import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from 'react';
import {AccueilSVG, ClickAndCollectSVG, RechercheCommercesSVG} from '../../assets/icons';
import ElevatedButton from '../atoms/buttons/elevated_button';
import MenuButton from '../molecule/menu_button';

interface AsideProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Le menu du côté
 * @param {AsideProps} options les options du menu du côté
 * @return {JSX.Element} le menu du côté
 */
export default function Aside(options: AsideProps) {
	const {isOpen, setOpen} = options;
	const [style, setStyle] = useState([
		'-translate-x-full',
		'bg-[rgba(0,0,0,0)]',
	]);

	// eslint-disable-next-line require-jsdoc
	function useOutsideAlerter(ref: MutableRefObject<HTMLElement | null>) {
		useEffect(() => {
			// eslint-disable-next-line require-jsdoc
			function handleClickOutside(event: MouseEvent) {
				const target = event.target as HTMLElement;
				if (ref.current && !ref.current.contains(target)) {
					setStyle(['-translate-x-full', 'bg-[rgba(0,0,0,0)]']);
					setTimeout(() => {
						setOpen(!isOpen);
					}, 100);
				}
			}

			document.addEventListener('mousedown', handleClickOutside);

			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [ref]);
	}

	useEffect(() => {
		setStyle(['translate-x-0', 'bg-[rgba(0,0,0,.2)]']);
	}, []);


	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	return (
		<>
			<div
				className={
					'fixed transition duration-200 top-0 left-0 right-0 bottom-0 pointer-events-none z-0 ' +
					style[1]
				}
			/>
			<aside
				ref={wrapperRef}
				className={
					'bg-white transition duration-75 ease-linear fixed top-0 left-0 bottom-0 w-80 z-10 ' +
					style[0]
				}
			>
				<div className='flex flex-col justify-center mx-8 my-6'>
					<div className='mx-5'>
						<div className='relative flex justify-center'>
							<Image src="/logo.png" alt="Le logo du Chemin du Local" height={77} width={173} />
						</div>
						<div className='h-5' />
						<ElevatedButton
							label='Tous les commercers'
							color='secondary'
							href='/commerces/1'
							icon={<RechercheCommercesSVG/>}
						/>
					</div>
					<div className='h-8' />

					<MenuButton
						icon={<AccueilSVG/>}
						label="Accueil"
						href="/" />

					<MenuButton
						icon={<ClickAndCollectSVG/>}
						label="Mon Panier"
						href='/basket' />
				</div>
			</aside>
		</>
	);
}
