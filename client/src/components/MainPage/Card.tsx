import { ReactNode } from "react";

interface CardProps {
  iconComponent: ReactNode;
  title: string;
  description: string;
}

const Card = ({ iconComponent, title, description }: CardProps) => {
  return (
    <div className="flex items-center p-6 mb-10 box-border text-center w-[calc(33.333%-2em)]  flex-col text-secondary bg-bgSecondary shadow-lg border-0 rounded-lg">
      <div className="flex items-center">{iconComponent}</div>
      <h3 className="text-white mt-0 text-xl font-medium mb-3">{title}</h3>
      <div className="text-sm+">{description}</div>
    </div>
  );
};

export default Card;
