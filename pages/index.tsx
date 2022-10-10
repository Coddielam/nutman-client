import type { NextPage } from 'next';
import Head from 'next/head';
import Swiper from '@components/Swiper';
import Section from '@components/Section';
import Typography from '@components/Typography';
import ModularBox from '@components/ModularBox';
import ProductCard from '@components/ProductCard';
import {
  IPopularProduct,
  IProductCategory,
  queryPopularProducts,
  queryProductCategories,
} from '@services/productServices';

const dummySlides = {
  slides: [
    {
      id: 'slide-1',
      content: <div>Slide 1</div>,
    },
    {
      id: 'slide-2',
      content: <div>Slide 2</div>,
    },
    {
      id: 'slide-3',
      content: <div>Slide 3</div>,
    },
    {
      id: 'slide-4',
      content: <div>Slide 4</div>,
    },
    {
      id: 'slide-5',
      content: <div>Slide 5</div>,
    },
  ],
};

const Home: NextPage<{
  products: IPopularProduct[];
  productCategories: IProductCategory[];
}> = ({ products, productCategories }) => {
  return (
    <div>
      <Head>
        <title>Nutman</title>
        <meta name="description" content="Health products store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-orange px-container-px">
          <Swiper slides={dummySlides.slides} />
        </div>

        <Section title="Top Category" className="px-container-px">
          <div className="flex gap-3 overflow-auto pb-2">
            {productCategories.map((category) => {
              return (
                <ModularBox
                  key={category.attributes.category_name + category.id}
                  className="flex-shrink-0 bg-dark-blue"
                >
                  <Typography variant="Paragraph" color="white">
                    {category.attributes.category_name}
                  </Typography>
                </ModularBox>
              );
            })}
          </div>
        </Section>
        <div
          className="rounded-2xl shadow-sm"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, white 0px, white 250px, white 250px, #ff934f 150px, #ff934f 150px)',
          }}
        >
          <Section
            title="Popular Products"
            className="relative px-container-px"
          >
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => {
                return (
                  <ProductCard
                    productId={product.id}
                    imgUrl={
                      product.attributes.product_img.data[0].attributes.formats
                        .medium.url
                    }
                    key={product.id}
                    title={product.attributes.product_name_cn}
                    price={product.attributes.product_price}
                  />
                );
              })}
            </div>
            <button className="bg-yellow w-fit px-4 pt-2 rounded-md shadow-md block mx-auto mt-8 mb-2">
              <Typography variant="InlineText" bold>
                更多今期熱門
              </Typography>
            </button>
          </Section>
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const populatProducts = await queryPopularProducts();
  const productCategories = await queryProductCategories();
  return {
    props: {
      productCategories: productCategories.data,
      products: populatProducts.data,
    },
  };
}

export default Home;
