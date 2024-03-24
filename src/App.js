import './App.css';
import Home from './components/Home';
import Header from './components/header';
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';
import Menu from './components/menu';
import { CgShoppingCart } from 'react-icons/cg';
import { motion } from 'framer-motion';
import { useCartStore } from './zustand/store';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  const { cart } = useCartStore(state => ({
    cart: state.cart,
  }));
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <BrowserRouter>
      <div className="h-fit relative">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} /> 
          <Route path="/trackertomenu" element={<Menu />} /> 
          <Route path="/trackertologin" element={<Login />} />
          <Route path="/trackertosignup" element={<Signup />} /> 
          <Route path="*" element={<div>404: Not Found</div>} /> 
        </Routes>
        {/* <Link to="/">
          <motion.div
            className='CART-POPUP fixed flex z-40 bottom-[86px]  right-[25px]'
          >
            <motion.div
              className='p-[10px] flex flex-col w-[50px] text-center rounded-full '
            >
              <motion.h1
              initial={{ rotate: -90}}
      style={{
        display: "inline-block",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "1em",
        transformOrigin: "left top",
      }}
              >Welcome!! {userInfo.name}</motion.h1>
              <img src={userInfo.profilePhoto} className=" h-[45px] w-fit rounded-full" alt="" />
            </motion.div>

          </motion.div>
        </Link> */}
        <Link to="/trackertologin">
          <motion.div
            className='CART-POPUP fixed z-40 bottom-4 right-4 flex items-center'
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: .85 }}
          >
            <motion.div
              className='bg-white p-[10px] rounded-full shadow-lg flex justify-center items-center'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .85 }}
            >
              <CgShoppingCart className='h-8 w-8 text-green-500' />
              <h1 className='text-md mb-4 text-black'>{totalQuantity}</h1>
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </BrowserRouter>
  );
}

export default App;
