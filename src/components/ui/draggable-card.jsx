import React from 'react';
import { motion } from 'framer-motion';

export const DraggableCardContainer = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const DraggableCardBody = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      drag
      dragConstraints={false} // Allow dragging in all directions
      whileDrag={{ scale: 1.05, rotate: 5, zIndex: 10 }} // Bring to front on drag
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
};
