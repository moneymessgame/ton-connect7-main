'use client';

import React, { createContext } from 'react';

import { motion } from 'framer-motion';
import { Orbit } from 'lucide-react';

interface OrbitIconProps {
  className?: string;
}

const OrbitIcon: React.FC<OrbitIconProps> = ({ className }) => {
  return (
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
    >
      <Orbit className={className} />
    </motion.div>
  );
};

export default OrbitIcon;
