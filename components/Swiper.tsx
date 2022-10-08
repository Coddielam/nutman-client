import React from 'react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import 'swiper/css';

interface StyledSwiperProps extends SwiperProps {
  slides: { id: string; content: React.ReactNode }[];
}

const StyledSwiper: React.FC<StyledSwiperProps> = ({
  slides,
  ...swiperProps
}) => {
  return (
    <Swiper
      className="w-full !p-2 !py-5 h-32"
      spaceBetween={50}
      slidesPerView={1}
      {...swiperProps}
    >
      {slides.map(({ id, content }) => {
        return (
          <SwiperSlide
            className="px-6 py-6 shadow-md rounded-lg bg-white"
            key={id}
          >
            {content}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default StyledSwiper;
