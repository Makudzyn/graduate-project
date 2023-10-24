import {ReactNode} from "react";

interface OutputFieldProps {
  children?: ReactNode;
}
const OutputField = ({children} : OutputFieldProps) => {
  return (
    <div
      className="p-5 h-64 w-[400px] overflow-y-auto overflow-x-hidden rounded-sm border border-gray-900 focus:border-t-gray-900"
    >
      {children}
    </div>
  );
};

export default OutputField;