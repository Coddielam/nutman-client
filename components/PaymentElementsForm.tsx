import React, { FormEvent, useEffect, useState, useRef } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Typography from './Typography';
import { CgSpinner } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';

const PaymentElementsForm: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'checkout' });
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // stripe js has not yet loaded
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // complete payment with stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          process.env.NODE_ENV === 'development'
            ? 'localhost:3000/paymentSuccess'
            : process.env.URL + '/paymentSuccess',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message!);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  // updating payment status based on stripe
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case 'succeeded':
          setMessage(t('stripeMsg.succeeded'));
          break;
        case 'processing':
          setMessage(t('stripeMsg.processing'));
          break;
        case 'requires_payment_method':
          setMessage(t('stripeMsg.requires_payment_method'));
          break;
        default:
          setMessage(t('stripeMsg.something_went_wrong'));
          break;
      }
    });
  }, [stripe, t]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 divide-solid divide-y-[1px] divide-platinum"
    >
      <div className="flex flex-col py-3 mb-16">
        <Typography variant="Subtitle">{t('paymentInformation')}</Typography>
        {/* Stripe Payment */}
        <PaymentElement className="pt-5 py-3" />

        <button
          className="bg-blue px-4 py-2 rounded-sm shadow-sm flex justify-center h-10"
          disabled={!stripe || !elements}
        >
          {isLoading ? (
            <CgSpinner className="animate-spin" />
          ) : (
            <Typography variant="Paragraph" color="white">
              {t('submitOrder')}
            </Typography>
          )}
        </button>

        {message && (
          <Typography variant="Paragraph" color="red">
            {message}
          </Typography>
        )}
      </div>
    </form>
  );
};

export default PaymentElementsForm;
