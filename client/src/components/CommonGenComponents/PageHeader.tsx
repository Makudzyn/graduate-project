interface MainHeaderProps {
   title: string;
   paragraph?: string;
}

const PageHeader = ({ title, paragraph }: MainHeaderProps) => {
 return (
   <div className="flex flex-col items-center">
     <div className="flex shrink-0 flex-col items-center text-left pb-[3.75rem]">
       <div className="flex flex-col items-center text-center text-primary">
         <h1 className="font-libreFranklin font-extrabold text-6xl">
           {title}
         </h1>
         <p className="max-w-3xl font-normal text-paragraph text-xl mt-2.5">
           {paragraph}
         </p>
       </div>
     </div>
   </div>
 );
};

export default PageHeader;
