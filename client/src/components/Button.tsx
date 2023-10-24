interface ButtonProps {
  children: string;
}
const Button = ({ children }: ButtonProps) => {
  return (
    <button className="px-5 py-2.5 border-gray-900 border relative rounded group overflow-hidden font-medium bg-indigo-50 text-indigo-500 inline-block">
      <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-indigo-500 group-hover:h-full opacity-90"></span>
      <span className="relative group-hover:text-white">{children}</span>
    </button>
  );
};

export default Button;
