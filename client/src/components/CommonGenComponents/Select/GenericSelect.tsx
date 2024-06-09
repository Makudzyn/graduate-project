import { Field, Label, Listbox, ListboxButton } from "@headlessui/react";
import ChevronIcon from "../../../assets/svgs/chevron.svg?react";
import { getSelectedParam } from "../../../functions/functions.ts";
import { useEffect, useState } from "react";
import {
  BooleanSelect,
  Polynomial,
} from "../../../utils/interfacesAndTypes.ts";
import GenericOptionList from "./GenericOptionList.tsx";

interface GenericSelectProps<T> {
  searchParams: URLSearchParams;
  urlParamName: string;
  optionsArray: T[];
  handleChange: (value: T) => void;
  formatOptionValue?: (option: T) => string;
  shownPlaceholder?: string;
  selectLabel?: string;
}

function GenericSelect<T extends string | number | Polynomial | BooleanSelect>({
  searchParams,
  urlParamName,
  optionsArray,
  handleChange,
  formatOptionValue,
  shownPlaceholder,
  selectLabel,
}: GenericSelectProps<T>) {
  const [optionValue, setOptionValue] = useState<string>("");

  useEffect(() => {
    const paramValue = getSelectedParam(urlParamName, searchParams);
    if (paramValue !== null) {
      setOptionValue(paramValue);
    }
  }, [location.search]);

  const handleSelectChange = (value: string) => {
    if (typeof formatOptionValue === "function") {
      const formattedValue = formatOptionValue(value as T);
      setOptionValue(formattedValue);
    } else {
      setOptionValue(value);
    }
    handleChange(value as T);
  };

  return (
    <Listbox
      value={optionValue}
      onChange={handleSelectChange}
      as={"div"}
      className="pt-2 pb-5"
    >
      {({ open }) => (
        <Field>
          <Label className="block text-lg font-medium leading-6 text-gray-900">
            {selectLabel}
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white text-sm+ pr-10 pl-3 text-left text-paragraph shadow-md ring-1 ring-inset ring-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm+ sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate font-medium">
                  {optionValue === "" ? shownPlaceholder : optionValue}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronIcon
                    className={`h-5 w-5 stroke-paragraph transition ${
                      open && "rotate-180"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </span>
            </ListboxButton>
              <GenericOptionList
                options={optionsArray}
                formatFunction={formatOptionValue}
              />
          </div>
        </Field>
      )}
    </Listbox>
  );
}

export default GenericSelect;
