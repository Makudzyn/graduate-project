import { Dispatch, SetStateAction } from "react";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const Search = ({
  searchQuery,
  setSearchQuery,
}: SearchProps) => {
  return (
    <div className="top-0 right-0 flex items-center justify-between w-[19.85rem]">
      <label className="relative mt-1 py-2 pl-3">
        Search:
      </label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-controls="polynomials"
        placeholder="Find polynomial..."
        className="relative w-full cursor-default overflow-hidden rounded-lg border-none bg-white py-2 pr-10 pl-3 text-left text-sm leading-5 text-gray-900 shadow-md focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      />
    </div>
  );
};

export default Search;
