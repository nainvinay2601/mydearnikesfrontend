"use client"

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

const Colors = ["White", "Black", "Pink"]

const ColorSelector = () => {
    const [selectedColor, setSelectedColor] = useState(""); 
  return (
    < div className='mt-4 px-[8px] flex items-center gap-3 '>
    <label htmlFor="color-select" className='text-xs'>Colors</label>
    <div className="selector relative inline-block">

    <select name="colorSelect" id="color-select" onChange={(e)=> setSelectedColor(e.target.value)} className=' text-xs border-[0.25px]  border-[#e5e5e5] border-opacity-25  w-50  p-[8px] focus:outline-0 appearance-none rounded-md relative'>
        { 
            Colors.map((color,idx)=>(
                <option key={idx} value={color.toLowerCase()} className='text-[2px]'>
                    {color}
                </option>
            ))
        }
    </select>
     <ChevronDown
        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
        size={12} // controls size of the chevron
      />
        </div>
        
    
    </div>
  )
}

export default ColorSelector