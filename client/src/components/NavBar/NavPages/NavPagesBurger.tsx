import { NavLink } from "react-router-dom";
import { publicRoutes } from "../../../routes.ts";
import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { classNames } from "../../../functions/functions.ts";

const NavPagesBurger = ({ currentPage }: { currentPage: string }) => {
  return (
    <DisclosurePanel className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {publicRoutes.map((item) => (
          <DisclosureButton
            key={item.name}
            className={classNames(
              currentPage === item.path
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium",
            )}
            aria-current={currentPage === item.path ? "page" : undefined}
          >
            <NavLink to={item.path}>{item.name}</NavLink>
          </DisclosureButton>
        ))}
      </div>
    </DisclosurePanel>
  );
};

export default NavPagesBurger;
