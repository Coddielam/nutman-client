import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CgMenuRight, CgShoppingCart } from 'react-icons/cg';

const Navbar: React.FC = () => {
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
      <Link href="/cart" passHref>
        <a className="flex items-center">
          <CgShoppingCart />
        </a>
      </Link>
    </nav>
  );
};

export default Navbar;
