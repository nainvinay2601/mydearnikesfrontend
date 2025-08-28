import React from 'react'

const ProductInfo = () => {
  return (
    < >
        <div className='flex justify-between items-center px-[8px]  py-2'>
        <div className="productName capitalize font-medium text-md ">PC Race Master</div>
        <div className="productPrice text-sm">₹1299</div>
        </div>
        <div className="description text-xs px-[8px] py-2 ">
            <p>100% Cotton & 250 GSM</p>
            <p>Street Ready Look</p>
        </div>
      
    </>
  )
}

export default ProductInfo