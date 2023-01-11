import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ExpandPanel from '@components/ExpandPanel';
import {
  CgMenuRight,
  CgShoppingCart,
  CgSpinner,
  CgChevronDoubleLeft,
} from 'react-icons/cg';
import { IoLanguageSharp } from 'react-icons/io5';
import { CartContext } from '@root/context/cart';
import { useRouter } from 'next/router';
import SocialMediaPlug from './SocialMediaPlug';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const { t } = useTranslation('common', { keyPrefix: 'component.navbar' });
  const { t: baseT } = useTranslation('common');

  const newLocale = router.locale === 'en' ? 'zh-HK' : 'en';

  const onToggleLanguage = () => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  useEffect(() => {
    const handelComplete = () => {
      setPageLoading(false);
    };
    const handelStart = () => {
      setPageLoading(true);
      setShowMenu(false);
    };

    router.events.on('routeChangeComplete', handelComplete);
    router.events.on('routeChangeStart', handelStart);

    return () => {
      router.events.off('hashChangeComplete', handelComplete);
      router.events.off('routeChangeStart', handelStart);
    };
  }, [router.events]);

  const [showMenu, setShowMenu] = useState(false);

  const { cartState, categories } = useContext(CartContext)!;

  return (
    <>
      <nav className="sticky top-0 flex justify-between align-middle w-full px-4 py-2 h-navbar shadow-sm z-50 bg-white">
        <div className="flex gap-2">
          <button
            aria-label="Open navigation panel"
            onClick={() => setShowMenu(true)}
          >
            <CgMenuRight />
          </button>
          <Link href="/">
            <a className="h-[110%] w-20 relative">
              <Image
                src="/nutmanlogo.png"
                layout="fill"
                alt="Nutman Logo"
                objectFit="contain"
                quality="100"
              />
            </a>
          </Link>

          {pageLoading && <CgSpinner className="h-full w-5 animate-spin" />}
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
      {/* left panel */}

      <div
        className={cn(
          'divide-y-[1px] divide-platinum min-w-[250px] fixed top-0 z-50 h-screen py-4 px-8  transition-all duration-500 shadow-md bg-white bg-opacity-95',
          {
            '-translate-x-0': showMenu,
            '-translate-x-full': !showMenu,
            'opacity-0': !showMenu,
            'pointer-events-none': !showMenu,
          }
        )}
      >
        <button
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <CgChevronDoubleLeft className="w-5 h-5 fill-platinum" />
        </button>
        <ExpandPanel title={t('categories')}>
          <div className="flex flex-col divide-y-[1px] divide-platinum">
            {categories.map((category) => {
              return (
                <Link
                  href={`/category/${category.id}`}
                  key={`/category/${category.id}`}
                  passHref
                >
                  <a className="py-3">
                    {i18n.language === 'en'
                      ? category.attributes!.category_name_en
                      : category.attributes!.category_name}
                  </a>
                </Link>
              );
            })}
          </div>
        </ExpandPanel>
        {/* <ExpandPanel title="Terms"></ExpandPanel> */}
        <div className="py-3">
          <SocialMediaPlug />
        </div>
        <div className="py-3">
          <button
            onClick={onToggleLanguage}
            className="flex gap-2 items-center"
          >
            {baseT('locale.' + newLocale)}
            <IoLanguageSharp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
