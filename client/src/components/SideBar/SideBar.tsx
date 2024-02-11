import { useState } from "react";
import Chevron from "../../assets/chevron.svg?react";
import { observer } from "mobx-react-lite";
import { HistoryRecord } from "../../utils/interfacesAndTypes.ts";

interface SideBarProps {
  dataArray: HistoryRecord[];
}

const SideBar = observer(({ dataArray }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

    const filteredData = dataArray.map(data => ({
      ...data,
      parameters: data.parameters
        .slice(1)
        .replace(/\+/g, " ")
        .replace(/&/g, "; ")
        .replace(/=/g, ": ")
    }));


    return (
  <aside className="h-screen fixed pt-16 z-50">
    <div
      className={`h-full flex flex-col shadow-sm transition ${
        isOpen ? "bg-gray-800" : "bg-transparent"
      }`}
    >
      <div className="p-4 pb-2">
        <h2
          className={`overflow-hidden transition-all text-purpleFirst font-bold ${
            isOpen ? "w-full" : "w-0"
          }`}
        >
          {filteredData[0].pageName} history
        </h2>
      </div>

      <div className="flex p-3">
        <button
          onClick={toggleDrawer}
          className="absolute right-0 top-1/2 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          {isOpen ? (
            <Chevron className={"w-7 h-7 rotate-90 stroke-purpleFirst"} />
          ) : (
            <Chevron className={"w-7 h-7 -rotate-90 stroke-purpleFirst"} />
          )}
        </button>
        <div
          className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
            isOpen ? "w-[33rem] mx-3" : "w-0"
          }
          `}
        >
          <div className="flex flex-col">
            {filteredData.map((data) => (
              <div
                key={data.id}
                className="flex px-3 justify-between leading-4 border border-gray-50 w-full h-14 mb-3 rounded-md"
              >
                <div className="flex items-center text-sm text-gray-50">
                  <h5>{data.parameters}</h5>
                  {/*<span className="pl-1">{data.createdAt.toDateString()}</span>*/}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </aside>
);
})
;

export default SideBar;
