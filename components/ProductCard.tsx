import React from 'react';
import Typography from './Typography';
import { CgShoppingCart } from 'react-icons/cg';
import Image from 'next/image';

interface IProductCardProps {
  imageUrl?: string;
  title: string;
  price: number;
}
const ProductCard: React.FC<IProductCardProps> = ({
  imageUrl = '/placeholder-nuts.jpeg',
  title,
  price,
}) => {
  return (
    <div className="rounded-lg pb-2 shadow-md max-w-[212.5px] overflow-clip bg-white">
      <div className="w-full h-[212.5px] relative mb-2">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="px-2">
        <Typography variant="Paragraph" bold>
          {title}
        </Typography>
        <div className="border-t-2 border-t-[lightgray] rounded-md py-2 mt-2">
          <Typography variant="Paragraph" bold={true}>
            ${price.toLocaleString()}
          </Typography>
          <button className="flex p-2 rounded-md items-center shadow-sm bg-yellow">
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
