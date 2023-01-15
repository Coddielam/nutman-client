import ProductCard from '@components/ProductCard';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  queryAllProductCategoriesIdsNames,
  queryCategoryProductsById,
} from '@root/utils/strapiQueries';
import { PageWrapper } from '@components/page/PageWrapper';
import { useVariantsAnimationContainers } from '@root/hooks/useVariantsAnimationContainers';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const res = await queryAllProductCategoriesIdsNames();

  if (!res) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = locales!
    .map((locale) => {
      return res.data.map((e) => ({
        params: { id: e.id! },
        locale,
      }));
    })
    .flat();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const categoryProducts = await queryCategoryProductsById(
    Number(context.params!.id as string)
  );
  const productCategories = await queryAllProductCategoriesIdsNames();

  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ['common'])),
      productCategory: categoryProducts?.data,
      productCategories: productCategories?.data,
    },
  };
};

const CategoryProductsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ productCategory, productCategories }) => {
  const { t } = useTranslation('common', { keyPrefix: 'category' });
  const { i18n } = useTranslation();
  const router = useRouter();

  const [ProductCardsContainer, ProductCardContainer] =
    useVariantsAnimationContainers({ visible: 'animate' });

  return (
    <PageWrapper>
      <Head>
        <title>{t('head.title')}</title>
      </Head>
      <main>
        <div className="sticky top-navbar-with-back border-b-[lightgray] border-b-[1px] pt-4 py-2 mb-4 z-20 bg-white opacity-95 px-container-px flex items-center gap-3 prose prose-lg prose-headings:h1 font-semibold">
          {/* product category selection dropdown filter */}
          {productCategory && productCategories && (
            <select
              defaultValue={productCategory.id!}
              onChange={(e) => {
                router.push(`/category/${e.target.value}`);
              }}
            >
              {productCategories.map((category) => {
                return (
                  <option key={category.id} value={category.id!}>
                    {i18n.language === 'en'
                      ? category.attributes!.category_name_en
                      : category.attributes!.category_name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        {/* products in the category */}
        <ProductCardsContainer
          className="grid grid-cols-2 gap-4 px-container-px"
          viewport={{ once: false }}
        >
          {productCategory?.attributes?.products &&
            productCategory.attributes.products.data.map((product) => {
              return (
                <ProductCardContainer key={product.id}>
                  <ProductCard
                    productId={product.id!}
                    product_name_en={product.attributes!.product_name_en}
                    product_name_cn={product.attributes!.product_name_cn}
                    price={product.attributes!.product_price}
                    imgUrl={
                      product.attributes!.product_img.data[0].attributes?.url
                    }
                  />
                </ProductCardContainer>
              );
            })}
        </ProductCardsContainer>
      </main>
    </PageWrapper>
  );
};

export default CategoryProductsPage;
