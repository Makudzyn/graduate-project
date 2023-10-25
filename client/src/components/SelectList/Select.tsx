import { Listbox, Transition } from "@headlessui/react";
import ChevronUpIcon from "../../assets/chevron-up.svg?react";
import ChevronDownIcon from "../../assets/chevron-down.svg?react";
import OptionList from "./OptionList.tsx";
import { Polynomial } from "../../store/PolynomialsStore.ts";
import {SetURLSearchParams, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

interface SelectProps {
  setSelectedOption: SetURLSearchParams;
  urlParamName: string;
  selectLabel?: string;
  optionsArray: (string | number | Polynomial)[];
}

const Select = ({
  setSelectedOption,
  urlParamName,
  selectLabel,
  optionsArray,
}: SelectProps) => {
  const [optionValue, setOptionValue] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramValue = params.get(urlParamName);

    if (paramValue !== null) {
      setOptionValue(paramValue);
    }
  }, [location.search]);
  function handleChange(targetValue: string) {
    const params = new URLSearchParams(location.search);
    params.set(urlParamName, targetValue);

    setSelectedOption(
      (prev: any) => {
        prev.set(urlParamName, targetValue);
        return prev;
      },
      { replace: true },
    );
    setOptionValue(targetValue);
  }
  return (
    <Listbox
      value={optionValue}
      onChange={handleChange}
      as={"div"}
      className="pt-2 pb-5"
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {selectLabel}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white pr-10 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{optionValue}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  {open ? (
                    <ChevronUpIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              leave="transition ease duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <OptionList options={optionsArray} />
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
