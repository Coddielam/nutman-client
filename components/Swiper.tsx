import React from 'react';
import {
  Swiper,
  SwiperSlide,
  SwiperProps,
  SwiperSlideProps,
} from 'swiper/react';
import 'swiper/css';

type TStyledSwiperProps = SwiperProps & {
  slides: { id: string; content: React.ReactNode }[];
  swiperSlideProps?: SwiperSlideProps;
};

const StyledSwiper: React.FC<TStyledSwiperProps> = ({
  slides,
  className,
  spaceBetween,
  slidesPerView,
  swiperSlideProps,
  children,
  ...otherSwiperProps
}) => {
  return (
    <Swiper
      className={
        className
          ? className + ' !overflow-x-clip !overflow-y-visible'
          : 'w-full !p-2 !py-5 h-32'
      }
      spaceBetween={spaceBetween ?? 50}
      slidesPerView={slidesPerView ?? 1}
      {...otherSwiperProps}
    >
      {children}
      {slides.map(({ id, content }) => {
        return (
          <SwiperSlide
            className={
              swiperSlideProps?.className ??
              'px-6 py-6 shadow-md rounded-lg bg-white'
            }
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
