import { NavLink } from "react-router-dom";
import { publicRoutes } from "../../../routes.ts";
import { Disclosure } from "@headlessui/react";

const NavPagesBurger = ({
  classNames,
  currentPage,
}: {
  classNames: (...classes: string[]) => string;
  currentPage: string;
}) => {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {publicRoutes.map((item) => (
          <Disclosure.Button
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
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  );
};

export default NavPagesBurger;
