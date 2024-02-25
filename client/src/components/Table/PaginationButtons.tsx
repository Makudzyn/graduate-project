import { Dispatch, SetStateAction } from "react";
import ChevronIcon from "../../assets/chevron.svg?react";
interface PaginationButtonsProps {
  totalCount: number;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PaginationButtons = ({
  totalCount,
  limit,
  page,
  setPage,
}: PaginationButtonsProps) => {
  const totalPages = Math.ceil(totalCount / limit);

  const generateButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 3; // Максимальное количество кнопок, отображаемых одновременно

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - Math.floor(maxButtonsToShow / 2) &&
          i <= page + Math.floor(maxButtonsToShow / 2))
      ) {
        buttons.push(
          <button
            key={i}
            tabIndex={0}
            aria-controls="polynomials"
            className={`${
              i === page
                ? "bg-purpleFirst text-white bg-gradient-to-b"
                : "bg-transparent hover:bg-purpleSecond hover:text-white"
            } box-border inline-block border border-transparent px-4 py-2 text-center ml-0.5 w-12 rounded transition`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        );
      } else if (buttons[buttons.length - 1] !== " ... ") {
        buttons.push(" ... ");
      }
    }

    return buttons;
  };

  return (
    <div className="flex justify-between items-center text-right pt-[0.25em] max-w-[28rem]" id="paginate">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        tabIndex={0}
        id="previous"
        aria-controls="polynomials"
        className="box-border inline-block cursor-pointer w-[3.625rem] h-10 px-4 py-2 rounded-md border border-gray-150 shadow-lg mr-2.5 disabled:bg-gray-300 disabled:cursor-auto enabled:hover:border-purpleSecond enabled:hover:ring-1 enabled:hover:text-white transition"
      >
        <ChevronIcon className={"h-6 w-6 rotate-90 stroke-purpleFirst"} />
      </button>
      <div>{generateButtons()}</div>
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="box-border inline-block cursor-pointer w-[3.625rem] h-10 px-4 py-2 rounded-md border border-gray-150 shadow-lg ml-2.5 disabled:bg-gray-300 disabled:cursor-auto enabled:hover:border-purpleSecond enabled:hover:ring-1 enabled:hover:text-white transition"
        tabIndex={0}
        aria-controls="polynomials"
        id="next"
      >
          <ChevronIcon className={"h-6 w-6 -rotate-90 stroke-purpleFirst"} />
      </button>
    </div>
  );
};

export default PaginationButtons;
