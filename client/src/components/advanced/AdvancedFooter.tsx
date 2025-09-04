import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function AdvancedFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      className="relative py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(5, 5, 5, 1))',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 41, 0, 0.03) 0%, rgba(88, 29, 255, 0.02) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center">
          {/* Logo/Brand */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-3xl font-bold mb-2"
              style={{
                background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              SoleGrithm
            </h3>
            <p className="text-gray-400">
              The Future of Sneaker Discovery
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="py-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm">
              © 2024 SoleGrithm. Powered by AI and passion for sneakers.
            </p>
          </motion.div>

          {/* Scroll to top button */}
          <motion.button
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full border border-white/20 backdrop-blur-xl flex items-center justify-center hover:border-orange-500/50 transition-colors z-50"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
            }}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
}