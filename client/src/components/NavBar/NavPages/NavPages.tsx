import { NavLink } from "react-router-dom";
import { publicRoutes } from "../../../routes.ts";
import { observer } from "mobx-react-lite";
import { classNames } from "../../../functions/functions.ts";

const NavPages = observer(({ currentPage }: { currentPage: string }) => {
  return (
    <div className="hidden sm:ml-5 sm:flex sm:items-center">
      <ul className="flex space-x-4">
        {publicRoutes.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              aria-current={currentPage === item.path ? "page" : undefined}
              className={classNames(
                currentPage === item.path
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-2 text-md font-medium",
              )}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default NavPages;
