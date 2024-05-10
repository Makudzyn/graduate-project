import BigDataIcon from "../../assets/svg/big-data.svg?react";

const Footer = () => {
  return (
    <footer className="w-full text-center bg-gray-900 text-gray-300 py-7">
      <div className="container mx-auto">
        <div className="flex justify-center items-center font-medium text-sm sm:text-base lg:text-lg">
          <BigDataIcon className="w-7 h-7 mx-3 sm:w-8 sm:h-8"/>
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

          <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center fixed right-4 bottom-16">
            <span className="icon-arrow-up"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
