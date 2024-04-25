import { NavLink } from "react-router-dom";
import { publicRoutes } from "../../../routes.ts";
import { observer } from "mobx-react-lite";
import { classNames } from "../../../functions/functions.ts";

interface NavPageProps {
  currentPage: string
}

const NavPages = observer(({ currentPage }: NavPageProps) => {
  return (
    <div className="hidden md:ml-5 md:flex md:items-center">
      <ul className="flex space-x-3.5">
        {publicRoutes.map((item) => (
          <li key={item.name} className={"flex justify-center items-center"}>
            <NavLink
              to={item.path}
              aria-current={currentPage === item.path ? "page" : undefined}
              className={classNames(
                currentPage === item.path
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md sm:px-1.5 sm:py-1 px-3 py-2 text-md font-medium text-center",
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
