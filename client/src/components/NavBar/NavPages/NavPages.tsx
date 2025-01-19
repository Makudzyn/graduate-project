import { NavLink } from 'react-router-dom';
import { publicRoutes } from '../../../routes.ts';
import { observer } from 'mobx-react-lite';
import { classNames } from '../../../functions/functions.ts';

interface NavPageProps {
  currentPage: string;
}

const NavPages = observer(({ currentPage }: NavPageProps) => {
  return (
    <div className="hidden md:ml-5 md:flex md:items-center md:justify-center md:w-full">
      <ul className="flex justify-evenly space-x-3.5 md:w-full">
        {publicRoutes.map((item) => (
          <li key={item.name} className={'flex justify-center items-center'}>
            <NavLink
              to={item.path}
              aria-current={currentPage === item.path ? 'page' : undefined}
              className={classNames(
                currentPage === item.path
                  ? 'bg-gray-900 text-white border-b-purpleFirst'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white border-b-transparent',
                'border-b-2 sm:px-1.5 sm:py-1 md:px-3 md:py-2 lg:px-3.5 lg:py-2.5 md:text-md lg:text-lg font-medium text-center',
              )}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default NavPages;
