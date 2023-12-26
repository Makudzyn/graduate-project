import { NavLink } from "react-router-dom";
import { MAIN_ROUTE } from "../../utils/consts.ts";
import BigDataIcon from "../../assets/big-data.svg?react";

const TitleBrand = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <NavLink className="flex mr-4" to={MAIN_ROUTE}>
        <BigDataIcon className="mr-3 w-9 h-9" />
        <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap text-white">
          Graduate Project
        </span>
      </NavLink>
    </div>
  );
};

export default TitleBrand;
