import {useContext} from "react";
import {Context} from "../main.tsx";
import {ADMIN_PANEL_ROUTE, LOGIN_ROUTE, POLYNOMIALS_ROUTE} from "../utils/consts.ts";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {userStore} = useContext(Context)!;
    const navigate = useNavigate();

    const logOut = () => {
        userStore.setUser({});
        userStore.setIsAuth(false);
    }

    return (
        <div className={"bg-black"}>
           <div>
               <nav className={"text-white"}>Graduate Project</nav>
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
                       <div onClick={() => navigate(LOGIN_ROUTE)}>Sign in</div>
                   </nav>
               }
           </div>
        </div>
    );
});

export default NavBar;