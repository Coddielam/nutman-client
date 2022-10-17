import React, { InputHTMLAttributes } from 'react';

export default React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function StyledInput({ className, ...otherProps }, ref) {
  return (
    <input
      ref={ref}
      className="border-[1px] border-platinum rounded-md shadow-sm p-2 max-w-full"
      {...otherProps}
    />
  );
});
