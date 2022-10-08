import React, { ReactNode } from 'react';

const ModularBox: React.FC<{
  children: ReactNode | ReactNode[];
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={`rounded-lg shadow-md p-4 h-[10rem] w-[10rem] ${className}`}
    >
      {children}
    </div>
  );
};

export default ModularBox;
