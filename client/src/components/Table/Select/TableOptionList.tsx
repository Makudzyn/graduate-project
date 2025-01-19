import { ListboxOption, ListboxOptions } from '@headlessui/react';
import { classNames } from '../../../functions/functions.ts';

interface TableOptionListProps {
  options: number[];
}

const TableOptionList = ({ options }: TableOptionListProps) => {
  return (
    <ListboxOptions className="absolute z-10 py-1 px-2 appearance-none bg-transparent text-indigo-500 border border-[#aaa] rounded w-[5rem] overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {options.map((option) => (
        <ListboxOption
          key={option}
          value={option}
          className={({ focus }) =>
            classNames(
              focus ? 'bg-indigo-600 text-white' : 'text-gray-900',
              'relative cursor-default select-none py-2 px-3 rounded',
            )
          }
        >
          {({ focus, selected }) => (
            <>
              <div className="flex items-center">
                <span
                  className={classNames(
                    selected ? 'font-bold' : 'font-normal',
                    'mx-1 block truncate',
                  )}
                >
                  {option}
                </span>
              </div>
              {selected && (
                <span
                  className={classNames(
                    focus ? 'text-white' : 'text-indigo-600',
                    'absolute inset-y-0 right-0 flex items-center pr-4',
                  )}
                ></span>
              )}
            </>
          )}
        </ListboxOption>
      ))}
    </ListboxOptions>
  );
};

export default TableOptionList;
