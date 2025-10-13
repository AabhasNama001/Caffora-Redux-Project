// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { asyncDeleteUser, asyncLogoutUser, asyncUpdateUser } from '../store/actions/userActions';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// const Settings = () => {
//     const  dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { users } = useSelector((state) => state.userReducer)
//     const {
//         register,
//         handleSubmit
//     } = useForm({
//         defaultValues: {
//             name: users?.name || '',
//             email: users?.email || '',
//             password: users?.password || ''
//         }
//     });
//     const onUpdateHandler = (user) => {
//         console.log("Form Data:", user);

//         console.log(user)

//         dispatch(asyncUpdateUser(users.id, user));
//         toast.success('Updated Successfully');

//     };

//     const LogoutHandler = ()=>{
//         dispatch(asyncLogoutUser());
//         toast.success('Logout Successfully');
//         navigate('/login')
//     }

//     const DeleteHandler = ()=>{
//         dispatch(asyncDeleteUser(users.id))
//         toast.success('deleted')
//         navigate('/register');
//     }
//     return users? (
//         <div className='relative z-20 bg-amber-50 pt-50 w-full h-[100vh]'>
//             <form onSubmit={handleSubmit(onUpdateHandler)} className="space-y-5">
//                 <div>
//                     <label>Name:</label>
//                     <input
//                         {...register("name")}
//                         type="text"
                     
//                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
//                     />
                   
//                 </div>

//                 <div>
//                     <label>Email:</label>
//                     <input
//                         {...register("email")}
//                         type="email"
                      
//                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
//                     />
                  
//                 </div>



//                 <div>
//                     <label>Password:</label>
//                     <input
//                         {...register("password")}
//                         type="password"
                       
//                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
//                     />
                  
//                 </div>
//                 <div>
//                     <button
//                         type="submit"
//                         className="bg-[#e57c23] text-white px-6 py-2 rounded-md hover:bg-[#cf6d1f] shadow-md transition duration-200 active:scale-[0.97]"
//                     >
//                         Update {users?.isAdmin ? 'Admin' : 'User'}
//                     </button>
//                     <button
//                         onClick={LogoutHandler}
//                         type="button"
//                         className="bg-[#ae4747] text-white px-6 py-2 rounded-md hover:bg-[#ca5f5f] shadow-md transition duration-200 active:scale-[0.97]"
//                     >
//                         Logout {users?.isAdmin ? 'Admin' : 'User'}
//                     </button>
//                     <button
//                         onClick={DeleteHandler}
//                         type="button"
//                         className="bg-[#b50909] text-white px-6 py-2 rounded-md hover:bg-[#ff0000] shadow-md transition duration-200 active:scale-[0.97]"
//                     >
//                         Delete account
//                     </button>
//                 </div>
//             </form>
//         </div>
//     ) :'loading'
// } 

// export default Settings 







import React, { useEffect } from 'react' // Import useEffect
import { useForm } from 'react-hook-form';
import { asyncDeleteUser, asyncLogoutUser, asyncUpdateUser } from '../store/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.userReducer)

    // Destructure 'reset' from useForm
    const {
        register,
        handleSubmit,
        reset // <-- Get the reset function
    } = useForm({
        // Keep defaultValues simple or empty initially
        defaultValues: {
            name: '', 
            email: '',
            password: ''
        }
    });

    // Use useEffect to reset the form data once 'users' is available
    useEffect(() => {
        if (users) {
            reset({
                name: users.name,
                email: users.email,
                // NOTE: Password should generally NOT be pre-filled for security. 
                // You should consider removing it or leaving it blank.
                password: users.password // If you absolutely must pre-fill it.
            });
        }
    }, [users, reset]); // Re-run effect when 'users' changes

    // ... (rest of your handlers remain the same)

    const onUpdateHandler = (user) => {
        console.log("Form Data:", user);

        console.log(user)

        dispatch(asyncUpdateUser(users.id, user));
        toast.success('Updated Successfully');

    };

    const LogoutHandler = ()=>{
        dispatch(asyncLogoutUser());
        toast.success('Logout Successfully');
        navigate('/login')
    }

    const DeleteHandler = ()=>{
        dispatch(asyncDeleteUser(users.id))
        toast.success('deleted')
        navigate('/register');
    }

    // Return statement remains the same
    return users? (
        <div className='relative z-20 bg-amber-50  w-full h-[100vh] p-4 flex justify-center flex-col  items-center'>
            <h1 className='text-[27px] mb-3'> {users?.isAdmin ?  'Admin' : 'User'} Profile</h1>
            <form onSubmit={handleSubmit(onUpdateHandler)} className="space-y-5">
                {/* ... your form fields ... */}
                <div>
                    <label>Name:</label>
                    <input
                        {...register("name")}
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        {...register("email")}
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
                    />
                </div>



                <div>
                    <label>Password:</label>
                    <input
                        {...register("password")}
                        type="password"
                        // NOTE: For security, a common practice is to leave the password field blank 
                        // and only allow the user to submit a new password.
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
                    />
                </div>
                {/* ... your buttons ... */}
                <div className='flex flex-wrap gap-y-3 gap-x-1'>
                    <button
                        type="submit"
                        className="bg-[#e57c23] max-[449px]:w-full max-[650px]:w-[49%] text-white px-6 py-2 rounded-md hover:bg-[#cf6d1f] shadow-md transition duration-200 active:scale-[0.97]"
                    >
                        Update {users?.isAdmin ? 'Admin' : 'User'}
                    </button>
                    <button
                        onClick={LogoutHandler}
                        type="button"
                        className="bg-[#ae4747] max-[449px]:w-full max-[650px]:w-[49%] text-white px-6 py-2 rounded-md hover:bg-[#ca5f5f] shadow-md transition duration-200 active:scale-[0.97]"
                    >
                        Logout {users?.isAdmin ? 'Admin' : 'User'}
                    </button>
                    <button
                        onClick={DeleteHandler}
                        type="button"
                        className="bg-[#b50909] max-[449px]:w-full max-sm:w-full text-white px-6 py-2 rounded-md hover:bg-[#ff0000] shadow-md transition duration-200 active:scale-[0.97]"
                    >
                        Delete account
                    </button>
                </div>
            </form>
        </div>
    ) :'loading'
} 

export default Settings