import { ChangeEvent, useEffect, useState } from "react";
import { SetURLSearchParams, useLocation } from "react-router-dom";

interface InputProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  urlParamName: string;
  setValue: SetURLSearchParams;
  disabled: boolean;
}

const Input = ({
  inputLabel,
  inputPlaceholder,
  setValue,
  urlParamName,
  disabled,
}: InputProps) => {

  const [inputValue, setInputValue] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramValue = params.get(urlParamName);

    if (paramValue !== null) {
      setInputValue(paramValue);
    }
  }, [location.search]);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const targetValue = e.target.value;
    const params = new URLSearchParams(location.search);
    params.set(urlParamName, targetValue);

    setValue(
      (prev: any) => {
        prev.set(urlParamName, targetValue);
        return prev;
      },
      { replace: true },
    );
    setInputValue(targetValue);
  }

  return (
    <div className="pt-2 pb-5">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {inputLabel}
      </label>
      <input
        className="block w-full truncate rounded-md bg-white px-3 py-1.5 mt-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        placeholder={inputPlaceholder}
        onChange={handleChange}
        value={inputValue}
        required
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
