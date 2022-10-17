import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Swiper from '@components/Swiper';
import { Autoplay, Pagination } from 'swiper';
import Section from '@components/Section';
import Typography from '@components/Typography';
import ModularBox from '@components/ModularBox';
import ProductCard from '@components/ProductCard';
import {
  IProducts,
  IProductCategoryName,
  queryPromoSlides,
  queryPopularProducts,
  queryProductCategories,
  IPromoSlide,
} from '@services/productServices';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import PaymentFlowIllu from '@components/PaymentFlowIllu';
import Image from 'next/image';
import { useMemo } from 'react';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  promoSlides,
  popularProducts,
  productCategories,
}) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'home' });
  const { t: generalT } = useTranslation('common');

  const formattedPromoSlides = useMemo(
    () =>
      promoSlides
        .filter(
          (slide) => slide.attributes.promotion_slide.data.attributes.formats
        )
        .map((slide) => {
          return {
            order: slide.attributes.order,
            id: slide.id,
            content: (
              <Image
                className="rounded-sm overflow-clip"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                src={
                  slide.attributes.promotion_slide.data.attributes.formats
                    .medium.url
                }
                alt=""
                priority={true}
              />
            ),
          };
        })
        .sort((slideA, slideB) => slideA.order - slideB.order),
    [promoSlides]
  );

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
        <meta name="description" content={generalT('meta.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-platinum px-container-px">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 2400,
              disableOnInteraction: false,
            }}
            pagination={{ enabled: true }}
            className="h-[250px] w-full py-2"
            slides={formattedPromoSlides ?? []}
            swiperSlideProps={{
              className: 'rounded-sm overflow-clip',
            }}
          />
        </div>

        <Section title={t('topCategory')} className="px-container-px">
          <div className="flex gap-3 overflow-auto pb-2">
            {productCategories.map((category) => {
              return (
                <Link
                  href={`/category/${category.id}`}
                  key={category.attributes.category_name + category.id}
                  passHref
                >
                  <a>
                    <ModularBox className="flex flex-col justify-center items-center gap-3 bg-orange">
                      <Image
                        src={
                          category.attributes.category_icon.data.attributes.url
                        }
                        width={65}
                        height={65}
                        alt={category.attributes.category_name}
                      />
                      <Typography variant="Paragraph" color="white">
                        {i18n.language === 'en'
                          ? category.attributes.category_name_en
                          : category.attributes.category_name}
                      </Typography>
                    </ModularBox>
                  </a>
                </Link>
              );
            })}
          </div>
        </Section>
        <div
          className="rounded-2xl shadow-sm"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, white 0px, white 250px, white 250px, #ecece9 150px, #ecece9 150px)',
          }}
        >
          <Section
            title={t('popularProducts')}
            className="relative px-container-px"
          >
            <div className="grid grid-cols-2 gap-4">
              {popularProducts.attributes.products.data.map((product) => {
                return (
                  <ProductCard
                    productId={product.id}
                    imgUrl={
                      product.attributes.product_img.data[0].attributes.formats
                        .medium.url
                    }
                    key={product.id}
                    product_name_en={product.attributes.product_name_en}
                    product_name_cn={product.attributes.product_name_cn}
                    price={product.attributes.product_price}
                  />
                );
              })}
            </div>
            <Link href="/category/6" passHref>
              <a className="bg-orange w-fit px-4 py-2 rounded-md shadow-md block mx-auto mt-8 mb-2 bg-opacity-90">
                <Typography variant="InlineText" bold>
                  {t('morePopularProducts')}
                </Typography>
              </a>
            </Link>
          </Section>
        </div>

        <Section title={t('paymentFlow')} className="px-container-px">
          <PaymentFlowIllu />
        </Section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  promoSlides: IPromoSlide[];
  popularProducts: IProducts;
  productCategories: IProductCategoryName[];
}> = async ({ locale }) => {
  const promoSlides = await queryPromoSlides();
  const populatProducts = await queryPopularProducts();
  const productCategories = await queryProductCategories();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      promoSlides: promoSlides.data,
      popularProducts: populatProducts.data,
      productCategories: productCategories.data,
    },
  };
};

export default Home;
