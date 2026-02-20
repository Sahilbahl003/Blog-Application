import React from 'react'
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";

const Footer = () => {
  return (
    <div className='w-[100vw] h-[250px] bg-black pl-16 pt-4 flex'>
        <div className='w-1/4'>
            <div  className='text-white text-3xl pt-4 pl-4'>Blog App</div>
            <div className='text-white pt-4 pl-4 hover:text-blue-500 flex items-center justify-start'><span className='text-white text-lg'><MdLocalPhone /></span>+91-9817766364</div>
            <div className='text-white pt-4 pl-4 hover:text-blue-500 flex items-center justify-start'><span className='text-white text-lg'><MdOutlineMailOutline /></span>sahilbahl003@gmail.com</div>
        </div>

        <div className='text-white'>
            <div className='text-2xl pt-4 pb-2'>Social Links</div>
            <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg text-pink-400'><FaInstagram /></span>Instagram</div>
            <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg '><FaXTwitter /></span>Twitter</div>
            <div className='flex items-center cursor-pointer'><span className='pr-2 text-lg text-blue-500 '><ImFacebook2  /></span>Facebook</div>
        </div>
    </div>
  )
}

export default Footer