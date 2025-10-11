

// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import React from 'react'

// const HelpBar = () => {
//   return (
//     <>
//      <nav className="flex bg-white items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad] rounded-b-3xl">
//             <Button variant="outline" className="rounded-full px-3 text-sm" asChild>
//               <Link href="/contact">
//                 Help
//               </Link>
//             </Button>
//             <Button variant="outline" className="rounded-full px-3 text-sm" asChild>
//               <a 
//                 href="https://instagram.com/shop.mydearnikes" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//               >
//                 Instagram
//               </a>
//             </Button>
//             <Button variant="outline" className="rounded-full px-3 text-sm">
//               Login
//             </Button>
//           </nav>
//     </>
//   )
// }

// export default HelpBar

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface HelpBarProps {
  onClose: () => void;
}

const HelpBar = ({ onClose }: HelpBarProps) => {
  
  const handleLinkClick = () => {
    onClose();
  };

  const handleInstagramClick = () => {
    onClose();
    // Instagram link will open in new tab
  };

  const handleLoginClick = () => {
    onClose();
    // Add your login logic here
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
            
            <Button 
              variant="outline" 
              className="rounded-full px-3 text-sm"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </nav>
    </>
  )
}

export default HelpBar