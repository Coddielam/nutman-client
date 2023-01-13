import CartOverview from '@components/CartOverview';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentIntent } from '@stripe/stripe-js';
import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import { useContext, useEffect, useMemo, useState } from 'react';
import PaymentElementsForm from '@components/PaymentElementsForm';
import getStripe from '@root/utils/getStripe';
import { CartContext, ICartProduct } from '@root/context/cart';
import Typography from '@components/Typography';
import Link from 'next/link';
import StyledInput from '@components/StyledInput';
import Stripe from 'stripe';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { DELIVERY } from '@root/config/constants';
import Head from 'next/head';
import { PageWrapper } from '@components/page/PageWrapper';
import { Button } from '@components/atoms/Button';

const CheckoutPage: NextPage = () => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'checkout' });
  const { cartState } = useContext(CartContext)!;

  /* collecting contact information of the customer */
  const contactInfoInitialState = {
    customer_name: '',
    receipt_email: '',
    phone_number: '',
    hasError: false,
  };

  const [contactInfo, setContactInfo] = useState<{
    customer_name: string;
    receipt_email: string;
    phone_number: string;
    hasError: boolean;
  }>(contactInfoInitialState);

  const [deliveryInfo, setDeliveryInfo] = useState<{
    deliveryMethod: undefined | 'FACE-TO-FACE' | 'DELIVERY';
    address: Stripe.AddressParam;
    carrier: string;
  }>({
    deliveryMethod: undefined,
    address: {
      city: '',
      country: 'Hong Kong',
      line1: '',
      line2: '',
      postal_code: '00000',
      state: '',
    },
    carrier: 'SF',
  });

  /* generating total price and description for the payment intent */
  /* total does not include shipping */
  const cartTotalPrice = useMemo(() => {
    return cartState.reduce((total, item) => {
      return total + item.price;
    }, 0);
  }, [cartState]);

  const orderDescription = useMemo<string>(
    () =>
      cartState
        .reduce<Array<Omit<ICartProduct, 'imgUrl'> & { quantity: number }>>(
          (list, item) => {
            const existingItem = list.find((e) => e.id === item.id);

            if (existingItem) {
              return list.map((e) =>
                e.id === item.id ? { ...e, quantity: e.quantity + 1 } : e
              );
            }
            const { imgUrl, ...otherProps } = item;
            return [...list, { ...otherProps, quantity: 1 }];
          },
          []
        )
        .reduce((desc, subItem) => {
          return (
            desc +
            `${
              i18n.language === 'en'
                ? subItem.product_name_en
                : subItem.product_name_cn
            }@$${subItem.price} x ${subItem.quantity} = $${
              subItem.price * subItem.quantity
            };\n`
          );
        }, ''),
    [cartState, i18n.language]
  );

  const [confirmedContactInfo, setConfirmedContactInfo] = useState(false);

  const handleConfirm = () => {
    const contactInfoValid = (() => {
      const { hasError, ...contactInfoFields } = contactInfo;
      return Object.values(contactInfoFields).every((v) => v);
    })();

    const deliveryInfoValid = (() => {
      if (deliveryInfo.deliveryMethod === 'FACE-TO-FACE') {
        return true;
      }
      return (
        Object.values(deliveryInfo).every((v) => v) &&
        Object.values(deliveryInfo.address).every((v) => v)
      );
    })();

    if (contactInfoValid && deliveryInfoValid) {
      setContactInfo((state) => ({
        ...state,
        hasError: false,
      }));
      setConfirmedContactInfo(true);
    } else {
      setContactInfo((state) => ({
        ...state,
        hasError: true,
      }));
    }
  };

  const handleEdit = () => {
    setConfirmedContactInfo(false);
  };

  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );

  /* When contact info is confirmed and ready, create payment intent */
  useEffect(() => {
    if (cartTotalPrice > 0 && confirmedContactInfo) {
      // updating payment total and description based on delivery preference
      const deliveryCost =
        deliveryInfo.deliveryMethod === 'DELIVERY' && cartTotalPrice < 500
          ? DELIVERY.SHIPPING_COST
          : 0;

      const finalDescription = `${orderDescription}\n${
        deliveryCost > 0
          ? `+ ${t('addingShipping')}: $${DELIVERY.SHIPPING_COST};\n`
          : ''
      }\n${t('orderTotal')}: $${cartTotalPrice + deliveryCost};`;

      axios
        .post('/api/payment_intents', {
          amount: cartTotalPrice * 100, // minimum 0.78
          receipt_email: contactInfo.receipt_email,
          metadata: {
            customer_phone: contactInfo.phone_number,
            delivery_method: deliveryInfo.deliveryMethod,
          },
          description: finalDescription,
          shipping:
            deliveryInfo.deliveryMethod === 'DELIVERY'
              ? {
                  address: deliveryInfo.address,
                  carrier: deliveryInfo.carrier,
                  name: contactInfo.customer_name,
                  phone: contactInfo.phone_number,
                }
              : undefined,
        })
        .then((res) => {
          setPaymentIntent(res.data);
        });
    }
  }, [
    cartTotalPrice,
    confirmedContactInfo,
    contactInfo,
    deliveryInfo,
    orderDescription,
    t,
  ]);

  // if there's nothing in the cart, return here
  if (cartTotalPrice <= 0) {
    return (
      <PageWrapper>
        <Head>
          <title>{t('head.title')}</title>
        </Head>
        <main className="my-32 w-full flex flex-col gap-4 justify-center items-center">
          <Typography variant="PageTitle">{t('cartIsEmpty')}</Typography>
          <div className="bg-blue w-fit px-4 py-1 rounded-sm shadow-sm">
            <Link href="/" passHref>
              <a>
                <Typography variant="InlineText" color="white">
                  {t('exploreProducts')}
                </Typography>
              </a>
            </Link>
          </div>
        </main>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Head>
        <title>{t('head.title')}</title>
      </Head>
      <main className="px-container-px divide-solid divide-platinum divide-y-[1px]">
        <CartOverview />
        {deliveryInfo.deliveryMethod === 'DELIVERY' && cartTotalPrice < 500 && (
          <div className="!border-none flex flex-col items-end gap-2 mb-3">
            <p className="text-orange">
              {t('addingShipping')} ${DELIVERY.SHIPPING_COST}
              <br />
            </p>
            <p className="prose font-bold underline underline-offset-2 text-lg">
              {t('adjustedOrderTotal')} $
              {cartTotalPrice + DELIVERY.SHIPPING_COST}
            </p>
          </div>
        )}

        {/* collect phone number and email */}
        <div className="py-3">
          <Typography variant="Subtitle">{t('contactAndDelivery')}</Typography>
          <div className="grid grid-cols-2 gap-2 py-3 pt-5">
            {/* customer name */}
            <div>
              <label htmlFor={'name'}>{t('name')}</label>
              <StyledInput
                type="text"
                id="name"
                placeholder={t('namePlaceholder')}
                value={contactInfo.customer_name}
                disabled={confirmedContactInfo}
                onChange={(e) => {
                  setContactInfo((state) => ({
                    ...state,
                    customer_name: e.target.value,
                  }));
                }}
              />
            </div>
            {/* email address */}
            <div>
              <label htmlFor="email">{t('email')}</label>
              <StyledInput
                type="email"
                id="email"
                placeholder={t('emailPlaceholder')}
                value={contactInfo.receipt_email}
                disabled={confirmedContactInfo}
                onChange={(e) => {
                  setContactInfo((state) => ({
                    ...state,
                    receipt_email: e.target.value,
                  }));
                }}
              />
            </div>
            {/* telephone number */}
            <div>
              <label htmlFor="tel">{t('phoneNumber')}</label>
              <StyledInput
                type="tel"
                id="tel"
                placeholder={t('phoneNumberPlaceholder')}
                value={contactInfo.phone_number}
                disabled={confirmedContactInfo}
                onChange={(e) =>
                  setContactInfo((state) => ({
                    ...state,
                    phone_number: e.target.value,
                  }))
                }
              />
            </div>
            {/* delivery options */}
            <div className="inline-block">
              <label htmlFor="delivery_option">{t('deliveryPreference')}</label>
              <div className="p-2">
                <select
                  className="max-w-full"
                  id="delivery_option"
                  name="delivery_option"
                  value={deliveryInfo.deliveryMethod}
                  disabled={confirmedContactInfo}
                  onChange={(e) => {
                    setDeliveryInfo((state) => {
                      return {
                        ...state,
                        deliveryMethod: e.target.value as
                          | 'FACE-TO-FACE'
                          | 'DELIVERY',
                      };
                    });
                  }}
                >
                  <option value={undefined}>{t('selectAMethod')}</option>
                  <option value="FACE-TO-FACE">{t('inPerson')}</option>
                  <option value="DELIVERY">{t('delivery')}</option>
                </select>
              </div>
            </div>
            {/* fill out address info */}
            {deliveryInfo.deliveryMethod === 'DELIVERY' && (
              <>
                {cartTotalPrice < 500 && (
                  <div className="col-span-2">
                    <p className="prose text-orange text-sm">
                      {t('deliveryCostWarningMessage')}
                    </p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="prose text-green text-sm">
                    {t('deliveryMethodReminder')}
                  </p>
                </div>
                {/* city name */}
                <div>
                  <label htmlFor="city">{t('city')}</label>
                  <StyledInput
                    type="text"
                    id="city"
                    placeholder={t('cityPlaceholder')}
                    value={deliveryInfo.address.city}
                    disabled={confirmedContactInfo}
                    onChange={(e) => {
                      setDeliveryInfo((state) => ({
                        ...state,
                        address: {
                          ...state.address,
                          city: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
                {/* country name */}
                <div>
                  <label htmlFor="country">{t('country')}</label>
                  <StyledInput
                    type="text"
                    id="country"
                    placeholder="Hong Kong"
                    value={deliveryInfo.address.country}
                    disabled={true}
                    onChange={(e) => {
                      setDeliveryInfo((state) => ({
                        ...state,
                        address: {
                          ...state.address,
                          country: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
                {/* line1 name */}
                <div className="col-span-2 flex flex-col">
                  <label htmlFor="line1">{t('line1')}</label>
                  <StyledInput
                    type="text"
                    id="line1"
                    placeholder={t('line1Placeholder')}
                    value={deliveryInfo.address.line1}
                    disabled={confirmedContactInfo}
                    onChange={(e) => {
                      setDeliveryInfo((state) => ({
                        ...state,
                        address: {
                          ...state.address,
                          line1: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
                {/* line2 name */}
                <div className="col-span-2 flex flex-col">
                  <label htmlFor="line2">{t('line2')}</label>
                  <StyledInput
                    type="text"
                    id="line2"
                    placeholder={t('line2Placeholder')}
                    value={deliveryInfo.address.line2}
                    disabled={confirmedContactInfo}
                    onChange={(e) => {
                      setDeliveryInfo((state) => ({
                        ...state,
                        address: {
                          ...state.address,
                          line2: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
                {/* state name */}
                <div>
                  <label htmlFor="state">{t('region')}</label>
                  <StyledInput
                    type="text"
                    id="state"
                    placeholder={t('regionPlaceholder')}
                    value={deliveryInfo.address.state}
                    disabled={confirmedContactInfo}
                    onChange={(e) => {
                      setDeliveryInfo((state) => ({
                        ...state,
                        address: {
                          ...state.address,
                          state: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </>
            )}
            {/* end of form */}
          </div>
          {/* face-to-face delivery instruction */}
          {deliveryInfo.deliveryMethod === 'FACE-TO-FACE' && (
            <Typography variant="Paragraph" color="green">
              {t('inPersonInstruction')}
            </Typography>
          )}
          {contactInfo.hasError && (
            <p className="text-red text-sm">{t('errorMsg')}</p>
          )}
          <Button
            onClick={confirmedContactInfo ? handleEdit : handleConfirm}
            className="bg-blue px-4 py-2 my-3 rounded-md mx-auto text-white shadow-sm disabled:bg-platinum"
          >
            {confirmedContactInfo ? t('edit') : t('confirm')}
          </Button>
        </div>

        {/* stripe payment elements context provider */}
        <div className="py-3">
          {confirmedContactInfo &&
            paymentIntent &&
            paymentIntent.client_secret && (
              <Elements
                key={paymentIntent.client_secret}
                stripe={getStripe()}
                options={{
                  clientSecret: paymentIntent.client_secret,
                  appearance: {
                    theme: 'stripe',
                  },
                  locale: i18n.language === 'en' ? 'en' : 'zh-HK',
                }}
              >
                <PaymentElementsForm />
              </Elements>
            )}
        </div>
      </main>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default CheckoutPage;
