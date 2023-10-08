import {NavLink} from "react-router-dom";
import {
    LINEAR_GEN_ROUTE,
    MAIN_ROUTE,
    MATRIX_GEN_ROUTE,
    SUM_AND_MULTI_GEN_ROUTE,
    UNTITLED_ROUTE
} from "../../utils/consts.ts";

const NavPages = () => {
    const navigation = [
        { name: 'Main', href: MAIN_ROUTE},
        { name: 'Linear-feedback shift register', href: LINEAR_GEN_ROUTE},
        { name: 'Matrix register', href: MATRIX_GEN_ROUTE},
        { name: 'Sum and multiplication register', href: SUM_AND_MULTI_GEN_ROUTE},
        { name: 'Untitled', href: UNTITLED_ROUTE},
    ]
    const currentPage = location.pathname; // Узнаем на какой странице пользователь - регистрации или входа

    return (
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-semibold lg:flex-row lg:space-x-8 lg:mt-0">
                {navigation.map((item => (
                    <li key={item.name}>
                        <NavLink
                            to={item.href}
                            aria-current={currentPage === item.href ? "page" : undefined}
                            className={
                                currentPage === item.href
                                    ?
                                    "block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                    :
                                    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                            }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                )))
                }
            </ul>
        </div>
    );
};

export default NavPages;