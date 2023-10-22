import { Listbox } from "@headlessui/react";
import classNames from "../../functions/functions.ts";
import SelectIcon from "../../assets/select.svg?react"
import {FC} from "react";
import {Polynomial} from "../../store/PolynomialsStore.ts";

interface OptionListProps {
  options: Polynomial[] | string[];
}
function getOptionKey(option: Polynomial | string) {
  if (typeof option === "object" && "id" in option) {
      return option.id;
  } else return option;
}

function getOptionValue(option: Polynomial | string) {
  if (typeof option === "object" && "polynomial" in option) {
    return option.polynomial;
  } else return option;
}

function getOptionLabel(option: Polynomial | string) {
  if (typeof option === "object" && "name" in option) {
    return option.name;
  } else return option;
}

const OptionList: FC<OptionListProps> = ({ options }) => {
  return (
    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {options.map((option) => (
        <Listbox.Option
          key={getOptionKey(option)}
          value={getOptionValue(option)}
          className={({ active }) =>
            classNames(
              active ? "bg-indigo-600 text-white" : "text-gray-900",
              "relative cursor-default select-none py-2 pl-3 pr-9",
            )
          }
        >
          {({ active, selected }) => (
            <>
              <div className="flex items-center">
                <span
                  className={classNames(
                    selected ? "font-bold" : "font-normal",
                    "ml-3 block truncate",
                  )}
                >
                  {getOptionLabel(option)}
                </span>
              </div>
              {selected ? (
                <span
                  className={classNames(
                    active ? "text-white" : "text-indigo-600",
                    "absolute inset-y-0 right-0 flex items-center pr-4",
                  )}
                >
                  <SelectIcon
                    className="h-5 w-5 fill-green-300 hover:stroke-gray-900"
                    aria-hidden="true"
                  />
                </span>
              ) : null}
            </>
          )}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  );
};

export default OptionList;