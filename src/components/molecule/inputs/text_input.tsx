import {FocusEventHandler} from 'react';

interface TextInputProps {
	inputName: string;
	inputType?: string;
	placeholder?: string;
	label?: string;
	isRequired?: boolean;
	inputState?: string | number | readonly string[];
	// inputSetState: Dispatch<SetStateAction<string | number | readonly string[] | undefined>>;
	onFocus?: FocusEventHandler<HTMLInputElement>
}

/**
 * Un champs de text
 * @param {TextInputProps} options Les paramètres du champs de text
 * @return {JSX.Element} Un champs de texte
 */
export default function TextInput(options: TextInputProps) {
	const {inputName, inputType, placeholder, label, isRequired, inputState, onFocus} = options;

	return (
		<div className='flex flex-col my-2 w-full'>
			{label &&
				<label className='text-dark-grey' htmlFor={inputName}>{label}</label>}
			<input
				id={inputName}
				name={inputName}
				onFocus={onFocus}
				type={inputType}
				placeholder={placeholder}
				value={inputState}
				required={isRequired}
				className='border border-gray-300 border-solid outline-none p-2 rounded-lg w-full'
			/>
		</div>
	);
}
