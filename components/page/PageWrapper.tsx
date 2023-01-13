import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

export const PageWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 15 }}
        // transition={{ delay: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
