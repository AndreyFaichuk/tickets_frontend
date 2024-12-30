import React, { FC } from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';

type AminationWrapperProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
};

export const AminationWrapper: FC<AminationWrapperProps> = ({
  children,
  ...rest
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...rest}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
