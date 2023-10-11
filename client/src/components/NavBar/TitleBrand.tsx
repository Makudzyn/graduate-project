import { NavLink } from "react-router-dom";
import { MAIN_ROUTE } from "../../utils/consts.ts";
import bigDataIco from "../../assets/big-data.svg";

const TitleBrand = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <NavLink className="flex mr-4" to={MAIN_ROUTE}>
        <img src={bigDataIco} className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap text-white">
          Graduate Project
        </span>
      </NavLink>
    </div>
  );
};

export default TitleBrand;
