import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@components/Navbar';
import CartContextWrapper from '@root/context/cart';
import Footer from '@components/Footer';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-md mx-auto h-vh relative transition-all duration-200">
      <CartContextWrapper>
        <Navbar />
        <Component {...pageProps} />
      </CartContextWrapper>
      <Footer />
    </div>
  );
}

export default appWithTranslation(MyApp);
