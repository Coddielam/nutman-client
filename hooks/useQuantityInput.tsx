import { InputValueDefinitionNode } from 'graphql';
import React, { RefObject, useRef, InputHTMLAttributes, useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

const QuantityInput: React.FC<
  { quantity: number; setQuantity: (quantity: number) => void } & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'className'
  >
> = ({ quantity, setQuantity, ...inputProps }) => {
  const handleAddMinsuOne = (type: 'ADD' | 'MINUS') => {
    if (type === 'ADD') {
      setQuantity(quantity + 1);
    }
    if (type === 'MINUS') {
      if (quantity === 0) return;
      setQuantity(quantity - 1);
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
        type="text"
        inputMode="numeric"
        className="w-8 h-8 mx-2 shadow-sm border border-[lightgray] text-center"
        value={quantity.toString()}
        readOnly
        {...inputProps}
      />
      <AiFillPlusCircle
        role="button"
        onClick={() => handleAddMinsuOne('ADD')}
        className="w-5 h-5 shadow-sm rounded-full"
      />
    </div>
  );
};

export const useQuantityInput = ({ defaultValue = 0 }) => {
  const [quantity, setQuantity] = useState(defaultValue);

  return {
    quantity,
    QuantityInput: () => (
      <QuantityInput quantity={quantity} setQuantity={setQuantity} />
    ),
  };
};
