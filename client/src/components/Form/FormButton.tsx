import { FormEvent } from 'react';

interface FormButtonProps {
  onClick: (e: FormEvent) => void;
  children: string;
}

const FormButton = ({ children, onClick }: FormButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-block w-full rounded-lg px-5 py-3 text-white transition-all duration-200 bg-purpleSecond ease-spline hover:bg-purpleFirst hover:bordbg-purpleFirst"
    >
      {children}
    </button>
  );
};

export default FormButton;
