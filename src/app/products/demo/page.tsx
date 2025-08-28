

import ColorSelector from '@/components/ProductPage/ColorSelector'
import ImageCarousel from '@/components/ProductPage/ImageCarousel'
import ProductInfo from '@/components/ProductPage/ProductInfo'
import SizeSelector from '@/components/ProductPage/SizeSelector'
import React from 'react'

const page = () => {
  return (
    <div className='py-15'>
        <ImageCarousel/>
        <ProductInfo/>
        <SizeSelector/>
        <ColorSelector/>

    </div>
  )
}

export default page