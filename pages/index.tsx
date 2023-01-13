import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
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
import React, { useMemo } from 'react';
import {
  queryPromoSlides,
  queryProductCategories,
  queryFeaturedStackedCategories,
} from '@root/utils/strapiQueries';
import Head from 'next/head';
import { PageWrapper } from '@components/page/PageWrapper';
import { useVariantsAnimationContainers } from '@root/hooks/useVariantsAnimationContainers';

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

  const [VariantsContainer, VariantContainer] =
    useVariantsAnimationContainers();

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
        <meta name="description" content={generalT('meta.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <div className="px-container-px bg-memphisPattern">
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
          <VariantsContainer
            className="flex gap-3 overflow-auto pb-2"
            viewport={{ once: true }}
          >
            {productCategories &&
              productCategories.map((category) => {
                if (!category.attributes) return;
                return (
                  <VariantContainer key={category.id}>
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
                  </VariantContainer>
                );
              })}
          </VariantsContainer>
        </Section>

        <div className="rounded-2xl shadow-sm">
          {/* popular products */}
          {featuredCategoriesProducts &&
            featuredCategoriesProducts.map((category, index) => {
              if (!category.attributes) return <></>;
              return (
                <div key={category.id}>
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
                    <div className="absolute top-1/4 left-0 h-full w-full bg-memphisPattern"></div>
                    {/* featured products */}
                    <VariantsContainer
                      visibleOn={index === 0 ? 'onmount' : 'inview'}
                      className="grid grid-cols-2 gap-4"
                      viewport={{
                        once: true,
                        margin: '100px',
                        amount: 0.01,
                      }}
                    >
                      {category &&
                        category.attributes &&
                        category.attributes.products &&
                        category.attributes.products.data.map((product) => {
                          if (!product.attributes) return <></>;
                          return (
                            <VariantContainer className="z-10" key={product.id}>
                              <ProductCard
                                productId={product.id!}
                                imgUrl={
                                  product.attributes.product_img.data[0]
                                    .attributes?.url
                                }
                                product_name_en={
                                  product.attributes.product_name_en
                                }
                                product_name_cn={
                                  product.attributes.product_name_cn
                                }
                                price={product.attributes.product_price}
                              />
                            </VariantContainer>
                          );
                        })}
                    </VariantsContainer>
                    <Link
                      href={`/category/${category.id}`}
                      passHref
                      className="z-10"
                    >
                      <a className="bg-main w-fit px-4 py-2 rounded-md shadow-md block mx-auto mt-8 mb-2 bg-opacity-90 relative z-10">
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
                </div>
              );
            })}
        </div>

        <Section title={t('paymentFlow')} className="px-container-px">
          <PaymentFlowIllu />
        </Section>
      </PageWrapper>
    </>
  );
};

export default Home;
