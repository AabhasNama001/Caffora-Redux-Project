import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const AuthWrapper = (props) => {

const {users} = useSelector((state)=>state.userReducer);

  return (users ? props.children : <Navigate to='/login'/>)
}

export default AuthWrapper  


// import React, { useState, useEffect } from 'react'; // <-- Import useState, useEffect
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const AuthWrapper = (props) => {

//     const { users } = useSelector((state) => state.userReducer);
//     // Ek local state banao ki user data load ho chuka hai ya nahi
//     const [isCheckingAuth, setIsCheckingAuth] = useState(true);

//     useEffect(() => {
//         // Assume ki Redux data fetch karne ke liye koi action dispatch hua hai.
//         // For simplicity, hum yahan thoda delay set kar dete hain,
//         // ya maan lete hain ki 'users' ki value milne ke baad hi checking khatam hogi.
        
//         // Jab component mount hota hai, hum maan lete hain ki async process shuru ho gaya hai.
//         // Jab 'users' object ki value change hoti hai (null se data, ya data se null),
//         // toh hum keh sakte hain ki check poora ho gaya.
//         if (users !== undefined) {
//             setIsCheckingAuth(false);
//         }
        
//         // Agar aapke paas Redux thoda slow load hota hai (like with redux-persist),
//         // toh aap yahan ek chhota timeout bhi use kar sakte hain, but that's a hack.
//         // Agar aap Redux-Persist use kar rahe hain, toh uske 'persistor.ready' check ka use karna best hai.

//     }, [users]); // users value change hone par effect chalega

//     // Agar hum abhi bhi check kar rahe hain, toh loading dikhao
//     if (isCheckingAuth) {
//         // Temporary Loading UI
//         return <div className="flex items-center justify-center h-screen">Authenticating...</div>;
//     }

//     // Checking poora hone ke baad:
//     // Agar users ka data hai (authenticated), toh children render karo
//     if (users) {
//         return props.children;
//     }

//     // Agar users ka data nahi hai (logged out), toh /login par navigate karo
//     return <Navigate to='/login' />;
// }

// export default AuthWrapper;