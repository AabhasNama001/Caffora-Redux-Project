

// // Footer.jsx
// import FooterTitle from './FooterTitle'
// import cafforaLogo from '/TLogo.png'
// // bg-[linear-gradient(to_bottom,#99804D_0%,#5a4630_30%,#000000_70%,#111111_100%)]
// export function Footer() {
//   return (
//     <footer className="fixed bottom-0 z-9 bg-[linear-gradient(to_bottom,#99804D_0%,#111111_30%,#000000_70%,#111111_100%)] text-white w-full h-[100vh]">
//       <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col justify-between h-full">

//         {/* Top Section */}
//         <div className="pt-10 md:pt-20 lg:pt-30 flex flex-col lg:flex-row justify-between items-start md:items-center">
//           {/* Left Nav Links */}
//           <div className='flex flex-col md:flex-row gap-10 md:gap-50 lg:gap-30 xl:gap-50'>
//             <div className=" space-y-3 text-lg font-medium">
//               <a href="/products" className="block hover:opacity-70">Products</a>
//               <a href="/cart" className="block hover:opacity-70">Cart</a>
//               <a href="/contact" className="block hover:opacity-70">Contact</a>
//             </div>
//             <div className="space-y-3 text-lg font-medium">
//               <a href="/products" className="block hover:opacity-70">Privacy Policy</a>
//               <a href="/cart" className="block hover:opacity-70">Terms & Conditions</a>
//               <a href="/contact" className="block hover:opacity-70">Refund Policy</a>
//             </div>
//           </div>

//           {/* Newsletter / Info (right side like Sundown) */}
//           <div className="mt-10 md:mt-30 lg:mt-0 max-w-md text-left md:text-right">
//             <p className="text-sm md:text-base mb-2 text-gray-200 leading-[25px]">
//               Get industry insights and creative inspiration straight to your inbox.
//             </p>
//             <div className="border-b border-gray-400 w-full">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="bg-transparent w-full py-2 px-1 focus:outline-none placeholder-gray-400 text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Middle Big Logo / Name */}
        
//             <FooterTitle/>
        

//         {/* Bottom Row */}
//         <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 text-sm text-gray-400 space-y-4 md:space-y-0">
//           <p>© {new Date().getFullYear()} Caffora. All rights reserved.</p>
//           <p>Brooklyn, NY</p>
//           <div className="flex space-x-6">
//             <a href="#" className="hover:text-white">Instagram</a>
//             <a href="#" className="hover:text-white">Twitter</a>
//             <a href="#" className="hover:text-white">LinkedIn</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }


import React, { useMemo, useRef, useEffect, useState, lazy, Suspense } from "react";

// ✅ Lazy load FooterTitle (code-splitting)
const FooterTitle = lazy(() => import("./FooterTitle"));

export function Footer() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Memoized links (doesn’t recreate every render)
  const navLinks = useMemo(
    () => [
      { href: "/products", label: "Products" },
      { href: "/cart", label: "Cart" },
      { href: "/contact", label: "Contact" },
    ],
    []
  );

  const policyLinks = useMemo(
    () => [
      { href: "/products", label: "Privacy Policy" },
      { href: "/cart", label: "Terms & Conditions" },
      { href: "/contact", label: "Refund Policy" },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      { href: "#", label: "Instagram" },
      { href: "#", label: "Twitter" },
      { href: "#", label: "LinkedIn" },
    ],
    []
  );

  // ✅ Only render footer when it’s in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="fixed bottom-0 z-9 bg-[linear-gradient(to_bottom,#99804D_0%,#111111_30%,#000000_70%,#111111_100%)] text-white w-full h-[100vh]"
    >
      {isVisible && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col justify-between h-full">
          {/* Top Section */}
          <div className="pt-10 md:pt-20 lg:pt-30 flex flex-col lg:flex-row justify-between items-start md:items-center">
            {/* Left Nav Links */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-50 lg:gap-30 xl:gap-50">
              <div className="space-y-3 text-lg font-medium">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block hover:opacity-70"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="space-y-3 text-lg font-medium">
                {policyLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block hover:opacity-70"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-10 md:mt-30 lg:mt-0 max-w-md text-left md:text-right">
              <p className="text-sm md:text-base mb-2 text-gray-200 leading-[25px]">
                Get industry insights and creative inspiration straight to your
                inbox.
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
          <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
            <FooterTitle />
          </Suspense>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 text-sm text-gray-400 space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} Caffora. All rights reserved.</p>
            <p>Brooklyn, NY</p>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
