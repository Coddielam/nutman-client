import CartOverview from '@components/CartOverview';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentIntent } from '@stripe/stripe-js';
import axios from 'axios';
import { NextPage } from 'next';
import { useContext, useEffect, useMemo, useState } from 'react';
import PaymentElementsForm from '@components/PaymentElementsForm';
import getStripe from '@root/utils/getStripe';
import { CartContext } from '@root/context/cart';
import Typography from '@components/Typography';
import Link from 'next/link';

const CheckoutPage: NextPage = () => {
  const { cartState } = useContext(CartContext)!;

  const cartTotalPrice = useMemo(() => {
    return cartState.reduce((total, item) => {
      return total + item.price;
    }, 0);
  }, [cartState]);

  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );

  useEffect(() => {
    if (cartTotalPrice > 0) {
      axios
        .post('/api/payment_intents', {
          amount: cartTotalPrice * 100, // minimum 0.78
        })
        .then((res) => {
          setPaymentIntent(res.data);
        });
    }
  }, [setPaymentIntent, cartTotalPrice]);

  if (cartTotalPrice === 0) {
    return (
      <div className="my-32 w-full flex flex-col gap-4 justify-center items-center">
        <Typography variant="PageTitle">Your cart is empty</Typography>
        <div className="bg-blue w-fit px-4 py-1 rounded-sm shadow-sm">
          <Link href="/" passHref>
            <a>
              <Typography variant="InlineText" color="white">
                Explore Products
              </Typography>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CartOverview />
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
