import { useState } from "react";
import Chevron from "../../assets/chevron.svg?react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

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
            Your polynomial history
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
              overflow-hidden transition-all ${isOpen ? "w-[33rem] mx-3" : "w-0"}
          `}
          >
            <div className="flex flex-row px-3 justify-between leading-4 border border-gray-50 w-full h-14 rounded-md">
              <div className="flex flex-row items-center text-sm text-gray-50 ">
                <h5 className="">Degree:</h5>
                <span className="pl-1">3</span>
              </div>
              <div className="flex flex-row items-center text-sm text-gray-50 ">
                <h5 className="">Polynomial:</h5>
                <span className="pl-1">1 21 F</span>
              </div>
              <div className="flex flex-row items-center text-sm text-gray-50 ">
                <h5 className="">Initial value:</h5>
                <span className="pl-1">1011</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
