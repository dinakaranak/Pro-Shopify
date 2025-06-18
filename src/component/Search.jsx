
import React from 'react'
import '../component/search.css'
import Button from '@mui/material/Button'
import { IoSearch } from "react-icons/io5";

const Search = () => {
    return (
        <div>
            <div className='searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative'>
                <input type='text' placeholder='Search for products...' className='ml-5 w-[90%] h-[50px] focus:outline-none 
      bg-inherit p-2 text-[15px]' />
                <Button className='!absolute top-[8px] right-[5px] z-50 !w-[35px] !min-w-[35px] h-[35px]
                 !rounded-full !text-black'>
                    <IoSearch className='text-[#4d4c4c] text-[22px]'/></Button>
            </div>
        </div>
    )
}

export default Search