import { SetURLSearchParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { getSelectedParam } from '../../functions/functions.ts';

interface DecompositionInputProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  urlParamName: string;
  inputLabel: string;
  inputPlaceholder: string;
  degreeRestriction: number;
}

const DecompositionInput = ({
  searchParams,
  setSearchParams,
  urlParamName,
  inputLabel,
  inputPlaceholder,
  degreeRestriction,
}: DecompositionInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    const paramValue = getSelectedParam(urlParamName, searchParams);

    if (paramValue !== null) {
      setInputValue(paramValue);
    }
  }, [location.search]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const sanitizedValue = e.target.value.replace(/[^1-9-]/g, '');
    const numbers = sanitizedValue.split('-').map(Number).filter(Boolean);
    const validDecomposition =
      numbers.reduce((acc, num) => acc + num, 0) === degreeRestriction;

    if (sanitizedValue !== '' && validDecomposition) {
      setSearchParams(
        (prevSearchParams: URLSearchParams) => {
          prevSearchParams.set(urlParamName, sanitizedValue);
          return prevSearchParams;
        },
        { replace: true },
      );
    }

    setInputValue(sanitizedValue);
    setColor(validDecomposition ? `green` : `red`);
  }

  return (
    <div className="pt-2 pb-5 font-medium text-gray-900 leading-6">
      <label htmlFor="decomposition-input" className="block h-6 text-lg">
        {inputLabel}
      </label>
      <div className="relative">
        <input
          id="decomposition-input"
          className={`${
            color === 'red' ? 'focus:ring-red-500' : 'focus:ring-green-500'
          }
          mt-2 block w-full truncate rounded-md bg-white text-sm+ px-[1.75em] text-left shadow-lg ring-1 ring-inset ring-gray-300 py-2 focus:outline-none focus:ring-2 `}
          placeholder={inputPlaceholder}
          onChange={handleChange}
          value={inputValue}
          required
          title={'Розбийте поліном на менші ступені у форматі (n-m-...-k)'}
        />
      </div>
    </div>
  );
};

export default DecompositionInput;
