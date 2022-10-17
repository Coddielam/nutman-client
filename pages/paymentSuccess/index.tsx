import Typography from '@components/Typography';
import { PaymentIntent } from '@stripe/stripe-js';
import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const PaymentSuccess: NextPage = () => {
  const { t } = useTranslation('common', { keyPrefix: 'paymentSuccess' });
  const router = useRouter();

  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();

  useEffect(() => {
    if (!router.query.payment_intent) {
      const redirectTimeout = setTimeout(() => {
        router.push('/');
      }, 1000);
      return () => {
        clearTimeout(redirectTimeout);
      };
    }

    const retrievePaymentIntent = async () => {
      const { data } = await axios.post('/api/payment_intents/retrieve', {
        intent_id: router.query!.payment_intent,
        payment_intent_client_secret:
          router.query!.payment_intent_client_secret,
      });

      setPaymentIntent(data);
    };

    retrievePaymentIntent();
  }, [router]);

  if (!router.query.payment_intent) {
    return (
      <main>
        <Head>
          <title>{t('head.title')}</title>
        </Head>
        <Typography variant="PageTitle">{t('oops')}</Typography>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>
      <main className="flex flex-col items-center gap-5 py-32 px-container-px max-w-xs mx-auto">
        <BsFillCheckCircleFill className="w-36 h-36 fill-green" />
        <div className="text-center">
          <Typography variant="PageTitle">
            {t('paymentConfirmedMsg')}
          </Typography>
        </div>

        {paymentIntent && (
          <>
            <div className="my-4 flex flex-col gap-3">
              <Typography variant="Paragraph">{t('paymentId')}</Typography>
              <Typography variant="Paragraph">
                {t('rememberPaymentIdMsg')}
              </Typography>
              <Typography variant="Subtitle" color="purple">
                {paymentIntent.id}
              </Typography>
              <pre>{paymentIntent.description}</pre>
            </div>

            <Typography variant="Paragraph">
              {t('youWillReceiveEmailReceiptSoon')}
            </Typography>
          </>
        )}

        <div className="mt-6 text-blue">
          <Link href="/">
            <a>
              <Typography variant="Paragraph" bold color="blue">
                {t('continueShopping')}
              </Typography>
            </a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default PaymentSuccess;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
