import { ReactNode } from 'react';

interface PageWrapperProps {
  children?: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center">
      {children}
    </div>
  );
};

export default PageWrapper;
