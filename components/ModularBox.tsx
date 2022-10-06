import React, { ReactNode } from 'react';

const ModularBox: React.FC<{
  children: ReactNode | ReactNode[];
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-md p-4 h-28 w-28 ${className}`}>
      {children}
    </div>
  );
};

export default ModularBox;
