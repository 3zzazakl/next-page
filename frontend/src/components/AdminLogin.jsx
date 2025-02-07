// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setTimeout(() => {
      localStorage.removeItem('token');
      alert('Token has expired! Please login again.');
      navigate('/');
    }, 3600 * 1000); // Token expiration time (1 hour)
  };

  const handleLoginError = (error) => {
    setMessage('Please provide a valid email and password');
    console.error(error);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const auth = response.data;
      if (auth.token) {
        handleLoginSuccess(auth.token);
        alert('Admin login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      handleLoginError(error);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>
              Username
            </label>
            <input
              {...register('username', { required: 'Username is required' })}
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.username && <p className='text-red-500 text-xs italic'>{errors.username.message}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>}
          </div>

          {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}

          <div className='w-full'>
            <button
              type='submit'
              className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'
            >
              Login
            </button>
          </div>
        </form>

        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
