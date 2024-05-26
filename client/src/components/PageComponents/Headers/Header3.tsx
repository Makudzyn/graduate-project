import { ReactNode } from "react";

interface Header3Props {
   children?: ReactNode;
   align?: "left" | "center" | "right";
}

const Header3 = ({ children, align }: Header3Props) => {
 return (
   <h3 className={`${align ? `text-${align}` : "text-center"} my-1.5 text-lg font-medium`}>{children}</h3>
 );
};

export default Header3;
