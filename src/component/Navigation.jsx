import Button from '@mui/material/Button'
import React from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { GoRocket } from "react-icons/go";

const Navigation = () => {
  return (
    <div>
      <nav className='py-2'>
        <div className='container flex items-center justify-end gap-8'>
            <div className='col_1 w-[25%]'>
                <Button className='!text-black gap-2 font-[500] text-[12px] w-full'>
                    <RiMenu2Fill className='text-[18px]' />Explore Our Collections
                    <LiaAngleDownSolid className='text-[13px] ml-auto font-bold' /></Button>
            </div>
            <div className='col_2 w-[60%]'>
                <ul className='flex items-center gap-2'>
                    <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                        <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.7)]
                        hover:!text-[#7b0af4]'>Home</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.7)]
                        hover:!text-[#7b0af4]'>Fashion</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.7)]
                        hover:!text-[#7b0af4]'>Electronics</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.7)]
                        hover:!text-[#7b0af4]'>Bags</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.7)]
                        hover:!text-[#7b0af4]'>Footwear</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.7)]
                        hover:!text-[#7b0af4]'>Beauty</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.7)]
                        hover:!text-[#7b0af4]'>Wellness</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.7)]
                        hover:!text-[#7b0af4]'>Jewellery</Button></Link>
                    </li>
                </ul>

            </div>
            <div className='col_3 w-[15%]'>
                <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0'> 
                    <GoRocket className='text-[16px]'/>Free Home Delivery</p>
            </div>

        </div>
      </nav>
    </div>
  )
}

export default Navigation