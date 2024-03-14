import { motion } from 'framer-motion';
import image4 from '../images/shoes.png';
import image3 from '../images/sh.png';
import image2 from '../images/ggggggg.png'
import image1 from '../images/Untitled design.png'
import '../App.css'

const Carousel = () => {
    const items = [
        { src: image1, name: 'Boys Clothing' },
        { src: image2, name: 'Girls Clothing' },
        { src: image3, name: 'Kids Footwear' },
        { src: image4, name: 'Kids Accessories' }
      ]; 
  return (
    <div className=' items-center ' style={{ width: '100%', height: '300px', justifyContent: 'center'  , overflowX: 'auto' ,  position: 'relative' }}>
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          height: '100%',
          width: `${items.length * 57}%`,
        }}
        

      >
        {items.map((item, index) => (
          <div
            key={index}
            className=' flex flex-col'
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: index === 2 || index === 3 ? '55px' : '',
              height: index === 0 ? '290px' : '300px',
              overflow: 'visible',
              
            }}
            
          >
            <motion.div whileTap={{ scale: .85 }} className='shadow-bottom text-center'><img src={item.src} className=' rounded-[30px]  ' alt={`Slide ${index}`} /></motion.div>
            <h1 className=''>{item.name}</h1>
          </div>
          
        ))}
      </motion.div>
      
    </div>
  );
};

export default Carousel;
