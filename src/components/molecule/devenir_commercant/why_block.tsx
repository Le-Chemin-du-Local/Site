interface WhyBlockProps {
	title: string
	content: string
}

/**
 * Un block de pourquoi devenir commerçant
 * @param {WhyBlockProps} options Les informations sur le block
 * @return {JSX.Element} Un block de pourquoi devenir commerçant
 */
export default function WhyBlock(options: WhyBlockProps): JSX.Element {
	const {title, content} = options;

	return (
		<div className='flex'>
			<div className='w-2 bg-primary-color rounded-full' />
			<div className='w-full flex flex-col ml-3 py-1'>
				<h3 className='text-xl font-bold'>{title}</h3>
				<p>{content}</p>
			</div>
		</div>
	);
}
