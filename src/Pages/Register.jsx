import { nanoid } from 'nanoid';
import React from 'react'

import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import { asyncRegisterUser } from '../store/actions/userActions';

export default function Register() {
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onRegisterHandler = (user) => {
        user.id = nanoid();
        user.isAdmin = false;
        console.log("Form Data:", user);
        reset();

        user.cart = [];
        dispatch(asyncRegisterUser(user));
        toast.success('Registered Successfully');
        navigate('/login')
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4e7cf] p-6 relative z-[10]">
            <div className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row w-full max-h-fit max-w-5xl overflow-hidden">
                <div className="bg-[#e57c23] flex items-center justify-center  md:w-1/2">
                    <img
                        src="../public/telep.png"
                        alt="Support Phone"
                        className="hidden md:block object-cover md:h-[40rem] md:w-[40rem] "
                    />
                    <img
                        src="../public/telephone.png"
                        alt="Support Phone"
                        className="md:hidden object-cover  "
                    />
                </div>
                <div className="p-10 md:w-1/2">
                    <h2 className="text-2xl font-bold text-[#e57c23] mb-2">Register</h2>
                    <p className="text-gray-600 mb-6">Create an account to shop now</p>

                    <form onSubmit={handleSubmit(onRegisterHandler)} className="space-y-5">
                        <div>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="Name and surname"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
                            />
                            {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}
                        </div>

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
                                {...register("phone", { required: true })}
                                type="tel"
                                placeholder="Phone number"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">Phone number is required.</p>}
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
                            Register
                        </button>


                        <p className='mt-5'>
                            Already have an account ?
                            <Link className='text-blue-400' to='/login'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
