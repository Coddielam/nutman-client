import Typography from '@components/Typography';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { HTMLAttributes, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

const Figure: React.FC<PropsWithChildren<HTMLAttributes<HTMLSpanElement>>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <span
      className={`${className} text-9xl font-bold font-mono`}
      {...otherProps}
    >
      {children}
    </span>
  );
};

const Custom404: NextPage = () => {
  const { t } = useTranslation('common', { keyPrefix: '404' });
  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>
      <main className="px-container-px mb-16 pt-6">
        <div className="my-4">
          <Figure>4</Figure>
          <Figure>0</Figure>
          <Figure>4</Figure>
        </div>
        <Typography variant="Paragraph">{t('badLink')}</Typography>
        <div className="text-center mt-4 w-fit mx-auto">
          <Link href="/" passHref>
            <a className="text-blue">{t('goHome')}</a>
          </Link>
        </div>
      </main>
    </>
  );
};
export default Custom404;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
