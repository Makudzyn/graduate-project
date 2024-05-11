interface MainHeaderProps {
   title: string;
   paragraph?: string;
   paragraphWidth?: string;
}

const PageHeader = ({ title, paragraph, paragraphWidth }: MainHeaderProps) => {
 return (
   <div className="flex flex-col items-center">
     <div className="flex shrink-0 flex-col items-center text-left pb-14">
       <div className="flex flex-col items-center text-center text-primary">
         <h1 className="font-libreFranklin font-extrabold text-4xl sm:text-6xl">
           {title}
         </h1>
         <p
           className={
             `max-w-screen-${paragraphWidth} font-normal text-paragraph text-base sm:text-xl mt-2.5`
           }
         >
           {paragraph}
         </p>
       </div>
     </div>
   </div>
 );
};

export default PageHeader;
