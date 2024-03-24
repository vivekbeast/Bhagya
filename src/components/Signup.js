import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { auth, provider1 } from './authentication';
import { FcGoogle } from 'react-icons/fc';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './authentication';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

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
        navigate('/home');
        console.log('Logging in with Google');
      } else {
        console.error('User information not found');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      alert("An error occurred while signing in. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // localStorage.setItem('token', user.accessToken);
      const authData = localStorage.setItem('user', JSON.stringify(user));
      const updateCartInFirestore = async () => {
        try {
          const userRef = doc(db, "users", authData.uid);
          const storedCart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart items from local storage
          await setDoc(userRef, { cart: storedCart }); // Update cart in Firestore with the retrieved cart items
        } catch (error) {
          console.error('Error updating user cart:', error);
        }
      };
      // After successful sign up, update cart in Firestore
      await updateCartInFirestore();

      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert("This email address is already in use. Please try signing in or use a different email address.");
      } else {
        console.error(error);
        alert("An error occurred while signing up... Please try again later.");
      }
    }
  };
  

  if (isAuth) {
    return <Navigate to="/home" />;
  }

  return (
      <div className="min-h-screen w-full h-screen bg-gray-100 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full h-full flex flex-col justify-center items-center px-6 py-8 bg-white shadow-md rounded-md"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div>
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
  <input 
    type="email" 
    id="email" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    required 
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
    placeholder="example@example.com" 
  />
</div>
<div>
  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
  <input 
    type="password" 
    id="password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    required 
    // pattern={passwordRegex} 
    title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number" 
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
    placeholder="Create a Strong Password..." 
  />
</div>

            <div className='self-center flex items-center text-center'>
              <button type="submit" className="w-full shadow-lg self-center center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign up</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Already have an account?</span> <Link to='/trackertologin' className="font-medium text-green-500 hover:text-green-600">Login</Link>
            </div>
          </form>
          <div className=" mt-[24px] text-center text-sm">
            ------- <span className="text-gray-600">or Continue with</span> -------
            <div className="flex justify-center mt-2 space-x-4">
              <button onClick={handleGoogleLogin} className="py-2 px-4 ">
                <FcGoogle className='text-[35px] shadow-lg rounded-full' />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
  );
};

export default Signup;
