// // Footer.jsx
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import cafforaLogo from '/TLogo.png'

// gsap.registerPlugin(ScrollTrigger);

// export function Footer() {
//     return (
//         <div id="footer" className='fixed z-9 h-[100vh] bottom-0 bg-black text-white w-[100%]'>
//             <div>
//                 {/*  links */}
//                 <div>
//                     {/* nav Links */}
//                     <div>
//                         <div>
//                             <div>Products</div>
//                             <div>Cart</div>
//                             <div>Contact</div>
//                         </div>
//                         <div>
//                             <div>Privacy Policy</div>
//                             <div>Terms & Conditions</div>
//                             <div>Refund Policy</div>
//                         </div>
//                     </div>
//                     {/* social icons */}
//                     <div>
//                         {/* social icons */}
//                     </div>
//                 </div>


//                 {/* Logo */}
//                 <div>
//                     <img src={cafforaLogo} alt ='' className=''/>
//                 </div>

//                 <hr/>

//                     {/* copyright */}
//                 <div>

//                 </div>

//             </div>

//         </div>
//     );
// }



//       <div id="footer-div">
//     <h2>Work Studio Contact</h2>
//     <div id="left-side-footer">
//         <h3>Get industry insights and creative inspiration straight to your inbox.</h3>
//         <div class="btn">
//             <input type="email" placeholder="Email address" />


//             <img src="arrow.png" alt="" />
//         </div>
//     </div>
// </div>
// <h1>Sundown</h1>

// <div id="footer-bottom"></div>



// Footer.jsx
import cafforaLogo from '/TLogo.png'

export function Footer() {
  return (
    <footer className="fixed bottom-0 z-9 bg-gradient-to-b from-[#4e1c1c] via-black to-black text-white w-full h-[100vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col justify-between h-full">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start md:items-center">
          {/* Left Nav Links */}
          <div className='flex flex-col md:flex-row gap-10 md:gap-50 lg:gap-30 xl:gap-50'>
            <div className="pt-10 space-y-3 text-lg font-medium">
            <a href="/products" className="block hover:opacity-70">Products</a>
            <a href="/cart" className="block hover:opacity-70">Cart</a>
            <a href="/contact" className="block hover:opacity-70">Contact</a>
          </div>
          <div className="space-y-3 text-lg font-medium">
            <a href="/products" className="block hover:opacity-70">Privacy Policy</a>
            <a href="/cart" className="block hover:opacity-70">Terms & Conditions</a>
            <a href="/contact" className="block hover:opacity-70">Refund Policy</a>
          </div>
          </div>

          {/* Newsletter / Info (right side like Sundown) */}
          <div className="mt-10 md:mt-30 lg:mt-0 max-w-md text-right">
            <p className="text-sm md:text-base mb-2 text-gray-200">
              Get industry insights and creative inspiration straight to your inbox.
            </p>
            <div className="border-b border-gray-400 w-full">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent w-full py-2 px-1 focus:outline-none placeholder-gray-400 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Middle Big Logo / Name */}
        <div className="flex justify-center my-16">
          {/* You can either use your logo OR big text */}
        
          <h1 className="text-[12vw] leading-none  text-gray-100 tracking-widest font-[cinzelDec]">
            Caffora
          </h1>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 text-sm text-gray-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Caffora. All rights reserved.</p>
          <p>Brooklyn, NY</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
