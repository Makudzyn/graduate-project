import { Dispatch, SetStateAction, useState } from "react";
import EyeOpened from "../../assets/svg/eye-opened.svg?react";
import EyeClosed from "../../assets/svg/eye-closed.svg?react";

interface FormPasswordProps {
  label: string;
  name: string;
  id: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const FormPassword = ({
  label,
  name,
  id,
  value,
  setValue,
}: FormPasswordProps) => {
  const eyeClasses =
    "absolute block stroke-gray-400 fill-none w-6 h-6 cursor-pointer right-3 top-1/2 transform -translate-y-1/2";
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-50 font-poppins"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={id}
          className="block w-full rounded-lg border border-gray-600 bg-gray-700 text-white p-2.5 placeholder-gray-400 focus:border-purpleSecond focus:ring-purpleSecond sm:text-sm"
          placeholder={"••••••••"}
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span
          onClick={togglePasswordVisibility}
          aria-labelledby={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeClosed className={eyeClasses} />
          ) : (
            <EyeOpened className={eyeClasses} />
          )}
        </span>
      </div>
    </div>
  );
};

export default FormPassword;
