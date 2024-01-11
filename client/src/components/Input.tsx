import { ChangeEvent, useEffect, useState } from "react";
import { SetURLSearchParams, useLocation } from "react-router-dom";
import { classNames, getSelectedParam } from "../functions/functions.ts";

interface InputProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  urlParamName: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  disabled: boolean;
  valueRestriction?: number;
  lengthRestriction?: number;
}

const Input = ({
  inputLabel,
  inputPlaceholder,
  searchParams,
  setSearchParams,
  urlParamName,
  disabled,
  valueRestriction,
  lengthRestriction,
}: InputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [charCount, setCharCount] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const paramValue = getSelectedParam(urlParamName, searchParams);

    if (paramValue !== null) {
      setInputValue(paramValue);
      setCharCount(paramValue.length);
    }
  }, [location.search]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let targetValue = e.target.value;

    if (lengthRestriction) {
      targetValue = targetValue.replace(/[^01]/g, "");
    }

    if (valueRestriction && Number(targetValue) > valueRestriction) {
      targetValue = "";
    }

    if (targetValue !== "") {

      setSearchParams(
        (prevSearchParams: URLSearchParams) => {
          prevSearchParams.set(urlParamName, targetValue);
          return prevSearchParams;
        },
        { replace: true },
      );
    }

    setInputValue(targetValue);
    setCharCount(targetValue.length);
  }

  return (
    <div className="pt-2 pb-5">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {inputLabel}
      </label>
      <input
        className={classNames(
          charCount < lengthRestriction!
            ? "focus:ring-red-500"
            : "focus:ring-green-500",
          "mt-2 block w-full truncate rounded-md bg-white px-[1.75em] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6",
        )}
        placeholder={inputPlaceholder}
        onChange={handleChange}
        value={inputValue}
        required
        disabled={disabled}
        title={"Please enter only 0 or 1"}
        maxLength={lengthRestriction}
      />
    </div>
  );
};

export default Input;
