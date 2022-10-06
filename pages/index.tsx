import type { NextPage } from 'next';
import Head from 'next/head';
import Swiper from '@components/Swiper';
import Section from '@components/Section';
import Typography from '@components/Typography';
import ModularBox from '@components/ModularBox';
import ProductCard from '@components/ProductCard';

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

const dummyTopCategories = [
  {
    title: 'Nuts',
  },
  {
    title: 'Nuts',
  },
  {
    title: 'Nuts',
  },
  {
    title: 'Nuts',
  },
  {
    title: 'Nuts',
  },
];

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Nutman - Shop </title>
        <meta name="description" content="Health products store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-orange px-container-px">
          <Swiper slides={dummySlides.slides} />
        </div>
        <div className="px-container-px">
          <Section title="Top Category">
            <div className="flex gap-3 overflow-auto pb-2">
              {dummyTopCategories.map((category) => {
                return (
                  <ModularBox key={category.title} className="flex-shrink-0">
                    <Typography variant="Paragraph">
                      {category.title}
                    </Typography>
                  </ModularBox>
                );
              })}
            </div>
          </Section>
          <Section title="Popular Products">
            <ProductCard title="Cashew" price={100} />
          </Section>
        </div>
      </main>
    </div>
  );
};

export default Home;
