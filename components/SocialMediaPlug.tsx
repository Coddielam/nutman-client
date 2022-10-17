import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import Typography from '@components/Typography';
import { useTranslation } from 'react-i18next';

const SocialMediaPlug = () => {
  const { t } = useTranslation('common', { keyPrefix: 'component.footer' });
  return (
    <>
      <Typography variant="Paragraph">{t('followUsOnSocialMedia')}</Typography>
      <div className="flex gap-3 my-1">
        <a href="https://www.instagram.com/nutman.hk">
          <AiFillInstagram className="h-7 w-7" />
        </a>
      </div>
    </>
  );
};

export default SocialMediaPlug;
