import NextImg from 'next/image';
import fallbackImg from 'public/images/load_failed_fallback.jpeg';
import React, { useEffect, useState } from 'react';

export const Image = (props: React.ComponentProps<typeof NextImg>) => {
  const { src, ...otherProps } = props;

  const [imgSrc, setImgSrc] = useState(src);

  let blurImgProps: Pick<typeof props, 'placeholder' | 'blurDataURL'> = {};
  if (typeof imgSrc === 'string') {
    blurImgProps = {
      placeholder: 'blur',
      blurDataURL: imgSrc,
    };
  }

  useEffect(() => {
    if (typeof src === 'string') {
      setImgSrc(src);
    }
  }, [src]);

  return (
    <NextImg
      {...blurImgProps}
      className="bg-no-repeat bg-center"
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          setImgSrc(fallbackImg.src);
        }
      }}
      onError={() => {
        setImgSrc(fallbackImg.src);
      }}
      src={imgSrc}
      {...otherProps}
    >
      {otherProps.children}
    </NextImg>
  );
};
