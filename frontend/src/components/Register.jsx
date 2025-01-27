import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [message, setMessage] = useState('');
    const { registerUser, signInWithGoogle } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password);
            alert('Register successful!');
        } catch (error) {
            setMessage("Please check your email and password");
            console.error(error);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert('Register successful!');
            navigate('/');
        } catch (error) {
            alert('Google sign in failed!')
            console.error(error);
        }
    }
    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                        <input
                            {...register('email', { required: true })}
                            type="email" name="email" id="email" placeholder='Email Address'
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
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
                            Register
                        </button>
                    </div>
                </form>
                <p className='align-baseline font-medium mt-4 text-sm'>Already have an account? Please <Link to='/login' className='text-blue-500 hover:text-blue-700'>Login</Link></p>

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

export default Register
