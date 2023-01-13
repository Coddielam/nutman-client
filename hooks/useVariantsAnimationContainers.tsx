import { HTMLMotionProps, motion, MotionProps } from 'framer-motion';
import React from 'react';

const sectionVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};
const productCardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    delay: 0.5,
    y: 0,
    opacity: 1,
  },
};

export const baseVariants = {
  containerVariants: sectionVariants,
  itemVariants: productCardVariants,
};

export const useVariantsAnimationContainers = (
  {
    visible = 'whileInView',
  }: {
    visible?: 'whileInView' | 'animate';
    once?: boolean;
  } = { visible: 'whileInView' }
) => {
  const Container = ({
    children,
    visibleOn,
    ...otherProps
  }: HTMLMotionProps<'div'> & { visibleOn?: 'inview' | 'onmount' }) => {
    return (
      <motion.div
        variants={sectionVariants}
        initial={visibleOn === 'onmount' ? undefined : 'hidden'}
        {...{
          [visibleOn
            ? visibleOn === 'onmount'
              ? 'animate'
              : 'whileInView'
            : visible]: 'visible',
        }}
        {...otherProps}
      >
        {children}
      </motion.div>
    );
  };

  const ChildWrapper = ({
    children,
    ...otherProps
  }: HTMLMotionProps<'div'>) => {
    return (
      <motion.div variants={productCardVariants} {...otherProps}>
        {children}
      </motion.div>
    );
  };

  return [Container, ChildWrapper];
};
