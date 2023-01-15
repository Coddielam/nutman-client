import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@components/Navbar';
import CartContextWrapper from '@root/context/cart';
import Footer from '@components/Footer';
import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';
import { PageWrapper } from '@components/page/PageWrapper';
import { useRouter } from 'next/router';
import { Button } from '@components/atoms/Button';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-P19MQG0QTE"
        strategy="afterInteractive"
      />

      <Script strategy="afterInteractive" id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-P19MQG0QTE');`}
      </Script>

      <PageWrapper>
        <div className="max-w-md mx-auto h-vh relative transition-all duration-200 bg-offwhite">
          <CartContextWrapper>
            <Navbar />
            <Component {...pageProps} />
          </CartContextWrapper>
          <Footer />
        </div>
      </PageWrapper>
    </>
  );
}

export default appWithTranslation(MyApp);
