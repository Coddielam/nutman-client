import { queryAllProductCategoriesIdsNames } from '@root/utils/strapiQueries';
import React, {
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  ProductCategory,
  ProductCategoryEntity,
} from '@root/codegen/strapi/graphql';

export type ICartProduct = {
  id: string;
  product_name_cn: string;
  product_name_en: string;
  price: number;
  imgUrl: string;
};

type Unpromised<T> = T extends Promise<infer U> ? U : never;

type ICartState = ICartProduct[];

interface ICartAction {
  type: 'ADD_TO_CART' | 'UPDATE_ITEM_QUANTITY';
  payload: {
    product: ICartProduct;
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
      ...state.filter((item) => item.id !== product.id),
      ...Array(quantity).fill(product),
    ];
  }

  return state;
};

export const CartContext = React.createContext<{
  cartState: ICartState;
  dispatchCartState: Dispatch<ICartAction>;
  categories: ProductCategoryEntity[];
} | null>(null);

const CartContextWrapper = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultState);
  const [categories, setCategories] = useState<ProductCategoryEntity[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      const productCategories = await queryAllProductCategoriesIdsNames();
      // @ts-ignore
      setCategories(productCategories?.data || []);
    };
    getCategories();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartState,
        dispatchCartState,
        categories,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextWrapper;
