interface ButtonProps {
  onClick: () => void;
  children: string;
}

const GenButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-block text-lg font-medium w-full rounded-lg bg-gray-900 max-w-[28rem] px-10 py-3 text-gray-50 transition-all duration-200 ease-spline hover:bg-purpleFirst hover:border-purpleSecond focus:outline-purpleFirst focus:transition-100 focus:border-0 focus:outline focus:outline-2 focus:outline-offset-4"
    >
      {children}
    </button>
  );
};

export default GenButton;
