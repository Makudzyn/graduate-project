import { observer } from "mobx-react-lite";
import { Disclosure } from "@headlessui/react";
import TitleBrand from "./TitleBrand.tsx";
import NavPages from "./NavPages/NavPages.tsx";
import NavPagesBurger from "./NavPages/NavPagesBurger.tsx";
import NavIcons from "./NavIcons.tsx";
import BurgerMenuIcon from "../../assets/burger-menu.svg?react";
import CloseMenuIcon from "../../assets/close.svg?react";
import { useEffect, useState } from "react";

const NavBar = observer(() => {
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.search]);

  const [currentPage, setCurrentPage] = useState(location.pathname);

  return (
    <Disclosure as="nav" className="fixed bg-gray-900 w-full z-20 shadow-md shadow-purpleFirst">
      {({ open }) => (
        <>
          <div className="relative mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>

                  {open ? (
                    <CloseMenuIcon className="block w-6 h-6 fill-gray-300" />
                  ) : (
                    <BurgerMenuIcon className="block w-6 h-6 stroke-gray-300" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <TitleBrand />
                <NavPages currentPage={currentPage} />
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NavIcons />
              </div>
            </div>
          </div>

          <NavPagesBurger currentPage={currentPage} />
        </>
      )}
    </Disclosure>
  );
});

export default NavBar;
