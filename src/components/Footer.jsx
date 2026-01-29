import React from 'react'

export default function Footer() {
  return (
    <div className=' bg-amber-200 pt-10 text-amber-700 font-bold '>
      <div className='flex flex-row justify-evenly hover:*:underline transition ease-in'>
        <div className='flex flex-col'>
        <a href="">Home</a>
        <a href="">About Us</a>

        </div>

        <div className='flex flex-col'>
            <a href="">Career</a>
            <a href="">Contact Us</a>
        </div>
      </div>

      <div className='flex mt-2 justify-end pr-5'>
        <p> &copy; 2026 Luxora. All rights reserved </p>
      </div>


    </div>
  )
}
