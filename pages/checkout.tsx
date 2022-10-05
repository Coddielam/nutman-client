import { Elements } from '@stripe/react-stripe-js';
import { PaymentIntent } from '@stripe/stripe-js';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import PaymentElementsForm from '../components/PaymentElementsForm';
import getStripe from '../utils/getStripe';

const CheckoutPage: NextPage = () => {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );
  useEffect(() => {
    axios
      .post('/api/payment_intents', {
        // TODO: get it from context
        amount: 78, // minimum 0.78
      })
      .then((res) => {
        setPaymentIntent(res.data);
      });
  }, [setPaymentIntent]);

  return (
    <div>
      {/* stripe payment elements context provider */}
      {paymentIntent && paymentIntent.client_secret && (
        <Elements
          stripe={getStripe()}
          options={{
            clientSecret: paymentIntent.client_secret,
            appearance: {
              theme: 'none',
            },
          }}
        >
          <PaymentElementsForm />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
