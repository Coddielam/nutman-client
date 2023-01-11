import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Swiper from '@components/Swiper';
import { Autoplay, Pagination } from 'swiper';
import Section from '@components/Section';
import Typography from '@components/Typography';
import ModularBox from '@components/ModularBox';
import ProductCard from '@components/ProductCard';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import PaymentFlowIllu from '@components/PaymentFlowIllu';
import Image from 'next/image';
import { useMemo } from 'react';
import {
  queryPromoSlides,
  queryProductCategories,
  queryFeaturedStackedCategories,
} from '@root/utils/strapiQueries';
import memphizBg from '@root/public/images/memPat1.svg';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const promoSlides = await queryPromoSlides();
  const featuredCategorizedProducts = await queryFeaturedStackedCategories();
  const productCategories = await queryProductCategories();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      promoSlides: promoSlides?.data,
      productCategories: productCategories?.data,
      featuredCategoriesProducts: featuredCategorizedProducts?.data,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  promoSlides,
  productCategories,
  featuredCategoriesProducts,
}) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'home' });
  const { t: generalT } = useTranslation('common');

  const formattedPromoSlides = useMemo<
    { id: string; order: number; content: JSX.Element }[]
  >(() => {
    if (!promoSlides) return [];

    return promoSlides
      .filter((slide) => {
        if (
          slide.attributes?.promotion_slide?.data?.attributes &&
          slide.attributes.order
        ) {
          return slide.attributes.promotion_slide.data.attributes.formats;
        }
      })
      .map((slide) => {
        // if (!slide.attributes || !slide.attributes.promotion_slide?.data?.attributes) return
        return {
          order: slide.attributes!.order,
          id: slide.id as string,
          content: (
            <Image
              className="rounded-sm overflow-clip"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              src={
                slide.attributes!.promotion_slide!.data!.attributes!.formats
                  .medium.url
              }
              alt=""
              priority={true}
            />
          ),
        };
      })
      .sort((slideA, slideB) => slideA.order! - slideB.order!);
  }, [promoSlides]);

  const sortedFeaturedCategoriesProducts = useMemo(() => {
    if (!featuredCategoriesProducts) return [];
    return [...featuredCategoriesProducts].sort((categoryA, categoryB) => {
      return (
        categoryB.attributes!.feature_stack -
        categoryA.attributes!.feature_stack
      );
    });
  }, [featuredCategoriesProducts]);

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
        <meta name="description" content={generalT('meta.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          className="px-container-px"
          style={{
            backgroundImage: `url(${memphizBg.src})`,
          }}
        >
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
            {productCategories &&
              productCategories.map((category) => {
                if (!category.attributes) return;
                return (
                  <Link
                    href={`/category/${category.id}`}
                    key={category.attributes.category_name + category.id}
                    passHref
                  >
                    <a>
                      <ModularBox className="flex flex-col justify-center items-center gap-3 bg-main">
                        <Image
                          src={
                            category.attributes.category_icon.data?.attributes
                              ?.url || ''
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

        <div className="rounded-2xl shadow-sm">
          {/* popular products */}
          {sortedFeaturedCategoriesProducts &&
            sortedFeaturedCategoriesProducts.map((category) => {
              if (!category.attributes) return <></>;
              return (
                <Section
                  key={category.id}
                  title={
                    i18n.language === 'en'
                      ? category.attributes.category_name_en
                      : category.attributes.category_name
                  }
                  className="relative px-container-px overflow-hidden"
                >
                  {/* pattern background div */}
                  <div
                    className="absolute left-0 h-full w-full top-1/4 -z-10"
                    style={{
                      backgroundImage: `url(${memphizBg.src})`,
                    }}
                  ></div>
                  {/* pattern background div ends */}
                  <div className="grid grid-cols-2 gap-4">
                    {category &&
                      category.attributes &&
                      category.attributes.products &&
                      category.attributes.products.data.map((product) => {
                        if (!product.attributes) return <></>;
                        return (
                          <ProductCard
                            productId={product.id!}
                            imgUrl={
                              product.attributes.product_img.data[0].attributes
                                ?.url
                            }
                            key={product.id}
                            product_name_en={product.attributes.product_name_en}
                            product_name_cn={product.attributes.product_name_cn}
                            price={product.attributes.product_price}
                          />
                        );
                      })}
                  </div>
                  <Link href={`/category/${category.id}`} passHref>
                    <a className="bg-main w-fit px-4 py-2 rounded-md shadow-md block mx-auto mt-8 mb-2 bg-opacity-90">
                      <Typography variant="InlineText" bold color="white">
                        {`${t('morePopularProducts').slice(
                          0,
                          i18n.language === 'en' ? 4 : 2
                        )} ${
                          i18n.language === 'en'
                            ? category.attributes.category_name_en.toLowerCase()
                            : category.attributes.category_name.toLowerCase()
                        }`}
                      </Typography>
                    </a>
                  </Link>
                </Section>
              );
            })}
        </div>

        <Section title={t('paymentFlow')} className="px-container-px">
          <PaymentFlowIllu />
        </Section>
      </main>
    </>
  );
};

export default Home;
