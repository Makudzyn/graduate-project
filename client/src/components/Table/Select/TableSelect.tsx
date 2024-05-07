import { Listbox, Transition } from "@headlessui/react";
import ChevronIcon from "../../../assets/svg/chevron.svg?react";
import TableOptionList from "../../Table/Select/TableOptionList.tsx";
import { Dispatch, SetStateAction } from "react";

interface TableSelectProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  labelStart: string;
  labelEnd: string;
  optionsArray: number[];
}

const TableSelect = ({
  value,
  setValue,
  setPage,
  labelStart,
  labelEnd,
  optionsArray,
}: TableSelectProps) => {
  function handleChange(targetValue: number) {
    setValue(targetValue);
    setPage(1);
  }

  return (
    <Listbox
      value={value}
      onChange={handleChange}
      as={"div"}
      className="top-0 left-0 flex items-center justify-between w-44"
      aria-controls={"polynomials"}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="w-full text-sm leading-6 text-gray-900 pr-2">
            {labelStart}
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-[4.75rem] cursor-pointer rounded-md bg-white pr-10 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="block truncate">{value}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronIcon
                    className={`h-5 w-5 stroke-gray-400 transition ${
                      open && "rotate-180"
                    }`}
                    aria-hidden="true"
                  />
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
          <Listbox.Label className="w-full text-sm leading-6 text-gray-900 text-right pl-2">
            {labelEnd}
          </Listbox.Label>
        </>
      )}
    </Listbox>
  );
};

export default TableSelect;
