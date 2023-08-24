import React, { useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import {ShoppingCartIcon, Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import Logout from './Logout';
import SearchBar from './SearchBar';





const Navbar = () => {
    const flexBetween = "flex items-center justify-evenly";
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const navbarBackground = "bg-secondary-100 drop-shadow";

  return (
    <nav>
        <div
        className={`${flexBetween} ${navbarBackground} fixed top-0 z-30 w-full pt-4 pb-2`}
        >
            <div className={`${flexBetween} mx-auto w-5/6`}>
                <div className={`${flexBetween} w-full gap-16`}>
                    <h1 className='text-white text-2xl'>
                        Congo Superstore
                    </h1>
                    <SearchBar />
                    {isAboveMediumScreens ? (
                        <div className={`${flexBetween} w-full`}>
                            <div className={`${flexBetween} gap-8 text-sm`}>
                                <Link to="/products"
                                className='text-primary-300'>
                                    Home
                                </Link>
                                <Link to="/register"
                                className='text-primary-300'>
                                    Register
                                </Link>
                                <Link to="/products/create"
                                className='text-primary-300'>
                                    Create Product
                                </Link>
                                <ShoppingCartIcon/>
                                <Logout/>
                            </div>
                        </div>
                    ) : (
                        <button
                        className='rounded-full bg-secondary-100 p-2'
                        onClick={()=> setIsMenuToggled(!isMenuToggled)}>
                            <Bars3Icon className='h-6 w-6 text-white'/>
                        </button>
                    )}
                </div>
            </div>
        </div>
        
        {!isAboveMediumScreens && isMenuToggled && (
            <div className='fixed-right-0 bottom-0 z-40 h-full w-[300px] bg-secondary-100 drop-shadow-xl'>
                <div className='flex justify-start p-12'>
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className='h-6 w-6 text-gray-400'/>
                    </button>
                </div>
                <div className='ml-[33%] flex flex-col gap-10 text-2xl pb-10 rounded-md'>
                    <Link to="/products"
                    className='text-primary-300'>
                        Home
                    </Link>
                    <Link to="/register"
                    className='text-primary-300'>
                        Register
                    </Link>
                    <Link to="/create"
                    className='text-primary-300'>
                        Create Product
                    </Link>
                    <Link to="/cart"
                    className='text-primary-300'>
                        Cart
                    </Link>
                </div>
            </div>
        )}
    </nav>
  )
}

export default Navbar;