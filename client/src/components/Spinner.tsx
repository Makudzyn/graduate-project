import SpinnerIcon from "../assets/spinner.svg?react";

const Spinner = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50" aria-busy="true">
        <SpinnerIcon fill="#FFCD60" className="w-16 h-16 mr-2 animate-spin" />
        <span className="sr-only" color="#FFCD60">
        Loading...
      </span>
      </div>
      <div className="fixed inset-0 z-40 bg-gray-800 opacity-20 blur-md"></div>
    </>
  );
};

export default Spinner;
