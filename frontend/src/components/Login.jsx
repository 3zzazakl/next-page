import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const [message, setMessage] = useState('');
    const { loginUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            alert('Login successful!');
            navigate('/');
        } catch (error) {
            setMessage("Please check your email and password");
            console.error(error);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert('Login successful!');
            navigate('/');
        } catch (error) {
            alert('Failed to login. Please try again.');
            console.error(error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-16 bg-white rounded-lg shadow-md">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            {...register('email', { required: true })}
                            type="email" name="email" id="email" placeholder='Email Address'
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            {...register('password', { required: true })}
                            type="password" name="password" id="password" placeholder='Password'
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    {
                        message && <p className="text-sm text-red-500">
                            {message}
                        </p>
                    }
                    <div>
                        <button className='w-full py-2 bg-blue-500 text-white font-bold rounded-md'>
                            Login
                        </button>
                    </div>
                </form>
                <p className='align-baseline font-medium mt-4 text-sm'>Do not have an account? Please <Link to='/register' className='text-blue-500 hover:text-blue-700'>Register</Link></p>
                
                { /* google sign in */}
                <div className='mt-4'>
                    <button
                        onClick={handleGoogleSignIn}
                        className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                        <FaGoogle className='mr-2' />
                        Sign in with Google
                    </button>
                </div>
                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Login
    
