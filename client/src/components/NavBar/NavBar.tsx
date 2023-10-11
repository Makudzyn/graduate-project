import {observer} from "mobx-react-lite";
import {Disclosure} from "@headlessui/react";
import TitleBrand from "./TitleBrand.tsx";
import NavPages from "./NavPages/NavPages.tsx";
import UserProfileMini from "./UserProfileMini.tsx";
import NavPagesBurger from "./NavPages/NavPagesBurger.tsx";
import burgerMenuIco from "../../assets/burger-menu.svg";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = observer(() => {
  const currentPage = location.pathname; // Узнаем на какой странице пользователь - регистрации или входа

    return (
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>

                    {open ? (
                      <svg className="block w-6 h-6 sm:w-7 sm:h-7 bg-gray-800" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <image xlinkHref={burgerMenuIco} cursor="pointer" className="block w-6 h-6 sm:w-7 sm:h-7 accent-white"/>
                      </svg>
                    ) : (
                      <svg className="block w-6 h-6 sm:w-7 sm:h-7 bg-gray-800" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <image xlinkHref={burgerMenuIco} cursor="pointer" className="block w-6 h-6 sm:w-7 sm:h-7 accent-white"/>
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <TitleBrand/>
                  <NavPages classNames={classNames} currentPage={currentPage}/>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <UserProfileMini classNames={classNames}/>
                </div>
              </div>
            </div>

            <NavPagesBurger classNames={classNames} currentPage={currentPage}/>
          </>
        )}
      </Disclosure>
    );
});

export default NavBar;