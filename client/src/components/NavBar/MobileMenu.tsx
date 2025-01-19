import { DisclosureButton } from '@headlessui/react';
import BurgerMenuIcon from '../../assets/svgs/burger-menu.svg?react';
import CloseMenuIcon from '../../assets/svgs/close.svg?react';

interface MobileMenuProps {
  open: boolean;
}

const MobileMenu = ({ open }: MobileMenuProps) => {
  return (
    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
      <span className="absolute -inset-0.5" />
      <span className="sr-only">Open main menu</span>

      {open ? (
        <CloseMenuIcon className="block w-6 h-6 fill-gray-300" />
      ) : (
        <BurgerMenuIcon className="block w-6 h-6 stroke-gray-300" />
      )}
    </DisclosureButton>
  );
};

export default MobileMenu;
