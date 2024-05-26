import { ChangeEvent, useEffect, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { getSelectedParam } from "../../functions/functions.ts";

interface InputBinaryProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  urlParamName: string;
  inputLabel: string;
  inputPlaceholder: string;
  lengthRestriction: number;
}

const InputBinary = ({
  searchParams,
  setSearchParams,
  urlParamName,
  inputLabel,
  inputPlaceholder,
  lengthRestriction,
}: InputBinaryProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const paramValue = getSelectedParam(urlParamName, searchParams);

    if (paramValue !== null) {
      setInputValue(paramValue);
      setCharCount(paramValue.length);
    }
  }, [location.search]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const targetValue = e.target.value.replace(/[^01]/g, "");
    const charsCount = targetValue.length;
    if (targetValue !== "") {
      setSearchParams(
        (prevSearchParams: URLSearchParams) => {
          prevSearchParams.set(urlParamName, targetValue);
          return prevSearchParams;
        },
        { replace: true },
      );
    }

    setCharCount(charsCount);
    setInputValue(targetValue);
    setColor(charsCount === lengthRestriction ? `green` : `red`);
  }

  return (
    <div className="pt-2 pb-5 font-medium text-gray-900 leading-6">
      <label
        htmlFor="binary-input"
        className="block h-6 text-lg"
      >
        {inputLabel}
      </label>
      <div className="relative">
        <input
          id="binary-input"
          className={`${color === "red" ? "focus:ring-red-500" : "focus:ring-green-500"}
          mt-2 block w-full truncate rounded-md bg-white text-sm+ px-[1.75em] text-left shadow-lg ring-1 ring-inset ring-gray-300 py-2 focus:outline-none focus:ring-2 `}
          placeholder={inputPlaceholder}
          onChange={handleChange}
          value={inputValue}
          required
          title={"Інпут приймає тільки бінарні значення (0 та 1)"}
          maxLength={lengthRestriction}
        />
        <span className={`${color === "red" ? "text-red-500" : "text-green-500"} absolute select-none flex justify-center items-center right-0 top-0 bottom-0 px-[1.75em] text-xs font-semibold opacity-50`}>
          {charCount}/{lengthRestriction}
        </span>
      </div>
    </div>
  );
};

export default InputBinary;
