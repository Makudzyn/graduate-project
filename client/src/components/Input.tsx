
interface InputProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  disabled: boolean;
}
const Input = ({ inputLabel, inputPlaceholder , disabled} : InputProps) => {
  return (
    <div className="pt-2 pb-5">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {inputLabel}
      </label>
      <input
        className="block w-full truncate rounded-md bg-white px-3 py-1.5 mt-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        placeholder={inputPlaceholder}
        required
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
