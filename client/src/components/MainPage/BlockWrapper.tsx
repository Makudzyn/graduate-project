import { ReactNode } from "react";

interface BlockWrapperProps {
  children?: ReactNode;
}

const BlockWrapper = ({ children }: BlockWrapperProps) => {
 return (
  <div className="mx-0 my-auto box-border w-full py-0 px-[1.875rem] max-w-[1140px]">
    {children}
  </div>
 );
};

export default BlockWrapper;
