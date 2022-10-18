import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@components/Navbar';
import CartContextWrapper from '@root/context/cart';
import Footer from '@components/Footer';
import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3EKJ4KL0EP"
        strategy="afterInteractive"
      />

      <Script strategy="afterInteractive" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3EKJ4KL0EP');`}
      </Script>

      <div className="max-w-md mx-auto h-vh relative transition-all duration-200">
        <CartContextWrapper>
          <Navbar />
          <Component {...pageProps} />
        </CartContextWrapper>
        <Footer />
      </div>
    </>
  );
}

export default appWithTranslation(MyApp);
