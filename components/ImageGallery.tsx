import React, { useEffect, useState } from 'react';
import CusSwiper from '@components/Swiper';
import { Image } from '@components/atoms/Image';
import Swiper from 'swiper';

interface IImageGallery {
  images: {
    title: string;
    medium: { url: string };
    thumbnail: { url: string };
  }[];
  swiper: Swiper;
}

const SwiperThumbnailPagination = ({ images, swiper }: IImageGallery) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    const handleSlideChange = (swiper: Swiper) => {
      setActiveIndex(swiper.activeIndex);
    };
    swiper.on('slideChange', handleSlideChange);

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper]);

  return (
    <div className="flex pt-2 gap-1">
      {images.map((img, index) => {
        return (
          <div
            className={`h-14 w-14 relative cursor-pointer ${
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
              width={100}
              height={100}
              objectFit="cover"
            />
          </div>
        );
      })}
    </div>
  );
};

const ImageGallery: React.FC<Pick<IImageGallery, 'images'>> = ({ images }) => {
  const [swiperRef, setSwiperRef] = useState<Swiper | null>(null);

  return (
    <div className="p-2">
      <CusSwiper
        onInit={(swiper) => {
          setSwiperRef(swiper);
        }}
        className="w-full h-[250px] overflow-visible"
        swiperSlideProps={{
          className: 'rounded-none bg-memphisPattern',
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
                priority={true}
              />
            ),
          };
        })}
      ></CusSwiper>
      {swiperRef && (
        <SwiperThumbnailPagination images={images} swiper={swiperRef} />
      )}
    </div>
  );
};

export default ImageGallery;
