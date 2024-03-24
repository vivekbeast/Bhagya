import { useState } from 'react';
import React from 'react';
import { Popover, Transition } from '@headlessui/react'
// import { CgProfile } from "react-icons/cg";
import { Fragment } from 'react';
import logo from '../images/Bailey.png';
import { motion } from 'framer-motion';
import { IoSearchSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useCartStore } from '../zustand/store';
import { useGetUserInfo } from '../hooks/useGetUserInfo';

import '../App.css'

const PopoverItem = ({ label, content: ContentComponent }) => (
  <Popover className='flex flex-row justify-center items-center'>
    {({ open }) => (
      <div className=' flex text-neutral-800 flex-col'>
        <Popover.Button
          className='px-4 font-semibold cursor-pointer list-none text-decoration-none '
          style={{ fontFamily: 'Signika Negative' }}
        >
          {label}
        </Popover.Button>
        <Transition
          show={open}
          enter='transition-opacity duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Panel>
            {ContentComponent && <ContentComponent className=' flex self-center'/>}
          </Popover.Panel>
        </Transition>
      </div>
    )}
  </Popover>
);

const BoysClothingContent = () => 
<div className='flex mr-[300px]'>
<ul className='fixed w-[80%] bg-green-200 flex flex-wrap grid-list' style={{ fontFamily: 'Signika Negative' }}>
  <li>T-Shirts</li>
  <li>Shirts</li>
  <li>Shorts</li>
  <li>Jeans</li>
  <li>Trousers</li>
  <li>Ethnic Wear</li>
  <li>Track Pants & Pyjamas</li>
  <li>Jacket, Sweater & Sweatshirts</li>
  <li>Party Wear</li>
  <li>Innerwear & Thermals</li>
  <li>Nightwear & Loungewear</li>
</ul>
</div>;

const GirlsClothingContent = () => 
<div className='flex ml-[-200px]'>
<ul className='fixed w-[80%] bg-green-200 flex flex-wrap grid-list' style={{ fontFamily: 'Signika Negative' }}>
<li>Dresses</li>
      <li>Tops</li>
      <li>Tshirts</li>
      <li>Clothing Sets</li>
      <li>Lehenga choli</li>
      <li>Kurta Sets</li>
      <li>Party wear</li>
      <li>Dungarees & Jumpsuits</li>
      <li>Skirts & shorts</li>
      <li>Tights & Leggings</li>
      <li>Innerwear & Thermals</li>
      <li>Nightwear & Loungewear</li>
      <li>Value Packs</li>
</ul>
</div>;
const FootwearContent =()=> 
<div className='flex ml-[-400px]'>
<ul className='fixed w-[80%] bg-green-200 flex flex-wrap grid-list' style={{ fontFamily: 'Signika Negative' }}>
      <li>Casual Shoes</li>
      <li>Flipflops</li>
      <li>Sports Shoes</li>
      <li>Flats</li>
      <li>Sandals</li>
      <li>Heels</li>
      <li>School Shoes</li>
      <li>Socks</li>
</ul>
</div>;
const KidsContent =()=> 
<div className='flex ml-[-400px]'>
<ul className='fixed w-[80%] bg-green-200 flex flex-wrap grid-list ' style={{ fontFamily: 'Signika Negative' }}>
<li>Bags & Backpacks</li>
      <li>Watches</li>
      <li>Jewellery & Hair accessory</li>
      <li>Sunglasses</li>
      <li>Masks & Protective Gears</li>
      <li>Caps & Hats</li>
</ul>
</div>;




export default function Header() {
  const [menu, setMenu] = useState();
  // const grandparentRef = useRef(null);
  const handleclick = () =>{
    setMenu(false || !menu);
    const mnu = document.querySelector('.main-menu');
    mnu.style.display = 'none';
  }
  const { cart } = useCartStore(state => ({
    cart: state.cart,
  }));
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  const userInfo = useGetUserInfo();
  

  return (
<div className="z-10 fixed w-full items-center m-auto px-4 py-4 flex flex-col md:flex-row justify-between shadow-lg   bg-white">
  <div className='logo-container overflow-visible items-center flex justify-between w-full h-[50px]  ml-5 md:w-16 md:h-16 lg:shadow-md lg:shadow-slate-200 rounded-full'>
  <div className=' flex items-center overflow-visible'> <Link to='/' className=' gap-[2px] flex flex-row items-center'><img src={logo} alt="logo" className='logo-image h-[55px] w-[55px] lg:h-16 lg:w-[100%] md:h-16 md:w-16 drop-shadow-md shadow-slate-300 rounded-full' />
  <h1  className=' lg:hidden md:hidden text-[20px] font-semibold' style={{ fontFamily: 'Signika Negative' }}>hagya</h1></Link></div>
  <span onClick={handleclick} className='main-menu items-center flex mr-5 lg:hidden md:hidden relative'>
          <LuMenu className='lg:hidden md:hidden cursor-pointer text-[35px]' />
          
        </span></div> 
{menu && (
  <div className="hello md:hidden lg:hidden h-[60vh] self-center mt-[20%]  items-center flex flex-col">
    <div className="text-center justify-center flex h-fit w-full items-center transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-{#cffde0}-500/50 p-4 md:w-1/2 lg:w-1/3">
      <motion.div
        className=" justify-center flex flex-col h-full text-center items-center"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        <Link to='/' className="text-[20px] font-medium mt-[10%] text-gray-900 hover:text-[25px] hover:text-green-500 text-center self-center  hover:transition hover:ease-in-out mb-4" style={{ fontFamily: 'Signika Negative', transition: 'color 0.3s, font-size 0.3s' }}>
          <p>Home</p>
        </Link>
        <Link to='/trackertomenu' className="text-[20px] font-medium gap-[2px] items-center flex self-center mt-[10%] text-gray-900 hover:text-[25px] hover:text-green-500 hover:transition hover:ease-in-out mb-4" style={{ fontFamily: 'Signika Negative' , transition: 'color 0.3s, font-size 0.3s'}}>
          <p className=' absolute z-10'>Cart</p><div className=' bg-green-500 bottom-3 left-8 relative text-white pr-2 pl-2 pt-1 pb-1 rounded-full text-[15px] h-fit'>{totalQuantity}</div>
        </Link>
        <Link to='/#bottom' onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
        <p className="text-[20px] font-medium text-gray-900 mt-[10%] hover:text-[25px] hover:text-green-500 hover:transition hover:ease-in-out mb-4" style={{ fontFamily: 'Signika Negative' , transition: 'color 0.3s, font-size 0.3s'}}>
          About Us
        </p>
        </Link>
        <Link to='/' className="text-[20px] flex self-center font-medium mt-[10%] text-gray-900 hover:text-[25px] hover:text-green-500 hover:transition hover:ease-in-out mb-4" style={{ fontFamily: 'Signika Negative' , transition: 'color 0.3s, font-size 0.3s'}}>
          <p>Contact</p>
        </Link>
        <Link to='/trackertosignup' className="text-[20px] font-medium gap-[2px] items-center flex self-center mt-[10%] text-gray-900 hover:text-[25px]  hover:text-green-500 hover:transition hover:ease-in-out mb-4"  style={{ fontFamily: 'Signika Negative', transition: 'color 0.3s, font-size 0.3s' }}>
        <p className=''>Signup/Login</p>
        </Link>
      </motion.div>
    </div>
    <motion.span 
      onClick={() => {
        setMenu(!menu); 
        const mnu = document.querySelector('.main-menu'); 
        mnu.style.display = window.innerWidth <= 768 ? 'flex' : 'none'; 
        if (window.innerWidth > 768) {
          mnu.style.display = 'none'
        }
      }} 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1.5 }}
      transition={{
        duration: 0.9,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 3,
          stiffness: 100,
          restDelta: 0.001
        }
      }} 
      className='crossing self-center flex mt-[10%] bg-green-500 w-[40px] h-[40px] items-center text-center justify-center rounded-full'>
      <RxCross2 className=' text-[34px] text-white'/>
    </motion.span>
  </div>
)}
  
<div className=' text-slate-700 text-[18px] flex-row lg:flex md:flex hidden'>
        <PopoverItem label='Boys Clothing' content={BoysClothingContent} />
      <PopoverItem label='Girls Clothing' content={GirlsClothingContent} />
      <PopoverItem label='Footer' content={FootwearContent} />
      <PopoverItem label='Kids Accessories' content={KidsContent} />
      </div>
      <div className=' lg:flex md:flex hidden items-center border-2 rounded-full '>
        <IoSearchSharp className=' ml-2 mr-2 h-11 w-[20px] cursor-pointer hover:h-10'/>
  <input 
    className=' px-2 py-2 text-center transition-all duration-300 focus:outline-none focus:border-slate-500 focus:ring focus:ring-blue-200 rounded-full'
     
    type="text" 
    placeholder='Search Products' 
  />
</div>      
<div className=' lg:flex md:flex hidden'><Popover className=" relative w-full mr-5">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex text-center  items-center rounded-md bg-[#68c893] px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <span className=' text-white font-semibold items-center' style={{ fontFamily: 'Signika Negative' }}> Profile</span>
              {/* <CgProfile
                className={`${open ? 'text-white' : 'text-white'}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-green-300/80`}
                aria-hidden="true"
              /> */}
              
                      <img className={`${open ? 'text-white' : 'text-white'}
                  ml-2 h-[25px] w-[25px] transition rounded-full duration-150 ease-in-out group-hover:text-green-300/80`} src={userInfo.profilePhoto} alt="" 
                  />
                 
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
<Popover.Panel className=" absolute right-0 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0">               
                <div className=" h-fit overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative flex flex-col h-fit gap-8 bg-white p-7  ">
                    {/* {solutions.map((item) => ( */}
                      <div
                        className="-m-3 flex items-center h-fit rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-{#cffde0}-500/50"
                      >
                        <motion.div className="ml-4  flex flex-col h-[200px]t" 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                       
                        >
<Link to='/' className="text-md font-medium text-gray-900 p-3 hover:text-[15px] hover:text-green-500 hover:transition hover:ease-in-out" style={{ fontFamily: 'Signika Negative', transition: 'color 0.3s, font-size 0.3s' }}>
          <p>Home</p>
        </Link>

                          
                          <p className="text-md font-medium text-gray-900 p-3 hover:text-[15px] hover:text-green-500 hover:transition hover:ease-in-out" style={{ fontFamily: 'Signika Negative' }}>
                          <Link to='/trackertomenu' >Cart</Link>
                          </p>
                         
        <Link to='/' className="text-md font-medium text-gray-900 p-3 hover:text-[15px] hover:text-green-500 hover:transition hover:ease-in-out" style={{ fontFamily: 'Signika Negative' , transition: 'color 0.3s, font-size 0.3s'}}>
          <p>Contact</p>
        </Link>
        <Link to='/#bottom' onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
        <p className="text-md font-medium text-gray-900 p-3 hover:text-[15px] hover:text-green-500 hover:transition hover:ease-in-out" style={{ fontFamily: 'Signika Negative' , transition: 'color 0.3s, font-size 0.3s'}}>
          About Us
        </p>
        </Link>
        <p className="text-md font-medium text-gray-900 cursor-pointer p-3 hover:text-[15px] hover:text-green-500 hover:transition hover:ease-in-out" style={{ fontFamily: 'Signika Negative' }}>
                          <Link to='/trackertosignup'>Login/SignUp</Link>
                          </p>
                          
                        
                        </motion.div>
                      </div>
                    {/* ))} */}
                  </div>
 

                  <div className="bg-gray-50 p-4">
                    <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 flex text-center items-center">
                          <img className=' h-[35px] w-[35px] ' src={logo} alt="" /><h1 className=' font-semibold'>Bhagya</h1>
                        </span>
                        {/* bg-[#60ba89] text-[white] p-1 rounded */}
                      </span>
                      <span className="block text-sm text-gray-500 ">
                        Your Choice Our Priority
                      </span>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover></div>
      {/* <div className='relative'>
            <CgShoppingCart className='h-8 w-8 text-black' />

            <motion.div
                className='absolute -top-1 right-0 p-2 rounded-full bg-green-500'
                initial={{ y: -10, scale: 0 }} // Initial position and scale
                animate={{ y: 0, scale: 1 }} // Animation to drop down and scale up
                transition={{ type: 'spring', stiffness: 200, damping: 20 }} // Spring animation
            >
                <h1 className='text-xs text-white'>{totalQuantity}</h1>
            </motion.div>
        </div> */}
    </div>
  )
}
