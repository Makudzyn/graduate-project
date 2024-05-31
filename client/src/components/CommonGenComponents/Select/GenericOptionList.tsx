import { Listbox } from "@headlessui/react";
import SelectIcon from "../../../assets/svg/select.svg?react";
import {
  BooleanSelect,
  Polynomial,
} from "../../../utils/interfacesAndTypes.ts";
import "../scrollbar.css";

interface OptionListProps<T> {
  options: T[];
  formatFunction?: (value: T) => string;
}

function GenOptionList<T extends string | number | Polynomial | BooleanSelect>({
  options,
  formatFunction,
}: OptionListProps<T>) {

  const handleOptionFormatting = (option: T) => {
    return typeof formatFunction === "function"
      ? formatFunction(option)
      : (option as string);
  };


  return (
    <Listbox.Options className="absolute scrollbar z-10 max-h-64 w-full overflow-auto rounded-md bg-white text-sm+ py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-base">
      {options.map((option, index) => (
        <Listbox.Option
          key={index}
          value={option}
          className={({ active }) =>
            `${active ? "bg-purpleFirst text-white" : "text-gray-900"}
              relative cursor-default rounded-sm select-none py-2 pl-3 pr-9`
          }
        >
          {({ active, selected }) => (
            <>
              <div className="flex items-center">
                <span
                  className={`${
                    selected ? "font-bold" : "font-normal"
                  } ml-3 block truncate`}
                >
                  {handleOptionFormatting(option)}
                </span>
              </div>
              {selected && (
                <span
                  className={`${active ? "text-gray-50" : "text-purpleFirst"}
                    absolute inset-y-0 right-0 flex items-center pr-4`}
                >
                  <SelectIcon
                    className="h-5 w-5 fill-green-300 hover:stroke-gray-900"
                    aria-hidden="true"
                  />
                </span>
              )}
            </>
          )}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  );
}

export default GenOptionList;
