import {ReactNode} from 'react';
import Footer from './footer';
import Header from './header';

interface LayoutProps{
	children: ReactNode;
	title: string;
}

/**
 * La structure de base d'une page
 * @param {LayoutProps} options Les propritétés de la structure
 * @return {JSX.Element} Un layout
 */
export default function Layout(options : LayoutProps): JSX.Element {
	const {children, title} = options;

	return (
		<>
			<Header title={title}/>
			<main className="flex flex-col items-center grow w-full mt-16">
				{children}
			</main>
			<Footer/>
		</>
	);
}
