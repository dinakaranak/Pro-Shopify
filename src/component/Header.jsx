import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import Search from './Search'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MdOutlineShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { useCart } from '../context/CartContext'
import { useMediaQuery, Box, Drawer, List, ListItem, Divider } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 4,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        fontSize: '0.6rem',
    },
}));

const Header = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:768px)');
    const isTablet = useMediaQuery('(max-width:1024px)');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { cartCount, cartError, fetchCartCount } = useCart();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        fetchCartCount();
    }, [fetchCartCount]);

    const handleLoginClick = () => navigate('/login');
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ width: 250 }} role="presentation">
            <div className="flex justify-between items-center p-4">
                <Link to="/">
                    <img src={logo} alt="Logo" className="w-32" />
                </Link>
                <IconButton onClick={handleDrawerToggle}>
                    <MdClose />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem>
                    <Search fullWidth />
                </ListItem>
                <ListItem>
                    {isLoggedIn ? (
                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="secondary" 
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="secondary" 
                            onClick={handleLoginClick}
                        >
                            Login
                        </Button>
                    )}
                </ListItem>
                <ListItem>
                    <Link to="/help-center" className="w-full">
                        <Button fullWidth>Help Center</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/order-tracking" className="w-full">
                        <Button fullWidth>Order Tracking</Button>
                    </Link>
                </ListItem>
            </List>
            <Divider />
            <div className="flex justify-around p-4">
                <IconButton component={Link} to="/compare">
                    <StyledBadge badgeContent={4} color="secondary">
                        <IoGitCompareOutline />
                    </StyledBadge>
                </IconButton>
                <IconButton component={Link} to="/wishlist">
                    <StyledBadge badgeContent={4} color="secondary">
                        <FaRegHeart />
                    </StyledBadge>
                </IconButton>
                <IconButton component={Link} to="/addtocart">
                    <StyledBadge badgeContent={cartCount} color="secondary">
                        <MdOutlineShoppingCart />
                    </StyledBadge>
                </IconButton>
            </div>
        </Box>
    );

    return (
        <header className='bg-white shadow-sm  z-50'>
            {/* Top Strip */}
            <div className='top-strip py-2 border-b border-gray-200 bg-gray-50 hidden md:block'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center justify-between'>
                        <div className='w-full md:w-1/2'>
                            <p className='text-xs md:text-sm font-medium text-gray-600'>
                                Get up to 50% off Opening sales, limited time only
                            </p>
                        </div>
                        <div className='hidden md:flex items-center justify-end space-x-4'>
                            <Link to='/help-center' className='text-xs md:text-sm font-medium text-gray-600 hover:text-purple-600 transition'>
                                Help Center
                            </Link>
                            <Link to='/order-tracking' className='text-xs md:text-sm font-medium text-gray-600 hover:text-purple-600 transition'>
                                Order Tracking
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className='header py-3 border-b border-gray-200'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center justify-between'>
                        {/* Mobile Menu Button */}
                        <div className='md:hidden flex items-center'>
                            <IconButton onClick={handleDrawerToggle}>
                                <MdMenu className="text-2xl" />
                            </IconButton>
                        </div>

                        {/* Logo */}
                        <div className='flex-1 md:flex-none md:w-1/4 flex justify-center md:justify-start'>
                            <Link to='/'>
                                <img 
                                    src={logo} 
                                    alt="Logo" 
                                    className='h-12 md:h-16 w-auto' 
                                />
                            </Link>
                        </div>

                        {/* Search - Hidden on mobile */}
                        <div className='hidden md:block md:w-2/5 lg:w-2/5'>
                            <Search />
                        </div>

                        {/* Action Buttons */}
                        <div className='flex-1 md:flex-none md:w-1/4 flex justify-end items-center space-x-1 md:space-x-2'>
                            {!isMobile && (
                                <>
                                    {isLoggedIn ? (
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={handleLogout}
                                            size="small"
                                            className='hidden md:block'
                                        >
                                            Logout
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={handleLoginClick}
                                            size="small"
                                            className='hidden md:block'
                                        >
                                            Login
                                        </Button>
                                    )}
                                </>
                            )}
                            
                            <Tooltip title="Compare" placement="bottom">
                                <IconButton 
                                    size="small"
                                    component={Link}
                                    to="/compare"
                                >
                                    <StyledBadge badgeContent={4} color="secondary">
                                        <IoGitCompareOutline className="text-[25px]" />
                                    </StyledBadge>
                                </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Wishlist" placement="bottom">
                                <IconButton 
                                    size="small"
                                    component={Link}
                                    to="/wishlist"
                                >
                                    <StyledBadge badgeContent={4} color="secondary">
                                        <FaRegHeart className="text-[25px]" />
                                    </StyledBadge>
                                </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Cart" placement="bottom">
                                <IconButton 
                                    size="small"
                                    component={Link}
                                    to="/addtocart"
                                >
                                    <StyledBadge badgeContent={cartCount} color="secondary">
                                        <MdOutlineShoppingCart className="text-[25px]" />
                                    </StyledBadge>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Mobile Search - Visible only on mobile */}
                    {isMobile && (
                        <div className='mt-3'>
                            <Search fullWidth />
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: 280,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </header>
    )
}

export default Header;