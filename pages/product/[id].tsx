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
import React, { useContext } from 'react';

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
  const {
    product_name_cn,
    product_img,
    product_categories,
    product_price,
    product_desc_cn,
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
          title: product_name_cn,
          price: product_price,
          imgUrl: product_img.data[0].attributes.formats.medium.url,
        },
        quantity,
      },
    });
    setQuantity(0);
  };

  return (
    <div>
      <main className="pb-32">
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
        <div className="pt-4 px-container-px">
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

          <div className="flex justify-between my-4">
            <Typography variant="PageTitle">{product_name_cn}</Typography>
            <Typography variant="PageTitle">${product_price}</Typography>
          </div>

          <div className="border-y-[lightgray] border-y-[1px]">
            <Accordion title="Product description" defaultOpen>
              <div>{product_desc_cn ?? '-'}</div>
            </Accordion>
          </div>

          <div className="fixed left-0 bottom-0 w-full px-4 py-2 bg-white opacity-95 shadow-lg shadow-[black] flex mt-4 items-center gap-4 justify-start">
            <Typography variant="Subtitle">Add to cart</Typography>
            <div>
              <QuantityInput />
            </div>
            <button
              className="ml-auto bg-orange shadow-sm rounded-sm px-2 py-1 shadow-platinum opacity-100"
              onClick={handleAddToCart}
            >
              <Typography variant="InlineText" bold color="white">
                Confirm
              </Typography>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
