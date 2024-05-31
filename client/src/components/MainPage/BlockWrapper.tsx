import { ReactNode } from "react";

interface BlockWrapperProps {
  children?: ReactNode;
}

const BlockWrapper = ({ children }: BlockWrapperProps) => {
 return (
  <div className="mx-0 my-auto box-border w-full py-0 px-4 sm:px-7 max-w-screen-xl">
    {children}
  </div>
 );
};

export default BlockWrapper;
