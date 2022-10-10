import React, { useState } from 'react';
import Swiper from '@components/Swiper';
import Image from 'next/image';
import { useSwiper } from 'swiper/react';

interface IImageGallery {
  images: {
    title: string;
    medium: { url: string };
    thumbnail: { url: string };
  }[];
}

const SwiperThumbnailPagination = ({ images }: IImageGallery) => {
  const swiper = useSwiper();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="flex pt-2 gap-1">
      {images.map((img, index) => {
        return (
          <div
            className={`h-14 w-14 relative ${
              activeIndex === index ? 'border-blue border-4' : ''
            }`}
            key={img.title + index.toString()}
            onClick={() => {
              swiper.slideTo(index);
              setActiveIndex(index);
            }}
          >
            <Image
              alt={img.title}
              src={img.thumbnail.url}
              layout="fill"
              objectFit="cover"
              height="20"
              width="20"
            />
          </div>
        );
      })}
    </div>
  );
};

const ImageGallery: React.FC<IImageGallery> = ({ images }) => {
  return (
    <div className="p-2 mb-[68px]">
      <Swiper
        className="w-full h-[250px] overflow-visible"
        swiperSlideProps={{
          className: 'rounded-none bg-platinum',
        }}
        slides={images.map((img, index) => {
          return {
            id: img.thumbnail.url.substr(0, 5) + index.toString(),
            content: (
              <Image
                src={img.medium.url}
                alt={img.title}
                layout="fill"
                objectFit="contain"
                objectPosition="cneter"
              />
            ),
          };
        })}
      >
        <SwiperThumbnailPagination images={images} />
      </Swiper>
    </div>
  );
};

export default ImageGallery;
