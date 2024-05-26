import BigDataIcon from "../../assets/svg/big-data.svg?react";
import ToTopIcon from "../../assets/svg/top.svg?react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [toTopButtonVisibility, setToTopButtonVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3) {
        setToTopButtonVisibility(true);
      } else {
        setToTopButtonVisibility(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full text-center bg-gray-900 text-gray-300 py-7">
      <div className="container mx-auto">
        <div className="flex justify-center items-center font-medium text-sm sm:text-base lg:text-lg">
          <BigDataIcon className="w-7 h-7 mx-3 sm:w-8 sm:h-8" />
          <div className="flex flex-col justify-center items-center sm:justify-evenly md:flex-row">
            <div className="flex gap-x-1.5 mx-1">
              <p>© 2024 Graduate Project.</p>
              <p>All rights reserved.</p>
            </div>
            <div className="flex gap-x-1.5 mx-1">
              <p>Created by</p>
              <p className="text-purpleFirst uppercase">Maksym Kunchenko</p>
            </div>
          </div>

          <div
            className={
              `bg-purpleFirst cursor-pointer rounded-full w-10 h-10 flex items-center justify-center 
               fixed right-5 bottom-10 transition-all duration-200 ease-in
               hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:bg-indigo-700
              ${toTopButtonVisibility ? "visible opacity-100" : "invisible opacity-0"}`
            }
            onClick={scrollToTop}
          >
            <ToTopIcon className="w-6 h-6 fill-gray-50" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
