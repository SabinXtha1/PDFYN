// components/Footer.tsx
'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black text-gray-400 py-6"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <motion.p
          whileHover={{ scale: 1.05 }}
          className="text-sm text-center md:text-left"
        >
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </motion.p>
        
        <div className="flex space-x-6 mt-4 md:mt-0">
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, color: '#ffffff' }}
            className="transition-colors duration-300"
          >
            Twitter
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, color: '#ffffff' }}
            className="transition-colors duration-300"
          >
            GitHub
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, color: '#ffffff' }}
            className="transition-colors duration-300"
          >
            LinkedIn
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}
