import { ChangeEvent, useEffect, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { getSelectedParam } from "../../functions/functions.ts";

interface InputBlockLengthProps {
  inputLabel: string;
  inputPlaceholder: string;
  urlParamName: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  valueRestriction: number;
}

const InputBlockLength = ({
                       inputLabel,
                       inputPlaceholder,
                       searchParams,
                       setSearchParams,
                       urlParamName,
                       valueRestriction,
                     }: InputBlockLengthProps) => {
  const [inputValue, setInputValue] = useState("");
  const [charCount, setCharCount] = useState(0);


  useEffect(() => {
    const paramValue = getSelectedParam(urlParamName, searchParams);

    if (paramValue !== null) {
      setInputValue(paramValue);
      setCharCount(paramValue.length);
    }
  }, [location.search]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let targetValue = e.target.value;


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
        className={
          "mt-2 block w-full truncate rounded-md bg-white px-[1.75em] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6"
        }
        placeholder={inputPlaceholder}
        onChange={handleChange}
        value={inputValue}
        required
        title={"Please enter only 0 or 1"}
      />
    </div>
  );
};

export default InputBlockLength;
