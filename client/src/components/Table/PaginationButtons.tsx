import { Dispatch, SetStateAction } from "react";

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
    const maxButtonsToShow = 5; // Максимальное количество кнопок, отображаемых одновременно

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
                ? "border-[#0000004C] bg-gradient-to-b"
                : "border-transparent bg-indigo-500 text-white"
            } box-border inline-block rounded border bg-indigo-500 px-4 py-2 text-center no-underline min-w-[1.5em] ml-0.5`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>,
        );
      } else if (buttons[buttons.length - 1] !== "...") {
        buttons.push("...");
      }
    }

    return buttons;
  };

  return (
    <div className="text-right pt-[0.25em]" id="paginate">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        tabIndex={0}
        id="previous"
        aria-controls="polynomials"
        className="box-border inline-block cursor-pointer rounded border border-transparent bg-gray-300 px-4 py-2 text-center no-underline min-w-[1.5em] ml-0.5"
      >
        Previous
      </button>
      {generateButtons()}
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="box-border inline-block cursor-pointer rounded border border-transparent bg-indigo-500 px-4 py-2 text-center text-white no-underline min-w-[1.5em] ml-0.5"
        tabIndex={0}
        aria-controls="polynomials"
        id="next"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
