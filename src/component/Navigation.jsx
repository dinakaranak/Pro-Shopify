import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid, LiaTimesSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { GoRocket } from "react-icons/go";
import Category from './Category';
import '../component/search.css';
import { ProductContext } from '../context/ProductDetail';
import { useMediaQuery } from '@mui/material';
import { Drawer, IconButton } from '@mui/material';
import { FiMenu } from 'react-icons/fi';

const Navigation = () => {
    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { product } = useContext(ProductContext);
    const isMobile = useMediaQuery('(max-width:1024px)');

    const Categories = () => {
        setIsOpenCatPanel(true);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { 
            name: 'Fashion', 
            path: '/category/MENSWEAR',
            submenu: [
                { name: 'Men', path: '/category/MENSWEAR' },
                { name: 'Women', path: '/category/WOMENSWEAR' },
                { name: 'Kids', path: '/category/KIDS' }
            ]
        },
        { name: 'Electronics', path: '/category/ELECTRONICS' },
        { name: 'Bags', path: '/category/BAGS' },
        { name: 'Footwear', path: '/category/FOOTWEAR' },
        { name: 'Beauty', path: '/category/BEAUTY' },
        { name: 'Wellness', path: '/category/WELLNESS' },
        { name: 'Jewellery', path: '/category/JEWELLERY' }
    ];

    const drawer = (
        <div className="p-4 bg-white sticky top-0 h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <IconButton onClick={handleDrawerToggle}>
                    <LiaTimesSolid />
                </IconButton>
            </div>
            <div className="mb-2">
                <Button 
                    fullWidth
                    variant="outlined"
                    className='!text-black gap-2 !font-[500] !text-[14px]'
                    onClick={Categories}
                    startIcon={<RiMenu2Fill />}
                    endIcon={<LiaAngleDownSolid />}
                >
                    Explore Our Collections
                </Button>
            </div>
            <ul className="space-y-2">
                {navItems.map((item) => (
                    <li key={item.name} className="list-none">
                        {item.submenu ? (
                            <div className="group">
                                <Button 
                                    fullWidth
                                    className="!justify-start !text-left !text-black hover:!text-[#7b0af4]"
                                >
                                    {item.name}
                                </Button>
                                <ul className="pl-4 mt-1 space-y-1">
                                    {item.submenu.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link to={subItem.path} className="block w-full">
                                                <Button 
                                                    fullWidth
                                                    className="!justify-start !text-left !text-gray-600 hover:!text-[#7b0af4]"
                                                >
                                                    {subItem.name}
                                                </Button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <Link to={item.path} className="block w-full">
                                <Button 
                                    fullWidth
                                    className="!justify-start !text-left !text-black hover:!text-[#7b0af4]"
                                >
                                    {item.name}
                                </Button>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 text-[#7b0af4]">
                <GoRocket />
                <span className="text-sm font-medium">Free Home Delivery</span>
            </div>
        </div>
    );

    return (
        <>
            <div className='bg-white w-full sticky top-0 z-10 shadow-sm'>
                <nav className='py-2 px-4'>
                    <div className='container mx-auto flex items-center justify-between lg:justify-end gap-4 lg:gap-8'>
                        {isMobile && (
                            <IconButton 
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className="lg:hidden !mr-2"
                            >
                                <FiMenu />
                            </IconButton>
                        )}
                        
                        <div className='lg:w-[20%] hidden lg:block'>
                            <Button 
                                fullWidth
                                variant="outlined"
                                className='!text-black gap-2 !font-[500] !text-[15px]'
                                onClick={Categories}
                                startIcon={<RiMenu2Fill />}
                                endIcon={<LiaAngleDownSolid />}
                            >
                                Explore Our Collections
                            </Button>
                        </div>
                        
                        <div className='lg:w-[62%] hidden lg:block'>
                            <ul className='flex items-center gap-1 nav'>
                                {navItems.map((item) => (
                                    <li key={item.name} className="list-none relative group">
                                        {item.submenu ? (
                                            <>
                                                <Button 
                                                    className='!font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#7b0af4] !text-[16px] !normal-case'
                                                >
                                                    {item.name}
                                                </Button>
                                                <div className='submenu absolute top-full left-0 min-w-[200px] z-10 bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                                                    <ul>
                                                        {item.submenu.map((subItem) => (
                                                            <li key={subItem.name} className="list-none w-full hover:bg-gray-50">
                                                                <Link to={subItem.path} className="w-full">
                                                                    <Button 
                                                                        fullWidth
                                                                        className='!text-[rgba(0,0,0,0.8)] !justify-start !rounded-none hover:!text-[#7b0af4]'
                                                                    >
                                                                        {subItem.name}
                                                                    </Button>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </>
                                        ) : (
                                            <Link to={item.path}>
                                                <Button 
                                                    className='!font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#7b0af4] !text-[16px] !normal-case'
                                                >
                                                    {item.name}
                                                </Button>
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className='lg:w-[18%] hidden lg:flex items-center justify-end'>
                            <p className='!text-[16px] font-[500] flex items-center gap-3 mb-0 text-[#7b0af4]'> 
                                <GoRocket className='!text-[16px]'/>Free Home Delivery
                            </p>
                        </div>
                    </div>
                </nav>
                
                <Category Categories={setIsOpenCatPanel} isOpenCatPanel={isOpenCatPanel} />
                
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                    }}
                >
                    {drawer}
                </Drawer>
            </div>
        </>
    );
}

export default Navigation;