import { Button } from '@/components/ui/button'
import React from 'react'

const HelpBar = () => {
  return (
    <>
     <nav className="flex bg-white items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad] rounded-b-3xl">
            <Button variant="outline" className="rounded-full px-3 text-sm">
              Help
            </Button>
            <Button variant="outline" className="rounded-full px-3 text-sm">
              Login
            </Button>
          </nav>
    </>
  )
}

export default HelpBar