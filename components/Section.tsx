import React, { Children, HTMLAttributes, ReactNode } from 'react';
import Typography from '@components/Typography';

interface ISectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  containerAttr?: HTMLAttributes<HTMLDivElement>;
}
const Section: React.FC<ISectionProps> = ({
  title,
  children,
  className,
  containerAttr,
}) => {
  return (
    <section className={`py-6 ${className}`}>
      <div className="mb-4">
        <Typography variant="Subtitle">{title}</Typography>
      </div>
      <div {...containerAttr}>{children}</div>
    </section>
  );
};

export default Section;
