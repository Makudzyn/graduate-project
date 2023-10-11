import { NavLink } from "react-router-dom";
import { publicRoutes } from "../../../routes.ts";
import {observer} from "mobx-react-lite";

const NavPages = observer(({
  classNames,
  currentPage,
}: {
  classNames: (...classes: string[]) => string;
  currentPage: string;
}) => {

  return (
    <div className="hidden sm:ml-6 sm:block">
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
                "rounded-md px-3 py-2 text-sm font-medium",
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
