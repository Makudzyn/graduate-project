import { ReactNode } from 'react';

interface SectionBlockProps {
  children?: ReactNode;
}

const SectionBlock = ({ children }: SectionBlockProps) => {
  return <section className="relative pt-12 pb-12">{children}</section>;
};

export default SectionBlock;
