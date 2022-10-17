import ProductCard from '@components/ProductCard';
import {
  ICategoryProducts,
  IProductCategoriesIdsAndName,
  queryAllProductCategoryIds,
  queryCategoryProductsById,
} from '@services/productServices';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { productCategories } = await queryAllProductCategoryIds();

  const paths = locales!
    .map((locale) => {
      return productCategories.data.map((e) => ({
        params: { id: e.id },
        locale,
      }));
    })
    .flat();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  {
    productCategory: ICategoryProducts;
    productCategories: IProductCategoriesIdsAndName[];
  },
  { id: string }
> = async (context) => {
  const { data } = await queryCategoryProductsById(context.params!.id);
  const { productCategories } = await queryAllProductCategoryIds();

  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ['common'])),
      productCategory: data,
      productCategories: productCategories.data,
    },
  };
};

const CategoryProductsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ productCategory, productCategories }) => {
  const { t } = useTranslation('common', { keyPrefix: 'category' });
  const { i18n } = useTranslation();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>
      <main>
        <div className="border-b-[lightgray] border-b-[1px] pt-4 py-2 mb-4 sticky top-navbar z-20 bg-white opacity-95 px-container-px flex items-center gap-3 prose prose-lg prose-headings:h1 font-semibold">
          <select
            defaultValue={productCategory.id}
            onChange={(e) => {
              router.push(`/category/${e.target.value}`);
            }}
          >
            {productCategories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {i18n.language === 'en'
                    ? category.attributes.category_name_en
                    : category.attributes.category_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 px-container-px">
          {productCategory.attributes.products.data.map((product) => {
            return (
              <ProductCard
                key={
                  i18n.language === 'en'
                    ? product.attributes.product_name_en
                    : product.attributes.product_name_cn
                }
                productId={product.id}
                product_name_en={product.attributes.product_name_en}
                product_name_cn={product.attributes.product_name_cn}
                price={product.attributes.product_price}
                imgUrl={
                  product.attributes.product_img.data[0].attributes.formats
                    .medium.url
                }
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default CategoryProductsPage;
