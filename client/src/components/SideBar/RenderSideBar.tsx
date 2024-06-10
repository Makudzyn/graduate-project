import UserStore from "../../store/UserStore.ts";
import { Dispatch, ReactNode, SetStateAction } from "react";
import useHistoryFetching from "../../hooks/fetching/useHistoryFetching.ts";

interface RenderSideBarProps {
  userStore: UserStore;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  children: ReactNode;
}

const RenderSideBar = ({ userStore, setLoading, setError, children }: RenderSideBarProps) => {
  useHistoryFetching(userStore, setLoading, setError);
  if (!userStore.isAuth) {
    return null;
  }

  return <>{children}</>;
};

export default RenderSideBar;
