"use client";

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface HelpBarProps {
  onClose: () => void;
}

const HelpBar = ({ onClose }: HelpBarProps) => {
  const router = useRouter();
  const { isAuthenticated, customer, logout } = useAuthStore();

  const handleLinkClick = () => {
    onClose();
  };

  const handleInstagramClick = () => {
    onClose();
  };

  const handleLoginClick = () => {
    onClose();
    router.push('/login');
  };

  const handleAccountClick = () => {
    onClose();
    router.push('/account');
  };

  const handleLogoutClick = async () => {
    await logout();
    onClose();
    router.push('/');
  };

  // Button variants for staggered animation - properly typed
  const buttonVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <motion.nav 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex bg-white items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad] rounded-b-3xl"
      >
        {/* Help Button */}
        <motion.div custom={0} variants={buttonVariants}>
          <Button
            variant="outline"
            className="rounded-full px-3 text-sm"
            asChild
            onClick={handleLinkClick}
          >
            <Link href="/contact">
              Help
            </Link>
          </Button>
        </motion.div>

        {/* Instagram Button */}
        <motion.div custom={1} variants={buttonVariants}>
          <Button
            variant="outline"
            className="rounded-full px-3 text-sm"
            onClick={handleInstagramClick}
          >
            <a
              href="https://instagram.com/shop.mydearnikes"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center justify-center"
            >
              Instagram
            </a>
          </Button>
        </motion.div>

        {/* Conditional Auth Buttons */}
        {isAuthenticated ? (
          <>
            {/* Account Button */}
            <motion.div custom={2} variants={buttonVariants}>
              <Button
                variant="outline"
                className="rounded-full px-3 text-sm bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors"
                onClick={handleAccountClick}
              >
                {customer?.firstName || 'Account'}
              </Button>
            </motion.div>

            {/* Logout Button */}
            <motion.div 
              custom={3} 
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="rounded-full px-3 text-sm text-red-600 border-red-200 hover:bg-red-50 transition-colors"
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            {/* Login Button */}
            <motion.div custom={2} variants={buttonVariants}>
              <Button
                variant="outline"
                className="rounded-full px-3 text-sm"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </motion.div>

            {/* Sign Up Button */}
            <motion.div 
              custom={3} 
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="rounded-full px-3 text-sm bg-black text-white hover:bg-gray-800 transition-colors"
                onClick={() => {
                  onClose();
                  router.push('/signup');
                }}
              >
                Sign Up
              </Button>
            </motion.div>
          </>
        )}
      </motion.nav>
    </>
  );
};

export default HelpBar;