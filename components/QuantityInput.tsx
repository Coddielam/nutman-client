import React, { RefObject } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

const QuantityInput: React.FC<{ inputRef: RefObject<HTMLInputElement> }> = ({
  inputRef,
}) => {
  const handleAddMinsuOne = (type: 'ADD' | 'MINUS') => {
    if (!inputRef.current) return;
    if (type === 'ADD') {
      inputRef.current.value = (Number(inputRef.current.value) + 1).toString();
    }
    if (type === 'MINUS') {
      if (Number(inputRef.current.value) === 0) return;
      inputRef.current.value = (Number(inputRef.current.value) - 1).toString();
    }
  };

  return (
    <div className="flex items-center w-full py-2">
      <AiFillMinusCircle
        role="button"
        onClick={() => handleAddMinsuOne('MINUS')}
        className="w-5 h-5 shadow-sm rounded-full"
      />
      <input
        ref={inputRef}
        type="text"
        defaultValue="0"
        inputMode="numeric"
        className="w-8 h-8 mx-2 shadow-sm border border-[lightgray] text-center"
      />
      <AiFillPlusCircle
        role="button"
        onClick={() => handleAddMinsuOne('ADD')}
        className="w-5 h-5 shadow-sm rounded-full"
      />
    </div>
  );
};

export default QuantityInput;
