import React from 'react'

import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { asyncLoginUser } from '../store/actions/userActions';

export default function Login() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const onLoginHandler = async (user) => {
        console.log("Form Data:", user);
        reset();
        const success = await dispatch(asyncLoginUser(user));

        if (success) {
            toast.success("Login Successfully!");
        } else {
            toast.error("Invalid Email or Password!");
        }
    };

    return (
        <div className="min-h-[100vh] flex items-center justify-center bg-[#f4e7cf] p-6 relative z-[10]">
            <div className="my-30 bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row w-full max-h-fit max-w-5xl overflow-hidden">
                <div className="bg-[#e57c23] flex items-center justify-center md:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1603792026661-f7bba5709210?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwNXx8fGVufDB8fHx8fA%3D%3D"
                        alt="Coffee_Desk"
                        className="hidden md:block object-cover md:h-[700px] md:w-[50rem] md:-mt-40"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Coffee_small"
                        className="md:hidden object-cover w-full h-full "
                    />
                </div>
                <div className="p-10 md:w-1/2">
                    <h2 className="text-2xl font-bold text-[#e57c23] mb-2">Login</h2>
                    <p className="text-gray-600 mb-6">Go to Our Site</p>

                    <form onSubmit={handleSubmit(onLoginHandler)} className="space-y-5">


                        <div>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required.</p>}
                        </div>

                        <div>
                            <input
                                {...register("password", { required: true })}
                                type="password"
                                placeholder='******'
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
                            />
                            {errors.password && <p className="text-red-500 text-sm">Password is required.</p>}
                        </div>



                        <button
                            type="submit"
                            className="bg-[#e57c23] text-white px-6 py-2 rounded-md hover:bg-[#cf6d1f] shadow-md transition duration-200"
                        >
                            Login
                        </button>
                        <p className='mt-5'>
                            Don't have an account ?
                            <Link className='text-blue-400' to='/register'>Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
