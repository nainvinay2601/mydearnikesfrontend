import React from 'react'

const Header = () => {
  return (
    <header className='flex justify-between items-center h-20 p-4'>

      {/* Shop Nav */}
      <div className="shopNav">
        <nav >
          <ul className='flex gap-5 '>
            <li>
              Shop
            </li>
            <li>
              Shop
            </li>
            <li>
              Shop
            </li>
          </ul>
        </nav>
      </div>
      {/* Logo  */}
      <div className="navLogo">
        Logo
      </div>
      {/* Actions */}
      <div className="sideActions">
          <nav>
          <ul className='flex gap-5'>
            <li>
              Shop
            </li>
            <li>
              Shop
            </li>
            <li>
              Shop
            </li>
          </ul>
        </nav>
      </div>

    </header>
  )
}

export default Header