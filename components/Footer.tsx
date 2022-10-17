import React from 'react';
import { MdLocationPin, MdPhoneEnabled, MdMail } from 'react-icons/md';
import Typography from './Typography';
import SocialMediaPlug from './SocialMediaPlug';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'component.footer' });

  return (
    <footer className="mt-8 bg-platinum pt-10 pb-16 px-container-px">
      <ul className="flex flex-col gap-3">
        <li className="flex items-center">
          <MdLocationPin className="mr-2" /> {t('address')}
        </li>
        <li className="flex items-center">
          <MdPhoneEnabled className="mr-2" />
          +852 1234 5678
        </li>
        <li className="flex items-center">
          <MdMail className="mr-2" /> nutman.nutstore@gmail.com
        </li>
      </ul>
      <hr className="my-6 text-[gray]" />
      <SocialMediaPlug />
      <hr className="my-6 text-[gray]" />
      <div className="text-center w-full">
        <Typography variant="Paragraph">
          © 2012-2022, Hing Wo Tong Inc.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
