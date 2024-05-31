import { ReactNode } from "react";

interface Header5Props {
   children?: ReactNode;
  align?: "left" | "center" | "right";
}

const Header5 = ({ children, align }: Header5Props) => {
 return (
   <h5 className={`${align ? `text-${align}` : "text-center"} w-full my-1 font-medium text-lg`}>{children}</h5>
 );
};

export default Header5;
