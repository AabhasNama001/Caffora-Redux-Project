import React, { useState } from "react";
import GooeyNav from "./Nav/GooeyNav";

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/about" },
  { label: "Contact", href: "#" },
];

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-md z-50 flex justify-between items-center px-6 md:px-10 py-1">
      {/* LOGO */}
      <div className="logo">
        <img
          src="/TLogo.png"
          alt="Logo"
          className="w-30 h-auto object-cover lg:w-40"
        />
      </div>

      {/* Desktop Nav - Hidden on Mobile */}
      <div className="hidden md:flex h-25 relative w-fit justify-center items-center">
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* Desktop Icons - Hidden on Mobile */}
      <div className="hidden md:flex nav-icons items-center gap-3 relative">
        <i className="ri-shopping-cart-fill text-2xl"></i>

        <div className="relative">
          <div className="cursor-pointer flex items-center" onClick={toggleDropdown}>
            <i className="ri-user-fill text-2xl"></i>
            <i className="ri-arrow-down-s-line text-2xl"></i>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">CreateProduct</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <i className="ri-logout-box-r-fill"></i> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger */}
      {!mobileMenuOpen && (
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <i className="ri-menu-3-line text-3xl"></i>
          </button>
        </div>
      )}


      {/* Sidebar Drawer for Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden h-[100vh]">
          <div className="fixed top-0 right-0 w-64 sm:w-80 h-full bg-white/90 z-[49999900]shadow-lg flex flex-col p-6 sm:p-10">
            {/* Close Button */}
            <button
              className="self-end mb-6"
              onClick={toggleMobileMenu}
            >
              <i className="ri-close-line text-3xl"></i>
            </button>

            {/* Nav Links */}
            <ul className="flex flex-col gap-4 text-lg font-medium">
              <li><a href="/" className="hover:text-blue-500">Home</a></li>
              <li><a href="/about" className="hover:text-blue-500">Products</a></li>
              <li><a href="#" className="hover:text-blue-500">Contact</a></li>
              <li><a href="#" className="hover:text-blue-500">Create Product</a></li>
              <li><a href="#" className="hover:text-blue-500">Settings</a></li>
            </ul>

            {/* Icons */}
            <div className="mt-6 flex items-center gap-4">
              <i className="ri-shopping-cart-fill text-2xl"></i>
              <button className="flex items-center gap-2">
                <i className="ri-logout-box-r-fill text-2xl"></i> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
