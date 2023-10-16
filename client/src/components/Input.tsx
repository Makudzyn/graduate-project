import { FC } from "react";

interface InputProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  disabled: boolean;
}
const Input: FC<InputProps> = ({ inputLabel, inputPlaceholder , disabled}) => {
  return (
    <div className="pb-5 pt-2">
      <label className="mb-2 block text-sm font-medium text-gray-900">
        {inputLabel}
      </label>
      <input
        className="block w-full rounded-md bg-white pr-10 pl-3 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        placeholder={inputPlaceholder}
        required
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
