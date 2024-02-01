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
        className="mb-2 block text-sm font-semibold text-gray-50 font-poppins"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="block w-full rounded-lg border border-gray-600 bg-gray-700 text-white p-2.5 placeholder-gray-400 focus:border-purpleSecond focus:ring-purpleSecond sm:text-sm"
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default FormInput;
