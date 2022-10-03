import React, { FormEvent, useEffect, useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

const PaymentElementsForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements();

  const [ message, setMessage ] = useState<string | null>(null)
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // stripe js has not yet loaded
    if (!stripe || !elements) {
      return
    }

    setIsLoading(true);

    // complete payment with stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000'
      }
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  }

  // updating payment status based on stripe
  useEffect(() => {
    if(!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe])

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      { isLoading && <div>Loading spinner</div> }
      { !isLoading && <button disabled={!stripe || !elements} >Submit payment</button> }
      { message && <div>{ message }</div> }
    </form>
  )

}

export default PaymentElementsForm;