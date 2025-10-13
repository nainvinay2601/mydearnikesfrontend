

// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import React from 'react'

// interface HelpBarProps {
//   onClose: () => void;
// }

// const HelpBar = ({ onClose }: HelpBarProps) => {
  
//   const handleLinkClick = () => {
//     onClose();
//   };

//   const handleInstagramClick = () => {
//     onClose();
//     // Instagram link will open in new tab
//   };

//   const handleLoginClick = () => {
//     onClose();
//     // Add your login logic here
//   };

//   return (
//     <>
//      <nav className="flex bg-white items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad] rounded-b-3xl">
//             <Button 
//               variant="outline" 
//               className="rounded-full px-3 text-sm" 
//               asChild
//               onClick={handleLinkClick}
//             >
//               <Link href="/contact">
//                 Help
//               </Link>
//             </Button>
            
//             <Button 
//               variant="outline" 
//               className="rounded-full px-3 text-sm" 
//               onClick={handleInstagramClick}
//             >
//               <a 
//                 href="https://instagram.com/shop.mydearnikes" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="w-full h-full flex items-center justify-center"
//               >
//                 Instagram
//               </a>
//             </Button>
            
//             <Button 
//               variant="outline" 
//               className="rounded-full px-3 text-sm"
//               onClick={handleLoginClick}
//             >
//               Login
//             </Button>
//           </nav>
//     </>
//   )
// }

// export default HelpBar


// components/Homepage/Navbar/NavSections/helpBar/HelpBar.tsx - REPLACE YOUR FILE

"use client";

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore'; // NEW IMPORT
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // NEW IMPORT
import React from 'react';

interface HelpBarProps {
  onClose: () => void;
}

const HelpBar = ({ onClose }: HelpBarProps) => {
  const router = useRouter();
  const { isAuthenticated, customer, logout } = useAuthStore(); // NEW

  const handleLinkClick = () => {
    onClose();
  };

  const handleInstagramClick = () => {
    onClose();
    // Instagram link will open in new tab
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

  return (
    <>
      <nav className="flex bg-white items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad] rounded-b-3xl">
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

        {/* NEW: Conditional Auth Buttons */}
        {isAuthenticated ? (
          <>
            <Button
              variant="outline"
              className="rounded-full px-3 text-sm bg-blue-50 border-blue-200"
              onClick={handleAccountClick}
            >
              {customer?.firstName || 'Account'}
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-3 text-sm text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="rounded-full px-3 text-sm"
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-3 text-sm bg-black text-white hover:bg-gray-800"
              onClick={() => {
                onClose();
                router.push('/signup');
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </nav>
    </>
  );
};

export default HelpBar;