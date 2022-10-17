import React, { HTMLAttributes, ReactNode } from 'react';

const ModularBox: React.FC<
  React.PropsWithChildren<{
    className?: string;
  }> &
    HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...otherProps }) => {
  return (
    <div
      className={`rounded-lg shadow-md p-4 h-[10rem] w-[10rem] ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default ModularBox;
