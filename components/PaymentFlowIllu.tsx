import React from 'react';
import Typography from './Typography';
import { RiFileList3Line, RiSecurePaymentFill } from 'react-icons/ri';
import { BsCartCheck } from 'react-icons/bs';
import { GrDeliver } from 'react-icons/gr';
import { FaHandsHelping } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { useTranslation } from 'react-i18next';
import {
  useVariantsAnimationContainers,
  baseVariants,
} from '@root/hooks/useVariantsAnimationContainers';

interface IPaymentStepProps {
  id: number;
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
      id: 1,
      title: t('step1.title'),
      desc: t('step1.desc'),
      Illustration: BsCartCheck,
    },
    {
      id: 2,
      title: t('step2.title'),
      desc: t('step2.desc'),
      Illustration: RiFileList3Line,
    },
    {
      id: 3,
      title: t('step3.title'),
      desc: t('step3.desc'),
      Illustration: RiSecurePaymentFill,
    },
    {
      id: 4,
      title: t('step4.title'),
      desc: t('step4.desc'),
      Illustration: GrDeliver,
    },
    {
      id: 5,
      title: t('step5.title'),
      desc: t('step5.desc'),
      Illustration: FaHandsHelping,
    },
  ];

  const [VariantsContainer, VariantContainer] =
    useVariantsAnimationContainers();

  return (
    <VariantsContainer
      className="divide-y divide-platinum"
      variants={{
        ...baseVariants.containerVariants,
        visible: {
          ...baseVariants.containerVariants.visible,
          transition: {
            ...baseVariants.containerVariants.visible.transition,
            delayChildren: 0.2,
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {steps.map((step, index) => {
        return (
          <VariantContainer
            key={`payment-step-${step.id}`}
            viewport={{
              once: true,
            }}
            variants={{
              ...baseVariants.itemVariants,
              hidden: { x: 20, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
              },
            }}
          >
            <PaymentStep key={`payment-step-${index}`} {...step} />
          </VariantContainer>
        );
      })}
    </VariantsContainer>
  );
};

export default PaymentFlowIllu;
