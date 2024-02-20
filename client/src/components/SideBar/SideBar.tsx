import { useState } from "react";
import Chevron from "../../assets/chevron.svg?react";
import DeleteRecord from "../../assets/delete-clipboard.svg?react";
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
    <aside className="h-screen fixed pt-16 z-40 transition">
      <div
        className={`h-full flex flex-col shadow-sm transition-all duration-1000 ${
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

        <div className="flex p-3 h-full">
          <div
            className={`
              flex
              overflow-hidden transition-all ${
                isOpen ? "w-[33rem] mx-3" : "w-0"
              }
          `}
          >
            <div className="flex flex-col w-full">
              {filteredData.map((data) => (
                <Transition
                  as="button"
                  show={true}
                  className="relative flex px-3 items-center leading-4 border border-gray-50 w-full min-h-[2.5rem] max-h-28 mb-3 rounded-md transition hover:border-purpleFirst"
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
                    <h5 className="text-start w-[26rem] leading-7 py-2.5">
                      {formatParameter(data.parameters)}
                    </h5>
                    <span className="absolute top-1.5 right-3.5 text-xs text-rose-600">
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
                        <DeleteRecord className="stroke-gray-50 w-6 h-6" />
                      )}
                    </div>
                  </div>
                </Transition>
              ))}
            </div>
          </div>
        </div>
        <button
          className={`bg-purpleFirst px-2 py-3 rounded-t-md text-gray-50 transition hover:bg-rose-700 ${
            isOpen ? "w-full" : "hidden"
          }`}
          onClick={() => handleHistoryRecordsListDeletion(userId, currentPage, setFilteredData)}
        >
          Delete all records
        </button>
      </div>
    </aside>
  );
});
export default SideBar;
