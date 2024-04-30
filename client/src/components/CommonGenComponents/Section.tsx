import { ReactNode } from "react";

interface SectionProps {
   children?: ReactNode;
}

const Section = ({ children }: SectionProps) => {
 return (
   <section className="flex h-full justify-center pt-24 px-5">
     {children}
   </section>
 );
};

export default Section;
