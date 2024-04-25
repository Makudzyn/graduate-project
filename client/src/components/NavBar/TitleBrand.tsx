import { NavLink } from "react-router-dom";
import { MAIN_ROUTE } from "../../utils/consts.ts";
import BigDataIcon from "../../assets/big-data.svg?react";

const TitleBrand = () => {
  return (
    <div className="flex flex-shrink-0 items-center md:ml-3">
      <NavLink className="flex md:mr-0 lg:mr-4" to={MAIN_ROUTE}>
        <BigDataIcon className="mr-3 md:mr-0 lg:mr-3.5 w-9 h-9" />
        <span className="self-center sm:text-2xl md:hidden  lg:text-xl lg:block font-semibold whitespace-nowrap text-white">
          Graduate Project
        </span>
      </NavLink>
    </div>
  );
};

export default TitleBrand;
