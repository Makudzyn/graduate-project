import { NavLink } from "react-router-dom";
import { ADMIN_PANEL_ROUTE, POLYNOMIALS_ROUTE } from "../../utils/consts.ts";
import { Fragment, useContext } from "react";
import { Context } from "../../main.tsx";
import { observer } from "mobx-react-lite";
import { Menu, Transition } from "@headlessui/react";
import classNames from "../../functions/functions.ts";

const userMenuNavigation = [
  { name: "My profile", href: "#" },
  { name: "Account settings", href: "#" },
  { name: "Polynomials", href: POLYNOMIALS_ROUTE },
  { name: "Admin panel", href: ADMIN_PANEL_ROUTE },
];

const UserProfileMini = observer(() => {
  const { userStore } = useContext(Context)!;
  const logOut = () => {
    userStore.setUser({});
    userStore.setIsAuth(false);
  };

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button
        type="button"
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item as="div" className="py-3 px-4">
            <span className="block text-sm font-semibold text-gray-900 dark:text-white">
              Elis Lens
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              name@company.com
            </span>
          </Menu.Item>

          {userMenuNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <NavLink
                  to={item.href}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white cursor-pointer",
                  )}
                >
                  {item.name}
                </NavLink>
              )}
            </Menu.Item>
          ))}

          <Menu.Item as="div">
            {({ active }) => (
              <div
                onClick={() => logOut()}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer",
                )}
              >
                Sign out
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});

export default UserProfileMini;
