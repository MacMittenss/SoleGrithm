import React from 'react';
import { motion } from 'framer-motion';

export function SkipToContent() {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      initial={{ y: -100, opacity: 0 }}
      whileFocus={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      Skip to main content
    </motion.a>
  );
}

export function SkipLinks() {
  const links = [
    { href: "#main-content", text: "Skip to main content" },
    { href: "#navigation", text: "Skip to navigation" },
    { href: "#footer", text: "Skip to footer" }
  ];

  return (
    <div className="sr-only focus-within:not-sr-only fixed top-4 left-4 z-50 space-y-2">
      {links.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          className="block bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          initial={{ y: -100, opacity: 0 }}
          whileFocus={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {link.text}
        </motion.a>
      ))}
    </div>
  );
}