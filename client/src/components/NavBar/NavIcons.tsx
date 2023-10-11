import {LOGIN_ROUTE} from "../../utils/consts.ts";
import userIco from "../../assets/user-login.svg";
import burgerMenuIco from "../../assets/burger-menu.svg";
import {useNavigate} from "react-router-dom";
import {Context} from "../../main.tsx";
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import UserProfileMini from "./UserProfileMini.tsx";

const NavIcons = observer(() => {
    const {userStore} = useContext(Context)!;
    const navigate = useNavigate();


    return (
        <div className="flex items-center lg:order-2">
          {userStore.isAuth ?
            <UserProfileMini/>
            :
            <nav>
              <svg className={"w-8 h-8 sm:w-9 sm:h-9"} viewBox="0 0 36 36">
                <image
                  className={"w-8 h-8 sm:w-9 sm:h-9"}
                  xlinkHref={userIco}
                  onClick={() => navigate(LOGIN_ROUTE)}
                  cursor={"pointer"}
                />
              </svg>
            </nav>
          }

            <button
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open main menu</span>
                <svg className="w-8 h-8 sm:w-9 sm:h-9" fill="currentColor" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <image xlinkHref={burgerMenuIco} cursor="pointer" className="w-8 h-8 sm:w-9 sm:h-9"/>
                </svg>
            </button>

        </div>
    );
});

export default NavIcons;