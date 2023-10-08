import {ADMIN_PANEL_ROUTE, LOGIN_ROUTE, POLYNOMIALS_ROUTE} from "../../utils/consts.ts";
import userIco from "../../assets/user-login.svg";
import burgerMenuIco from "../../assets/burger-menu.svg";
import {useNavigate} from "react-router-dom";
import {Context} from "../../main.tsx";
import {useContext} from "react";
import UserProfileMini from "./UserProfileMini.tsx";

const NavIcons = () => {
    const {userStore} = useContext(Context)!;
    const navigate = useNavigate();

    const logOut = () => {
        userStore.setUser({});
        userStore.setIsAuth(false);
    }

    return (
        <div className="flex items-center lg:order-2">
            {userStore.isAuth ?
                <nav>
                    <div>
                        <svg className={"w-8 h-8 sm:w-9 sm:h-9"} viewBox="0 0 36 36">
                            <image
                                xlinkHref={'#'}
                                className={"w-8 h-8 sm:w-9 sm:h-9"}
                                onClick={() => navigate(POLYNOMIALS_ROUTE)}
                                cursor={"pointer"}
                            />
                        </svg>
                        <div
                            onClick={() => navigate(ADMIN_PANEL_ROUTE)}
                        >
                            Admin panel
                        </div>
                        <div
                            onClick={() => logOut()}
                        >
                            Log out
                        </div>
                    <UserProfileMini/>
                    </div>
                </nav>
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
                data-collapse-toggle="mobile-menu-2"
                type="button"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
            >
                <span className="sr-only">Open main menu</span>
                <svg className="w-8 h-8 sm:w-9 sm:h-9" fill="currentColor" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <image xlinkHref={burgerMenuIco} cursor="pointer" className="w-8 h-8 sm:w-9 sm:h-9"/>
                </svg>
            </button>
        </div>
    );
};

export default NavIcons;