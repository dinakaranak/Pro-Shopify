import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Search from './Search';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoGitCompareOutline } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
import Tooltip from '@mui/material/Tooltip';
import Api from '../Services/Api';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -2,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 5px',
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const [cartCounted, setCartCounted] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await Api.get('/cart');
        const count = response.data.items?.reduce((total, item) => total + item.quantity, 0) || 0;
        setCartCounted(count);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartCount();
  }, []);

  const handleLoginClick = () => {
    // Navigate to signup page
    navigate('/login');
  };

  return (
    <header className='bg-white'>
      <div className='top-strip py-2 border-gray-120'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <div className='col1 w-[50%]'>
              <p className='text-[12px] font-[500]'>Get up to 50% off Opening sales, limited time only</p>
            </div>

            <div className='col2 flex items-center justify-end'>
              <ul className='flex items-center gap-3'>
                <li className='list-none'>
                  <Link to='/help-center' className='text-[13px] link font-[500] transition'>
                    Help Center
                  </Link>
                </li>
                <li className='list-none'>
                  <Link to='/order-tracking' className='text-[13px] link font-[500] transition'>
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='header py-3 top-strip border-gray-120'>
        <div className='container flex items-center justify-between'>
          <div className='col1 w-[25%]'>
            <Link to='/'>
              <img src={logo} className='w-[160px] h-[70px]'></img>
            </Link>
          </div>
          <div className='col2 w-[45%]'>
            <Search />
          </div>
          <div className='col3 w-[30%] flex items-center pl-7'>
            <ul className='flex items-center justify-end gap-3 w-full'>
              <li className='list-none'>
                <Button variant='contained' color='secondary' onClick={handleLoginClick} className='text-[14px] font-600'>
                  Login
                </Button>
              </li>
              <li>
                <Tooltip title='Compare' placement='top'>
                  <IconButton aria-label='compare'>
                    <StyledBadge badgeContent={4} color='secondary'>
                      <IoGitCompareOutline />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title='Wishlist' placement='top'>
                  <IconButton aria-label='wishlist'>
                    <StyledBadge badgeContent={4} color='secondary'>
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title='Cart' placement='top'>
                  <IconButton aria-label='cart' component={Link} to='/addtocart'>
                    <StyledBadge badgeContent={cartCounted} color='secondary'>
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;