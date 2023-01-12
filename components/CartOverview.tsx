import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext, ICartProduct } from '@root/context/cart';
import Image from 'next/image';
import Typography from '@components/Typography';
import { useQuantityInput } from '@root/hooks/useQuantityInput';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

const CartItemInfo: React.FC<{
  product_id: string;
  imgUrl: string;
  product_name_cn: string;
  product_name_en: string;
  price: number;
  quantity: number;
}> = ({
  product_id,
  imgUrl,
  product_name_cn,
  product_name_en,
  price,
  quantity,
}) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'checkout' });
  const { quantity: inputQuantity, QuantityInput } = useQuantityInput({
    defaultValue: quantity,
  });
  const { cartState, dispatchCartState } = useContext(CartContext)!;
  const [originalQuantity, setOriginalQuantity] = useState(quantity);

  const updateQuantityInCart = () => {
    dispatchCartState({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: {
        product: {
          id: product_id,
          imgUrl,
          product_name_cn,
          product_name_en,
          price,
        },
        quantity: inputQuantity,
      },
    });
  };

  useEffect(() => {
    setOriginalQuantity(
      cartState.filter((item) => item.id === product_id).length
    );
  }, [cartState, product_id]);

  return (
    <div className="flex w-full rounded-sm py-3 h-fit">
      <div className="w-1/3 h-[180px] relative overflow-clip rounded-md">
        <Image
          src={imgUrl}
          objectFit="cover"
          layout="fill"
          alt={i18n.language === 'en' ? product_name_en : product_name_cn}
          objectPosition="top"
          height="180"
        />
      </div>
      <div className="py-2 px-4">
        <Typography variant="Subtitle">
          {i18n.language === 'en' ? product_name_en : product_name_cn}
        </Typography>
        <Typography variant="Paragraph" bold>
          ${price.toLocaleString()} ({t('itemTotal')} ${inputQuantity * price})
        </Typography>
        <QuantityInput />

        <button
          className={cn('px-2 py-1 shadow-sm rounded-sm bg-yellow', {
            'opacity-0': inputQuantity === originalQuantity,
          })}
          // className="px-2 py-1 shadow-sm rounded-sm bg-yellow"
          onClick={updateQuantityInCart}
        >
          <Typography variant="InlineText">{t('updateQuantity')}</Typography>
        </button>
      </div>
    </div>
  );
};

const CartOverview: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'checkout' });
  const { cartState } = useContext(CartContext)!;

  return (
    <div className="flex flex-col my-3 divide-solid divide-y-[1px] divide-platinum">
      {cartState
        .reduce<Array<ICartProduct & { quantity: number }>>(
          (aggregated, currentProduct) => {
            const existingIndex = aggregated.findIndex(
              (product) => product.id === currentProduct.id
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
          },
          []
        )
        .map(({ id: product_id, ...otherProps }) => {
          return (
            <CartItemInfo
              key={`cart-item-${product_id}`}
              product_id={product_id}
              {...otherProps}
            />
          );
        })}
      <div className="ml-auto pt-3">
        <Typography variant="Subtitle" color="green">
          {t('orderTotal')} $
          {cartState.reduce((total, item) => total + item.price, 0)}
        </Typography>
      </div>
    </div>
  );
};

export default CartOverview;
