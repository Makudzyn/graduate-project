import {observer} from "mobx-react-lite";
import TitleBrand from "./TitleBrand.tsx";
import NavIcons from "./NavIcons.tsx";
import NavPages from "./NavPages.tsx";



const NavBar = observer(() => {
    return (
        <header className="antialiased">
           <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
               <div className="flex flex-wrap justify-between items-center">
                   <TitleBrand/>
                   <NavIcons/>
                   <NavPages/>
               </div>
           </nav>
        </header>
    );
});

export default NavBar;