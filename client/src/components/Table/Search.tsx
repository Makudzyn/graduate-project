import { Dispatch, SetStateAction } from 'react';

interface SearchProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
  return (
    <div className="top-0 right-0 flex items-center justify-between w-[20rem]">
      <label className="py-2 px-3 text-base font-medium leading-6">
        Пошук:
      </label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-controls="polynomials"
        placeholder="Знайти поліном..."
        className="relative w-full cursor-default font-medium overflow-hidden shadow-lg rounded-md bg-white py-2.5 px-3 ring-1 ring-inset ring-gray-300 text-left text-sm+ leading-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purpleFirst"
      />
    </div>
  );
};

export default Search;
