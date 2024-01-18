import { Dispatch, SetStateAction } from "react";

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const FormInput = ({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  setValue,
}: FormInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900 font-poppins dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default FormInput;
