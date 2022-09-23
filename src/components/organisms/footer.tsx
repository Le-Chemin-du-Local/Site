import Link from 'next/link';

/**
 * Le footer du site
 * @return {JSX.Element} Le footer du site
 */
export default function Footer(): JSX.Element {
	return (
		<div className="bg-primary-color text-white flex flex-row w-full px-8 py-4">
			<div className='flex-grow'>
				<p>Copyright &copy; 2022 - Le Chemin du Local</p>
			</div>
			<div>
				<p>
					<Link href="/mentions-legales">Mentions légales</Link>
					&nbsp;|&nbsp;
					<Link href="/mentions-legales">Politique de confidentialitée</Link>
				</p>
			</div>
		</div>
	);
}
