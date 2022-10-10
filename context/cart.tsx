import { IPopularProduct } from '@services/productServices';
import React, { Dispatch, ReactNode, useReducer } from 'react';

type ICartState = { title: string; price: number; imgUrl: string }[];

interface ICartAction {
  type: 'ADD_TO_CART' | 'UPDATE_ITEM_QUANTITY';
  payload: {
    product: { title: string; price: number; imgUrl: string };
    quantity: number;
  };
}

const defaultState: ICartState = [];

const cartReducer = (state: ICartState, action: ICartAction) => {
  const {
    type,
    payload: { product, quantity },
  } = action;
  if (type === 'ADD_TO_CART') {
    return [...state, ...Array(quantity).fill(product)];
  }

  if (type === 'UPDATE_ITEM_QUANTITY') {
    return [
      ...state.filter((item) => item.title !== product.title),
      ...Array(quantity).fill(product),
    ];
  }

  return state;
};

export const CartContext = React.createContext<{
  cartState: ICartState;
  dispatchCartState: Dispatch<ICartAction>;
} | null>(null);

const CartContextWrapper = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultState);

  return (
    <CartContext.Provider
      value={{
        cartState,
        dispatchCartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextWrapper;
