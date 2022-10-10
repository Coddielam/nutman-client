import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CgMenuRight, CgShoppingCart } from 'react-icons/cg';
import { CartContext } from '@root/context/cart';

const Navbar: React.FC = () => {
  const { cartState } = useContext(CartContext)!;

  return (
    <nav className="sticky top-0 flex justify-between align-middle w-full px-4 py-2 h-navbar shadow-sm z-50 bg-white">
      <div className="flex gap-2">
        <button aria-label="Open navigation panel">
          <CgMenuRight />
        </button>
        <Link href="/">
          <div className="h-[120%] w-20 relative">
            <Image
              src="/nutmanlogo.png"
              layout="fill"
              alt="Nutman Logo"
              objectFit="contain"
              quality="100"
            />
          </div>
        </Link>
      </div>
      <Link href="/checkout" passHref>
        <a className="flex">
          <CgShoppingCart className="" />
          <span className="bg-blue text-white shadow-sm rounded-full text-xs top-1 relative -left-1 h-4 w-4 flex items-center justify-center">
            {cartState.length}
          </span>
        </a>
      </Link>
    </nav>
  );
};

export default Navbar;
