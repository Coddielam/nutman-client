import { HTMLMotionProps, motion } from 'framer-motion';

export const Button = ({
  children,
  ...otherProps
}: HTMLMotionProps<'button'>) => {
  return (
    <motion.button whileTap={{ scale: 0.95 }} {...otherProps}>
      {children}
    </motion.button>
  );
};
