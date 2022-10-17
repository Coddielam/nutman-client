import Accordion from '@components/ExpandPanel';
import ImageGallery from '@components/ImageGallery';
import Typography from '@components/Typography';
import { CartContext } from '@root/context/cart';
import { useQuantityInput } from '@root/hooks/useQuantityInput';
import {
  IProductDetail,
  queryAllProductIds,
  queryProductById,
} from '@services/productServices';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { products } = await queryAllProductIds();

  const paths = locales!
    .map((locale) => {
      return products.data.map((e) => ({
        params: { id: e.id },
        locale: locale,
      }));
    })
    .flat();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { productDetails: IProductDetail },
  { id: string }
> = async (context) => {
  const { data } = await queryProductById(context.params!.id);
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ['common'])),
      productDetails: data,
    },
  };
};

const ProductDetail: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ productDetails }) => {
  const { t, i18n } = useTranslation('common');

  const {
    product_name_cn,
    product_desc_en,
    product_img,
    product_categories,
    product_price,
    product_desc_cn,
    product_name_en,
  } = productDetails.attributes;

  const { quantity, setQuantity, QuantityInput } = useQuantityInput({
    defaultValue: 0,
  });

  const { dispatchCartState } = useContext(CartContext)!;

  const handleAddToCart = () => {
    if (quantity <= 0) return;
    dispatchCartState({
      type: 'ADD_TO_CART',
      payload: {
        product: {
          id: productDetails.id,
          product_name_cn,
          product_name_en,
          price: product_price,
          imgUrl: product_img.data[0].attributes.formats.medium.url,
        },
        quantity,
      },
    });
    setQuantity(0);
  };

  return (
    <>
      <Head>
        <title>{t('product.head.title')}</title>
      </Head>
      <main className="pb-20">
        <ImageGallery
          images={product_img.data.map((img) => {
            return {
              title: i18n.language === 'en' ? product_name_en : product_name_cn,
              medium: img.attributes.formats.medium,
              thumbnail: img.attributes.formats.thumbnail,
            };
          })}
        />
        {/* product details */}
        <div className="pt-4 px-container-px mb-10">
          <div className="flex gap-3 mb-2">
            {product_categories.data.map((category) => {
              return (
                <span
                  key={
                    i18n.language === 'en'
                      ? category.attributes.category_name_en
                      : category.attributes.category_name
                  }
                  className="px-1 bg-platinum rounded-sm shadow-sm"
                >
                  <Typography variant="InlineText" color="dark-blue">
                    #
                    {i18n.language === 'en'
                      ? category.attributes.category_name_en
                      : category.attributes.category_name}
                  </Typography>
                </span>
              );
            })}
          </div>

          <div className="flex justify-between my-4">
            <Typography variant="PageTitle">
              {i18n.language === 'en' ? product_name_en : product_name_cn}
            </Typography>
            <Typography variant="PageTitle">${product_price}</Typography>
          </div>

          <div className="border-y-[lightgray] border-y-[1px]">
            <Accordion title={t('product.id.productDescription')} defaultOpen>
              <div className="px-3 prose">
                {(i18n.language === 'en' ? product_desc_en : product_desc_cn) ||
                  '-'}
              </div>
            </Accordion>
          </div>
        </div>
        {/* Add to cart */}
        <div className="w-full px-4 py-2 bg-platinum bg-opacity-20 shadow-sm flex mt-4 items-center gap-4 justify-start">
          <Typography variant="Subtitle">
            {t('component.productCart.addToCart')}
          </Typography>
          <div>
            <QuantityInput />
          </div>
          <button
            className="ml-auto bg-orange shadow-sm rounded-sm px-2 py-1 shadow-platinum opacity-100"
            onClick={handleAddToCart}
          >
            <Typography variant="InlineText" bold color="white">
              {t('product.id.confirm')}
            </Typography>
          </button>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
