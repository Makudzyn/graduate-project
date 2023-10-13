import { LOGIN_ROUTE } from "../../utils/consts.ts";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main.tsx";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import UserProfileMini from "./UserProfileMini.tsx";
import GuestIcon from "../../assets/guest.svg?react";

const NavIcons = observer(
  ({ classNames }: { classNames: (...classes: string[]) => string }) => {
    const { userStore } = useContext(Context)!;
    const navigate = useNavigate();

    return (
      <div className="flex items-center lg:order-2">
        {userStore.isAuth ? (
          <UserProfileMini classNames={classNames} />
        ) : (
          <GuestIcon
            className="w-8 h-8 sm:w-9 sm:h-9 cursor-pointer fill-gray-50 stroke-gray-900 hover:fill-gray-800 hover:stroke-white"
            onClick={() => navigate(LOGIN_ROUTE)}
          />
        )}
      </div>
    );
  },
);

export default NavIcons;
