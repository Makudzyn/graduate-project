import {useContext} from "react";
import {Context} from "../main.tsx";
import {
    ADMIN_PANEL_ROUTE,
    LINEAR_GEN_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MATRIX_GEN_ROUTE,
    POLYNOMIALS_ROUTE, SUM_AND_MULTI_GEN_ROUTE, UNTITLED_ROUTE
} from "../utils/consts.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import userIco from "../assets/user-login.svg";
import bigDataIco from "../assets/big-data.svg";
import burgerMenuIco from "../assets/burger-menu.svg";

const NavBar = observer(() => {
    const {userStore} = useContext(Context)!;
    const navigate = useNavigate();

    const logOut = () => {
        userStore.setUser({});
        userStore.setIsAuth(false);
    }

    return (
        <header className="antialiased">
           <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
               <div className="flex flex-wrap justify-between items-center">
                   <div className="flex justify-start items-center">
                       <NavLink
                           className="flex mr-4"
                           to={MAIN_ROUTE}
                       >
                           <img src={bigDataIco} className="mr-3 h-6 sm:h-9" alt="Logo" />
                           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Graduate Project</span>
                       </NavLink>
                   </div>
                   <div className="flex items-center lg:order-2">
                       {userStore.isAuth ?
                           <nav className="ml-auto">
                               <div>
                                   <svg width={38} height={38} viewBox="0 0 38 38">
                                       <image
                                           xlinkHref={'#'}
                                           width="38"
                                           height="38"
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
                               </div>
                           </nav>
                           :
                           <nav className="ml-auto">
                               <svg width={38} height={38} viewBox="0 0 38 38">
                                   <image
                                       xlinkHref={userIco}
                                       width="38"
                                       height="38"
                                       onClick={() => navigate(LOGIN_ROUTE)}
                                       cursor={"pointer"}
                                   />
                               </svg>
                           </nav>
                       }
                       <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                           <span className="sr-only">Open main menu</span>
                           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                               <image xlinkHref={burgerMenuIco} cursor="pointer" className="w-5 h-5"/>
                           </svg>
                       </button>
                   </div>
                   <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                           <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"> {/*li*5>NavLink[to={}]{Page $}*/}
                               <li>
                                   <NavLink
                                       className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page"
                                       to={MAIN_ROUTE}
                                   >
                                       Main
                                   </NavLink>
                               </li>
                               <li>
                                   <NavLink
                                       className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                       to={LINEAR_GEN_ROUTE}>Page 1</NavLink>
                               </li>
                               <li>
                                   <NavLink
                                       className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                       to={MATRIX_GEN_ROUTE}>Page 2</NavLink>
                               </li>
                               <li>
                                   <NavLink
                                       className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                       to={SUM_AND_MULTI_GEN_ROUTE}>Page 3</NavLink>
                               </li>
                               <li>
                                   <NavLink
                                       className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                       to={UNTITLED_ROUTE}>Page 4</NavLink>
                               </li>
                           </ul>
                   </div>
               </div>
           </nav>
        </header>
    );
});

export default NavBar;