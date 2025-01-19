import { observer } from 'mobx-react-lite';
import { Disclosure } from '@headlessui/react';
import TitleBrand from './TitleBrand.tsx';
import NavPages from './NavPages/NavPages.tsx';
import NavPagesBurger from './NavPages/NavPagesBurger.tsx';
import NavIcons from './NavIcons.tsx';
import MobileMenu from './MobileMenu.tsx';
import { useLocation } from 'react-router-dom';

const NavBar = observer(() => {
  const location = useLocation();

  return (
    <Disclosure
      as="nav"
      className="fixed bg-gray-900 w-full z-50 shadow-md shadow-purpleFirst"
    >
      {({ open }) => (
        <>
          <div className="relative mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">
            <div className="flex h-22 items-center justify-between xl:16">
              <div className="flex items-center md:hidden">
                <MobileMenu open={open} />
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <TitleBrand />
                <NavPages currentPage={location.pathname} />
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NavIcons />
              </div>
            </div>
          </div>

          <NavPagesBurger currentPage={location.pathname} />
        </>
      )}
    </Disclosure>
  );
});

export default NavBar;
