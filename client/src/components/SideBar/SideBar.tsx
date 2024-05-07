import { useState } from "react";
import Chevron from "../../assets/svg/chevron.svg?react";
import DeleteRecord from "../../assets/svg/delete-clipboard.svg?react";
import { observer } from "mobx-react-lite";
import { HistoryRecord } from "../../utils/interfacesAndTypes.ts";
import { useSearchParams } from "react-router-dom";
import { formatDateTime, formatParameter } from "../../functions/functions.ts";
import {
  handleHistoryRecordDeletion,
  handleHistoryRecordsListDeletion,
} from "../../functions/requestFunctions/requestFunctions.ts";
import { Transition } from "@headlessui/react";

interface SideBarProps {
  userId: number;
  dataArray: HistoryRecord[];
}

const SideBar = observer(({ dataArray, userId }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredButtonId, setHoveredButtonId] = useState<number>(-1);
  const [, setSearchParams] = useSearchParams("");

  const currentPage = location.pathname;
  const [filteredData, setFilteredData] = useState<HistoryRecord[]>(
    dataArray
      .slice()
      .reverse()
      .filter((data) => data.pageName === currentPage),
  );

  return (
    <aside className="fixed z-40 h-full pt-16 transition">
      <div
        className={`flex flex-col justify-between h-full shadow-sm transition-all duration-1000 ${
          isOpen ? "bg-gray-800" : "bg-transparent"
        }`}
      >
        <div
          className={`flex flex-row justify-between  ${
            isOpen ? "p-4 pb-2" : ""
          }`}
        >
          <h2
            className={`overflow-hidden transition text-purpleFirst pl-3 items-center duration-1000 flex font-bold ${
              isOpen ? "w-full" : "hidden"
            }`}
          >
            Polynomial history
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1.5 bg-gray-50 hover:bg-gray-100 transition duration-1000 ${
              isOpen
                ? "rounded-lg"
                : "absolute left-0 top-32 h-20 rounded-r-lg border border-purpleSecond"
            }`}
          >
            {isOpen ? (
              <Chevron className={"w-7 h-7 rotate-90 stroke-purpleFirst"} />
            ) : (
              <Chevron className={"w-7 h-7 -rotate-90 stroke-purpleFirst"} />
            )}
          </button>
        </div>

        <div
          className={`
              flex items-start overflow-y-auto scroll-smooth transition-all ${
                isOpen ? "w-[35rem] h-full mx-4 my-3" : "w-0"
              }
          `}
        >
          <div className="flex w-full flex-col mr-1.5">
            {filteredData.map((data) => (
              <Transition
                as="button"
                show={true}
                className="relative mb-3 last:mb-0 flex w-full items-center rounded-md border border-gray-50 px-3 transition min-h-[2.85rem] hover:border-purpleFirst"
                onClick={() =>
                  setSearchParams(data.parameters, { replace: true })
                }
                key={data.id}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-1000"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-2.5"
              >
                <div className="text-sm text-gray-50">
                  <h5 className="text-start leading-7 w-[26rem] my-2.5">
                    {formatParameter(data.parameters)}
                  </h5>
                  <span className="absolute text-xs text-rose-600 top-1.5 right-3.5">
                    {formatDateTime(data.createdAt)}
                  </span>
                  <div
                    className={`absolute flex justify-center items-center rounded-r-md top-0 right-0 bg-purpleSecond w-2 h-full transition-all ${
                      hoveredButtonId === data.id ? "hover:w-7" : ""
                    }`}
                    onMouseEnter={() => setHoveredButtonId(data.id)}
                    onMouseLeave={() => setHoveredButtonId(-1)}
                    onClick={() =>
                      handleHistoryRecordDeletion(
                        data.id,
                        filteredData,
                        setFilteredData,
                      )
                    }
                  >
                    {hoveredButtonId === data.id && (
                      <DeleteRecord className="h-6 w-6 stroke-gray-50" />
                    )}
                  </div>
                </div>
              </Transition>
            ))}
          </div>
        </div>

        <button
          className={`bg-purpleFirst px-2 py-4 rounded-t-md text-gray-50 transition hover:bg-rose-700 ${
            isOpen ? "w-full" : "hidden"
          }`}
          onClick={() =>
            handleHistoryRecordsListDeletion(
              userId,
              currentPage,
              setFilteredData,
            )
          }
        >
          Delete all records
        </button>
      </div>
    </aside>
  );
});
export default SideBar;
