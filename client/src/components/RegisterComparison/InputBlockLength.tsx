import { ChangeEvent, useEffect, useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { getSelectedParam } from '../../functions/functions.ts';

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
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const paramValue = getSelectedParam(urlParamName, searchParams);

    if (paramValue !== null) {
      setInputValue(paramValue);
    }
  }, [location.search]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let targetValue = e.target.value.replace(/[^0-9]/g, '');

    if (valueRestriction && Number(targetValue) > valueRestriction) {
      targetValue = '';
    }

    if (targetValue !== '') {
      setSearchParams(
        (prevSearchParams: URLSearchParams) => {
          prevSearchParams.set(urlParamName, targetValue);
          return prevSearchParams;
        },
        { replace: true },
      );
    }

    setInputValue(targetValue);
  }

  return (
    <div className="pt-2 pb-5 font-medium leading-6 text-gray-900">
      <label htmlFor="hamming-block" className="block h-6 text-lg">
        {inputLabel}
      </label>
      <input
        id="hamming-block"
        className={
          'mt-2 block w-full truncate rounded-md bg-white text-base px-10 py-2.5 text-left shadow-lg ring-1 ring-inset ring-gray-300  focus:outline-none focus:ring-2'
        }
        placeholder={inputPlaceholder}
        onChange={handleChange}
        value={inputValue}
        required
        title={
          'Введіть значення, яке не перевищує найменший період згенерованих послідовностей'
        }
      />
    </div>
  );
};

export default InputBlockLength;
