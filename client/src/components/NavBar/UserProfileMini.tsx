import { NavLink } from "react-router-dom";
import { ADMIN_PANEL_ROUTE, POLYNOMIALS_ROUTE } from "../../utils/consts.ts";
import { useContext } from "react";
import { Context } from "../../main.tsx";
import { observer } from "mobx-react-lite";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { classNames } from "../../functions/functions.ts";
import mockAvatarIcon from "../../assets/svgs/account-avatar.svg"

const userMenuNavigation = [
  { name: "Мій профіль", href: "#" },
  { name: "Налаштування акаунта", href: "#" },
  { name: "Таблиця поліномів", href: POLYNOMIALS_ROUTE },
  { name: "Адмін панель", href: ADMIN_PANEL_ROUTE },
];

const UserProfileMini = observer(() => {
  const { userStore } = useContext(Context)!;
  const logOut = () => {
    userStore.setUser({});
    userStore.setIsAuth(false);
  };

  return (
    <Menu as="div" className="relative ml-3">
      <MenuButton
        type="button"
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={mockAvatarIcon}
          alt="user photo"
        />
      </MenuButton>
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem as="div" className="py-3 px-4">
            <span className="block text-sm font-semibold text-gray-900">
              John Doe
            </span>
            {/*<span className="block text-sm text-gray-500 truncate dark:text-gray-400">*/}
            {/*  john.doe@company.com*/}
            {/*</span>*/}
          </MenuItem>

          {userMenuNavigation.map((item) => (
            <MenuItem key={item.name}>
              {({ focus }) => (
                <NavLink
                  to={item.href}
                  className={classNames(
                    focus ? "bg-gray-100" : "",
                    "block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white cursor-pointer",
                  )}
                >
                  {item.name}
                </NavLink>
              )}
            </MenuItem>
          ))}

          <MenuItem as="div">
            {({ focus }) => (
              <div
                onClick={() => logOut()}
                className={classNames(
                  focus ? "bg-gray-100" : "",
                  "block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer",
                )}
              >
                Вихід з облікового запису
              </div>
            )}
          </MenuItem>
        </MenuItems>

    </Menu>
  );
});

export default UserProfileMini;
