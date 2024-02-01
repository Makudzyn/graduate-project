import SpinnerIcon from "../assets/spinner.svg?react";

const Spinner = () => {
 return (
   <div className="absolute w-full h-full flex items-center justify-center">
     <SpinnerIcon fill="#FFCD60" className="w-16 h-16 mr-2 animate-spin" />
     <span className="sr-only" color="#FFCD60">
            Loading...
          </span>
   </div>
 );
};

export default Spinner;