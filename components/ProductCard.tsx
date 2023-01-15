import React, { useContext, useRef } from 'react';
import Typography from './Typography';
import { CgShoppingCart } from 'react-icons/cg';
import { Image } from '@components/atoms/Image';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { CartContext } from '@root/context/cart';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/atoms/Button';

interface IProductCardProps {
  productId: string;
  imgUrl?: string;
  product_name_cn: string;
  product_name_en: string;
  price: number;
}
const ProductCard: React.FC<IProductCardProps> = ({
  productId,
  imgUrl = '/placeholder-nuts.jpeg',
  product_name_cn,
  product_name_en,
  price,
}) => {
  const { t, i18n } = useTranslation('common', {
    keyPrefix: 'component.productCart',
  });

  const { dispatchCartState } = useContext(CartContext)!;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddToCartOnClick = () => {
    if (!inputRef.current) return;
    const inputValue = Number(inputRef.current.value);
    if (isNaN(inputValue)) return;
    if (inputValue <= 0) return;

    dispatchCartState({
      type: 'ADD_TO_CART',
      payload: {
        product: {
          id: productId,
          product_name_cn,
          product_name_en,
          price,
          imgUrl,
        },
        quantity: Number(inputRef.current.value),
      },
    });

    inputRef.current.value = '0';
  };

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
    <div className="rounded-lg pb-2 shadow-md max-w-[212.5px] overflow-clip bg-white h-full grid content-between">
      <div className="w-full h-[212.5px] relative mb-2 overflow-clip">
        <Link href={`/product/${productId}`} passHref>
          <a className="relative block h-full w-full">
            <Image
              src={imgUrl}
              alt={i18n.language === 'en' ? product_name_en : product_name_cn}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </a>
        </Link>
      </div>
      <div className="px-2">
        <Typography variant="Paragraph" bold>
          {i18n.language === 'en' ? product_name_en : product_name_cn}
        </Typography>
        <div className="border-t-2 border-t-[lightgray] rounded-md py-2 mt-2">
          <Typography variant="Paragraph" bold={true}>
            ${price.toLocaleString()}
          </Typography>
          <div className="flex items-center w-full py-2">
            <Button
              variants={{ whileTab: { scale: 0.5 } }}
              onClick={() => handleAddMinsuOne('MINUS')}
            >
              <AiFillMinusCircle className="w-5 h-5 shadow-sm rounded-full" />
            </Button>
            <input
              ref={inputRef}
              type="text"
              defaultValue="0"
              inputMode="numeric"
              className="w-8 h-8 mx-2 shadow-sm border border-[lightgray] text-center"
            />
            <Button
              variants={{ whileTab: { scale: 0.5 } }}
              onClick={() => handleAddMinsuOne('ADD')}
            >
              <AiFillPlusCircle className="w-5 h-5 shadow-sm rounded-full" />
            </Button>
          </div>

          <Button
            onClick={handleAddToCartOnClick}
            className="flex p-2 rounded-md items-center shadow-sm bg-main bg-opacity-90"
          >
            <Typography variant="Paragraph" bold color="white">
              {t('addToCart')}
              <CgShoppingCart className="inline-block ml-2" color="#00000" />
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
