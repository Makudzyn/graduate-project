import { Field, Label, Listbox, ListboxButton } from "@headlessui/react";
import ChevronIcon from "../../../assets/svgs/chevron.svg?react";
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
      aria-controls={"polynomials"}
    >
      {({ open }) => (
        <Field as={"div"} className="top-0 left-0 flex items-center justify-between w-44">
          <Label className="w-full text-base font-medium leading-6 text-gray-900 pr-2">
            {labelStart}
          </Label>
          <div className="relative">
            <ListboxButton className="relative w-[4.75rem] cursor-pointer rounded-md bg-white pr-10 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="block truncate text-sm+ font-medium">{value}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronIcon
                    className={`h-5 w-5 stroke-paragraph transition ${
                      open && "rotate-180"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </span>
            </ListboxButton>
            <TableOptionList options={optionsArray} />
          </div>
          <Label className="w-full text-base font-medium leading-6 text-gray-900 text-right pl-2">
            {labelEnd}
          </Label>
        </Field>
      )}
    </Listbox>
  );
};

export default TableSelect;
