import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ icon: Icon, title, description, actionButton }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center w-full min-h-[40vh]">
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="text-toy-primary mb-6 relative"
      >
        <div className="absolute inset-0 bg-toy-primary/10 blur-2xl rounded-full scale-150 -z-10"></div>
        {Icon && <Icon size={100} className="drop-shadow-md text-toy-primary" />}
      </motion.div>
      <h2 className="text-3xl font-heading font-bold text-slate-800 mb-3">{title}</h2>
      <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">{description}</p>
      {actionButton && <div className="mt-2">{actionButton}</div>}
    </div>
  );
};

export default EmptyState;
