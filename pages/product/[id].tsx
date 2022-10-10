import ImageGallery from '@components/ImageGallery';
import Typography from '@components/Typography';
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
import React from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const { products } = await queryAllProductIds();

  return {
    paths: products.data.map((e) => ({ params: { id: e.id } })),
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
      productDetails: data,
    },
  };
};

const ProductDetail: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ productDetails }) => {
  const { product_name_cn, product_img, product_categories, product_price } =
    productDetails.attributes;
  return (
    <div>
      <main>
        <ImageGallery
          images={product_img.data.map((img) => {
            return {
              title: product_name_cn,
              medium: img.attributes.formats.medium,
              thumbnail: img.attributes.formats.thumbnail,
            };
          })}
        />
        {/* product details */}
        <div className="pt-4">
          <div className="flex gap-3 mb-2">
            {product_categories.data.map((category) => {
              return (
                <span
                  key={category.attributes.category_name}
                  className="px-1 bg-platinum rounded-sm shadow-sm"
                >
                  <Typography variant="InlineText" color="dark-blue">
                    #{category.attributes.category_name}
                  </Typography>
                </span>
              );
            })}
          </div>
          <div className="flex justify-between">
            <Typography variant="PageTitle">{product_name_cn}</Typography>
            <Typography variant="PageTitle">${product_price}</Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
