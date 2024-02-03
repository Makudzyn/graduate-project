import { Listbox, Transition } from "@headlessui/react";
import ChevronUpIcon from "../../../assets/chevron-up.svg?react";
import ChevronDownIcon from "../../../assets/chevron-down.svg?react";
import TableOptionList from "../../Table/Select/TableOptionList.tsx";
import { Dispatch, SetStateAction } from "react";

interface TableSelectProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  labelStart: string;
  labelEnd: string;
  optionsArray: number[];
}

const TableSelect = ({
  value,
  setValue,
  labelStart,
  labelEnd,
  optionsArray,
}: TableSelectProps) => {
  return (
    <Listbox
      value={value}
      onChange={setValue}
      as={"div"}
      className="top-0 left-0 flex items-center justify-between w-52"
      aria-controls={"polynomials"}
    >
      {({ open }) => (
        <Listbox.Label className="flex flex-row justify-between items-center w-full text-sm leading-6 text-gray-900">
          <span>{labelStart}</span>
          <div className="relative">
            <Listbox.Button className="relative w-24 cursor-pointer rounded-md bg-white pr-10 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="mx-1 block truncate">{value}</span>
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
              <TableOptionList options={optionsArray} />
            </Transition>
          </div>
          <span>{labelEnd}</span>
        </Listbox.Label>
      )}
    </Listbox>
  );
};

export default TableSelect;
