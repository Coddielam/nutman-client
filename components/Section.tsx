import React, { Children, ReactNode } from 'react';
import Typography from '@components/Typography';

interface ISectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}
const Section: React.FC<ISectionProps> = ({ title, children, className }) => {
  return (
    <section className={`py-6 ${className}`}>
      <div className="mb-4">
        <Typography variant="Subtitle">{title}</Typography>
      </div>
      {children}
    </section>
  );
};

export default Section;
