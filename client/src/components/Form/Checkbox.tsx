interface CheckboxProps {
  id: string;
  label: string;
}

const Checkbox = ({ id, label }: CheckboxProps) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          aria-describedby="remember"
          type="checkbox"
          className="w-4 h-4 border accent-purpleSecond focus:ring-3 focus:ring-primary-300"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="text-gray-500 dark:text-gray-300">
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
