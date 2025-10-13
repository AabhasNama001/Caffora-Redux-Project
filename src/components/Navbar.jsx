import React, { useState, useMemo, lazy, Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { asyncLogoutUser } from "../store/actions/userActions";

// Lazy load heavy components
const GooeyNav = lazy(() => import("./Nav/GooeyNav"));

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    // Get user and authentication state from Redux
    const { users } = useSelector((state) => state.userReducer);
    const isAuthenticated = !!users; // Use !!users to get a boolean value

    const items = useMemo(() => {
        const baseItems = [
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Settings", href: "/settings" },
            { label: "", href: "/cart" },
        ];
        // Add "Create Product" only if the user is an admin
        if (isAuthenticated && users?.isAdmin) {
            baseItems.push({ label: "Create Product", href: "/create-product" });
        }
        return baseItems;
    }, [isAuthenticated, users]);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
    const LogoutUserHandler = () => {
        dispatch(asyncLogoutUser());
        setDropdownOpen(false);
        navigate('/login');
    };
    useEffect(() => {
        function handleClickOutside(event) {
            // Agar dropdown open ho aur click dropdown container ke bahar ho
            if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);
    return (
        <nav className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-md z-50 flex justify-between items-center px-6 md:px-10 py-1 text-white">
            {/* LOGO */}
            <div className="logo">
                <img
                    src="/TLogo.png"
                    alt="Logo"
                    className="w-30 h-auto object-cover lg:w-40"
                />
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex h-25 relative w-fit justify-center items-center">
                <Suspense fallback={<div>Loading Nav...</div>}>
                    <GooeyNav
                        items={items}
                        particleCount={15}
                        particleDistances={[90, 10]}
                        particleR={100}
                        initialActiveIndex={items.findIndex(item => location.pathname.startsWith(item.href))}
                        animationTime={600}
                        timeVariance={300}
                        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                    />
                </Suspense>
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex nav-icons items-center gap-3 relative">
                <NavLink to="/cart" className="text-2xl">
                    <i className="ri-shopping-cart-fill text-[#000000]"></i>
                </NavLink>

                {isAuthenticated ? (
                    <div className="relative">
                        <div className="cursor-pointer flex items-center text-[#000000]" onClick={toggleDropdown}>
                            <i className="ri-user-fill text-2xl"></i>
                            <i className="ri-arrow-down-s-line text-2xl"></i>
                        </div>
                        {dropdownOpen && (
                            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                                <ul className="py-1">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <NavLink to="/settings" className="block">{users.name}</NavLink>
                                    </li>
                                    <li onClick={LogoutUserHandler} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                        <i className="ri-logout-box-r-fill"></i> Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink to="/login" className="px-4 py-2 rounded-md bg-[black] hover:bg-[#232121] transition">
                        Login
                    </NavLink>
                )}
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
                <button onClick={toggleMobileMenu} className="text-[#000000]">
                    {mobileMenuOpen ? (
                        <i className="ri-close-line text-3xl"></i>
                    ) : (
                        <i className="ri-menu-3-line text-3xl"></i>
                    )}
                </button>
            </div>

            {/* Sidebar Drawer for Mobile */}
            <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden h-[100vh] transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="fixed top-0 right-0 w-64 sm:w-80 h-full bg-white/90 z-[49999900] shadow-lg flex flex-col p-6 sm:p-10 text-black">
                    {/* Close Button */}
                    <button className="self-end mb-6" onClick={toggleMobileMenu}>
                        <i className="ri-close-line text-3xl"></i>
                    </button>

                    {/* Nav Links */}
                    <ul className="flex flex-col gap-4 text-lg font-medium">
                        {items.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.href}
                                    onClick={toggleMobileMenu}
                                    className={({ isActive }) => `hover:text-[brown] ${isActive ? 'text-[brown]' : ''}`}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}

                        {/* Conditional Links */}
                        {isAuthenticated ? (
                            <>
                               
                                <li>
                                    <button type="button" onClick={LogoutUserHandler} className="flex items-center gap-2 hover:text-[brown]">
                                        <i className="ri-logout-box-r-fill text-2xl"></i> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink to="/login" onClick={toggleMobileMenu} className="block hover:text-[brown]">
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


