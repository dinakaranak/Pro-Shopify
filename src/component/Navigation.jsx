import Button from '@mui/material/Button'
import React, { useState } from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { GoRocket } from "react-icons/go";
import Category from './Category';
import '../component/search.css'

const Navigation = () => {

    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

    const Categories =() =>{
        setIsOpenCatPanel(true);
    };

  return (
    <>
    <div>
      <nav className='py-2'>
        <div className='container flex items-center justify-end gap-8'>
            <div className='col_1 w-[20%]'>
                <Button className='!text-black gap-2 font-[500] text-[12px] w-full' onClick={Categories}>
                    <RiMenu2Fill className='text-[18px]' />Explore Our Collections
                    <LiaAngleDownSolid className='text-[13px] ml-auto font-bold ' /></Button>
            </div>
            <div className='col_2 w-[62%]'>
                <ul className='flex items-center gap-2 nav'>
                    <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                        <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[#7b0af4]'>Home</Button></Link>
                    </li>
                     <li className='list-none relative group'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[#7b0af4]'>Fashion</Button></Link>

                        <div className='submenu absolute  top-[120%] left-[0%] min-w-[200px] z-10 bg-white
                        shadow-md opacity-0  transition-all'>
                            <ul>
                                <li className='list-none w-full relative group/submenu'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)]  w-full !text-left
                                     !justify-start !rounded-none'>Men</Button>


                                     <div className='submenu absolute top-[0%] left-[100%] min-w-[200px] bg-white
                        shadow-md opacity-0  transition-all'>
                            <ul>
                                <li className='list-none w-full'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)]  w-full !text-left
                                     !justify-start !rounded-none'>Men</Button>
                                     </Link>
                                </li>
                                  <li className='list-none w-full'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)]  w-full !text-left 
                                    !justify-start !rounded-none'>Women</Button>
                                    </Link>
                                </li>
                                  <li className='list-none w-full'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left 
                                    !justify-start !rounded-none'>Kids</Button>
                                    </Link>
                                </li>
                                  <li className='list-none w-full'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left 
                                    !justify-start !rounded-none'>Men</Button>
                                    </Link>
                                </li>
                                  <li className='list-none w-full'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left 
                                    !justify-start !rounded-none'>Men</Button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                                     </Link>
                                </li>
                                  <li className='list-none w-full'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)]  w-full !text-left 
                                    !justify-start !rounded-none'>Women</Button>
                                    </Link>
                                </li>
                                  <li className='list-none w-full'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left 
                                    !justify-start !rounded-none'>Kids</Button>
                                    </Link>
                                </li>
                                  <li className='list-none w-full'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left 
                                    !justify-start !rounded-none'>Men</Button>
                                    </Link>
                                </li>
                                  <li className='list-none w-full'>
                                    <Link to='/' className='w-full'>
                                    <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left 
                                    !justify-start !rounded-none'>Men</Button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[#7b0af4]'>Electronics</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[#7b0af4]'>Bags</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[#7b0af4]'>Footwear</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[#7b0af4]'>Beauty</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[#7b0af4]'>Wellness</Button></Link>
                    </li>
                     <li className='list-none'>
                        <Link to='/' className='link transition text-[14px] font-[500]'>
                         <Button  className='link transition !font-[500] !text-[rgba(0,0,0,0.8)]
                        hover:!text-[#7b0af4]'>Jewellery</Button></Link>
                    </li>
                </ul>

            </div>
            <div className='col_3 w-[18%]'>
                <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0'> 
                    <GoRocket className='text-[16px]'/>Free Home Delivery</p>
            </div>

        </div>
      </nav>
      <Category Categories={setIsOpenCatPanel} isOpenCatPanel={isOpenCatPanel}/>
    </div>
    </>
  )
}

export default Navigation