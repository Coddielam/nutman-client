import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@components/Navbar';
import CartContextWrapper from '@root/context/cart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-md mx-auto bg-white">
      <CartContextWrapper>
        <Navbar />
        <Component {...pageProps} />
      </CartContextWrapper>
    </div>
  );
}

export default MyApp;
