interface StatusMessageProps {
	type?: 'error' | 'info' | 'success';
	message: string;
}

/**
 * Un message à afficher
 * @param {StatusMessageProps} options Les options du message
 * @return {JSX.Element} Le mesage
 */
export default function StatusMessage(options: StatusMessageProps) {
	const {type, message} = options;

	let style = 'bg-error-container border border-error';

	switch (type) {
	case 'info':
		style = 'bg-information-container text-white';
		break;
	case 'success':
		style = 'bg-success-container border border-success';
		break;
	default:
		break;
	}

	return (
		<div className={'px-4 py-2 w-full rounded-xl ' + style}>
			{message}
		</div>
	);
}
