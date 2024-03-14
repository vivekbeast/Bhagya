import React, { useEffect, useState } from 'react';
import h1 from '../images/7632738.jpg';
import "../App.css";
import h2 from '../images/Boys-Indianwear-web_031123.jpg';
import h3 from '../images/Infant-web_031123.jpg';
import h4 from '../images/girl-purple-blouse-black-pants-is-sitting-chair-looking-into-camera-holding-folder-against-background-hangers-with-bright-dresses_197531-17617.jpg';
import h5 from '../images/dancing-team-studio_1303-10928.jpg';
import post from './post.png';
import { GrFormNextLink , GrFormPreviousLink } from "react-icons/gr";
import { motion , useAnimationFrame } from 'framer-motion';
import Lottie from 'react-lottie';
import plane from '../images/plane.json'
import { useRef } from "react";
import Carousel from './Carousel';
import ProductCart from './ProductCart';





const images = [h1, h2, h3, h4, h5];














const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);

  const handleNextButtonClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1)% images.length);
  };
  const handlePrevButtonClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []); 
  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData: data,
    animationData: plane,
  };
  const lottieStyle = {
  objectFit: "cover",
  overflow: "hidden",
  };


  useAnimationFrame((t) => {
    const translateX = (t % 10000) / -10; 
const translateY = (1 + Math.sin(t / 500)) * 8;
ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
  });
  


  return (
    <div className=' w-full'>
      <div className='flex h-screen md:pt-[110px] lg:pt-[110px] pt-[90px]'>
      <button className=' h-fit self-center lg:flex md:flex hidden' onClick={handlePrevButtonClick}><GrFormPreviousLink className=' h-[30px] w-[25px]' /></button>
      <div className=' flex flex-col w-full h-fit rounded-md text-center' style={{ overflow: 'hidden' }}>
      <motion.img
            key={currentImageIndex}
            initial={{ x: 700 }}
            animate={{ x: 0, transition: { type: 'easeInOut', duration: 0.3, stiffness: 300, damping: 10 } }}
            exit={{ x: -700 }}
            className='md:h-[500px] lg:h-[500px] h-[290px] w-[95%] rounded-md shadow-2xl self-center'
            src={images[currentImageIndex]}
            alt=''
          />

        <div className=' grid grid-flow-col-dense justify-center items-center static  w-[100%]' ref={ref} > 
        <Lottie className=' lg:h-[200] lg:w-[200]'
        options={defaultOptions}
        height={150}
        width={100}
        style={lottieStyle}
        />---------------- 
        <motion.div   className=' w-fit h-fit text-center items-center flex'><h1 className='image-logo  md:text-[25px] lg:text-[25px] text-[20px] w-[120%] md:w-[70%] lg:w-[60%] ' style={{fontFamily: "Signika Negative",}}> "Happy vibes, happy buys – it's shopping time!"</h1></motion.div>
        
        </div>
        <motion.div
        initial={{ x: 700 }}  
        animate={{ x: 0 , transition:{ type: 'easeInOut', duration: 1.0, stiffness: 300, damping: 12}}}       
        exit={{ x: -700 }}   
        className=' flex justify-center shadow-2xl  items-center'>
        <img src={post} className=' w-[90%] self-center  h-[290px] md:hidden lg:hidden rounded-lg shadow-2xl   object-fill' alt="hhh" />
      </motion.div>
      </div>
      <button className=' h-fit self-center lg:flex md:flex hidden' onClick={handleNextButtonClick}><GrFormNextLink className=' h-[30px] w-[25px]' /></button>
      
      </div>
      <div className=' md:hidden lg:hidden'>
      <Carousel />
      </div>
      <ProductCart />
    </div>
  );
};

export default Home;
