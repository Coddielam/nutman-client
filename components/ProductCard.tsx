import React, { useContext, useRef } from 'react';
import Typography from './Typography';
import { CgShoppingCart } from 'react-icons/cg';
import Image from 'next/image';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { CartContext } from '@root/context/cart';
import Link from 'next/link';

interface IProductCardProps {
  productId: string;
  imgUrl?: string;
  title: string;
  price: number;
}
const ProductCard: React.FC<IProductCardProps> = ({
  productId,
  imgUrl = '/placeholder-nuts.jpeg',
  title,
  price,
}) => {
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
        product: { title, price, imgUrl },
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
    <div className="rounded-lg pb-2 shadow-md max-w-[212.5px] overflow-clip bg-white">
      <div className="w-full h-[212.5px] relative mb-2 overflow-clip">
        <Link href={`/product/${productId}`} passHref>
          <a>
            <Image
              src={imgUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </a>
        </Link>
      </div>
      <div className="px-2">
        <Typography variant="Paragraph" bold>
          {title}
        </Typography>
        <div className="border-t-2 border-t-[lightgray] rounded-md py-2 mt-2">
          <Typography variant="Paragraph" bold={true}>
            ${price.toLocaleString()}
          </Typography>
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

          <button
            onClick={handleAddToCartOnClick}
            className="flex p-2 rounded-md items-center shadow-sm bg-yellow"
          >
            <Typography variant="Paragraph" bold>
              Add to cart
              <CgShoppingCart className="inline-block ml-2" />
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
