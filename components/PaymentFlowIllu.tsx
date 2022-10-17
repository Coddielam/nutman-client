import React from 'react';
import Typography from './Typography';
import { RiFileList3Line, RiSecurePaymentFill } from 'react-icons/ri';
import { BsCartCheck } from 'react-icons/bs';
import { GrDeliver } from 'react-icons/gr';
import { FaHandsHelping } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { useTranslation } from 'react-i18next';

interface IPaymentStepProps {
  Illustration: IconType;
  title: string;
  desc: string;
}
const PaymentStep: React.FC<IPaymentStepProps> = ({
  title,
  desc,
  Illustration,
}) => {
  return (
    <div className="flex gap-4 py-4">
      <div className="w-12">
        <Illustration className="w-12 h-12" />
      </div>
      <div>
        <Typography variant="Subtitle">{title}</Typography>
        <Typography variant="Paragraph">{desc}</Typography>
      </div>
    </div>
  );
};

const PaymentFlowIllu = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'component.paymentFlow',
  });
  const steps: IPaymentStepProps[] = [
    {
      title: t('step1.title'),
      desc: t('step1.desc'),
      Illustration: BsCartCheck,
    },
    {
      title: t('step2.title'),
      desc: t('step2.desc'),
      Illustration: RiFileList3Line,
    },
    {
      title: t('step3.title'),
      desc: t('step3.desc'),
      Illustration: RiSecurePaymentFill,
    },
    {
      title: t('step4.title'),
      desc: t('step4.desc'),
      Illustration: GrDeliver,
    },
    {
      title: t('step5.title'),
      desc: t('step5.desc'),
      Illustration: FaHandsHelping,
    },
  ];

  return (
    <div className="divide-y divide-platinum">
      {steps.map((step, index) => {
        return <PaymentStep key={`payment-step-${index}`} {...step} />;
      })}
    </div>
  );
};

export default PaymentFlowIllu;
