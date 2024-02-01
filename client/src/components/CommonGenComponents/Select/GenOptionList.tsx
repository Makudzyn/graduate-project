import { Listbox } from "@headlessui/react";
import { classNames, formatOption } from "../../../functions/functions.ts";
import SelectIcon from "../../../assets/select.svg?react";
import { BooleanSelect, Polynomial } from "../../../utils/interfacesAndTypes.ts";

interface OptionListProps {
  options: (string | number | Polynomial | BooleanSelect)[];
}

function getOptionKey(option: Polynomial | BooleanSelect | string | number) {
  if (typeof option === "object") {
    if ("id" in option) {
      return option.id;
    } else if ("booleanLabel" in option) {
      return option.booleanLabel
    }
  } else return option;
}

const GenOptionList = ({ options }: OptionListProps) => {
  return (
    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {options.map((option) => (
        <Listbox.Option
          key={getOptionKey(option)}
          value={option}
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
                  {formatOption(option)}
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

export default GenOptionList;
