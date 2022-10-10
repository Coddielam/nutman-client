import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '@root/context/cart';
import Image from 'next/image';
import Typography from '@components/Typography';
import { useQuantityInput } from '@root/hooks/useQuantityInput';

const CartItemInfo: React.FC<{
  imgUrl: string;
  title: string;
  price: number;
  quantity: number;
}> = ({ imgUrl, title, price, quantity }) => {
  const { quantity: inputQuantity, QuantityInput } = useQuantityInput({
    defaultValue: quantity,
  });
  const { cartState, dispatchCartState } = useContext(CartContext)!;
  const [originalQuantity, setOriginalQuantity] = useState(quantity);

  const updateQuantityInCart = () => {
    dispatchCartState({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: { product: { imgUrl, title, price }, quantity: inputQuantity },
    });
  };

  useEffect(() => {
    setOriginalQuantity(
      cartState.filter((item) => item.title === title).length
    );
  }, [cartState, title]);

  return (
    <div className="flex h-[180px] w-full rounded-sm overflow-clip border border-x-0 border-y-0 border-b-[1px] border-b-[lightgray] pb-3">
      <div className="w-1/3 h-full relative overflow-clip rounded-md">
        <Image
          src={imgUrl}
          objectFit="cover"
          layout="fill"
          alt={title}
          objectPosition="top"
        />
      </div>
      <div className="py-2 px-4">
        <Typography variant="Subtitle">{title}</Typography>
        <Typography variant="Paragraph" bold>
          ${price.toLocaleString()}
        </Typography>
        <QuantityInput />
        {inputQuantity !== originalQuantity && (
          <button
            className="px-2 py-1 shadow-sm rounded-sm bg-yellow"
            onClick={updateQuantityInCart}
          >
            <Typography variant="InlineText">Update quantity</Typography>
          </button>
        )}
      </div>
    </div>
  );
};

const CartOverview: React.FC = () => {
  const { cartState } = useContext(CartContext)!;

  return (
    <div className="flex gap-4 flex-col px-4 my-4">
      {cartState
        .reduce<
          { title: string; imgUrl: string; price: number; quantity: number }[]
        >((aggregated, currentProduct) => {
          const existingIndex = aggregated.findIndex(
            (product) => product.title === currentProduct.title
          );
          if (existingIndex !== -1) {
            return aggregated.map((item, index) => {
              if (index === existingIndex) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
          }
          return [...aggregated, { ...currentProduct, quantity: 1 }];
        }, [])
        .map((productInCart) => {
          return <CartItemInfo key={productInCart.title} {...productInCart} />;
        })}
    </div>
  );
};

export default CartOverview;
