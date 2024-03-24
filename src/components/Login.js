import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth, provider1 } from './authentication';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const handleGoogleLogin = async () => {
    try {
      const results = await signInWithPopup(auth, provider1);
      console.log(results);
      if (results.user) {
        const authInfo = {
          userId: results.user.uid,
          name: results.user.displayName,
          profilePhoto: results.user.photoURL,
        };
        localStorage.setItem('auth', JSON.stringify(authInfo));
        navigate('/trackertomenu');
        console.log('Logging in with Google');
      } else {
        console.error('User information not found');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };



  
  if(isAuth){
    return <Navigate to="/trackertomenu" />
}
const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    const userCredential = await signInWithEmailAndPassword(auth,email,password);
    console.log(userCredential);
    const user = userCredential.user;
    localStorage.setItem('token',user.accessToken);
    localStorage.setItem('user',JSON.stringify(user));
    navigate('/trackertomenu');
  }
  catch(error){
    console.error(error);
  }
 };

  return (
    <div className="min-h-screen w-full h-screen bg-gray-100 flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full h-full flex flex-col justify-center items-center px-6 py-8 bg-white shadow-md rounded-md"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} required  
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
    placeholder="example@example.com" 
    />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password"  id="password" value={password} onChange={(e)=> setPassword(e.target.value)} required 
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
    placeholder="Enter your password..." 
    />
          </div>
          <div className=' self-center flex items-center text-center'>
            <button type="submit" className="w-full self-center center bg-green-500 text-white py-2 px-4  rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign in</button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Don't have an account?</span> <Link to='/trackertosignup' className="font-medium text-green-500 hover:text-green-600">Sign up</Link>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          ------- <span className="text-gray-600">or Continue with</span> -------
          <div className="flex justify-center mt-2 space-x-4">
            <button onClick={handleGoogleLogin} className=" py-2 px-4 ">
              <FcGoogle className=' text-[35px] shadow-lg rounded-full' />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
