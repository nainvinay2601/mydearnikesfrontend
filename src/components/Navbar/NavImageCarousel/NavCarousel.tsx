import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const NavCarousel = () => {
  return (
    <div className="px-[8px] py-3 flex item-center gap-2 overflow-x-auto scrollbar-hide border-b-[0.5px] border-[#aeadad]">
                <div className="border-[0.5px] border-[#aeadad] rounded-xl bg-[#f2f2f2] w-[240px] h-[280px] flex flex-col items-center justify-center ">
                  <div className="w-[220px] h-[220px] relative">
                    <Image
                      src={"/images/MDNPink.webp"}
                      alt="test Image"
                      fill
                      objectFit="cover"
                      className="  "
                    />
                  </div>

                  <Button variant={"outline"} className="rounded-full">
                    Baby Tees
                  </Button>
                </div>
                <div className="border-[0.5px] border-[#aeadad] rounded-xl bg-[#f2f2f2] w-[240px] h-[280px] flex flex-col items-center justify-center ">
                  <div className="w-[220px] h-[220px] relative">
                    <Image
                      src={"/images/MDNPink.webp"}
                      alt="test Image"
                      fill
                      objectFit="cover"
                      className="  "
                    />
                  </div>

                  <Button variant={"outline"} className="rounded-full">
                    Baby Tees
                  </Button>
                </div>
                <div className="border-[0.5px] border-[#aeadad] rounded-xl bg-[#f2f2f2] w-[240px] h-[280px] flex flex-col items-center justify-center ">
                  <div className="w-[220px] h-[220px] relative">
                    <Image
                      src={"/images/MDNPink.webp"}
                      alt="test Image"
                      fill
                      objectFit="cover"
                      className="  "
                    />
                  </div>

                  <Button variant={"outline"} className="rounded-full">
                    Baby Tees
                  </Button>
                </div>
              </div>
  )
}

export default NavCarousel