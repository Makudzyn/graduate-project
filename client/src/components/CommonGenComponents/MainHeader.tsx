interface MainHeaderProps {
   children: string;
}

const MainHeader = ({ children }: MainHeaderProps) => {
 return (
   <h1 className="py-5 text-center">
     {children}
   </h1>
 );
};

export default MainHeader;
