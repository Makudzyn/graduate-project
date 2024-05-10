import { ReactNode } from "react";

interface SectionBlockProps {
   children?: ReactNode;
}

const SectionBlock = ({ children }: SectionBlockProps) => {
 return (
   <section className="relative pt-[50px] pb-[50px]">
     {children}
   </section>
 );
};

export default SectionBlock;
