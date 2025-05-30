"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from "next-auth/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userType, setUserType] = useState("");
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserType = localStorage.getItem("userType") || "";
            setUserType(storedUserType);
        }
    },[]);
    const handleLogout = () => {
        localStorage.removeItem("userType"); // Clear user type from local storage
        setUserType(""); // Reset user type state
        signOut({ callbackUrl: "/" });  // Redirect to home page after logout
    };


    const renderNavLinks = () => {
        if (userType === 'admin') {
            return (
                <>
                    <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                        Home
                    </Link>
                    <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition-colors">
                        <span className="flex items-center">

                            <span>Cart</span>
                        </span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                    >

                        <span>Logout</span>
                    </button>
                </>
            );
        } else if (userType === 'user') {
            return (
                <>
                    <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                        Home
                    </Link>
                    <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition-colors">
                        <span className="flex items-center">

                            <span>Cart</span>
                        </span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                    >

                        <span>Logout</span>
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                        Home
                    </Link>
                    <Link href="/signin" className="text-gray-700 hover:text-blue-600 transition-colors">
                        <span className="flex items-center">

                            <span>Sign In</span>
                        </span>
                    </Link>
                    <Link href="/signup" className="text-gray-700 hover:text-blue-600 transition-colors">
                        <span className="flex items-center">

                            <span>Sign Up</span>
                        </span>
                    </Link>
                </>
            );
        }
    };

    const renderMobileNavLinks = () => {
        if (userType === 'admin') {
            return (
                <>
                    <Link
                        href="/"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="flex items-center">

                            <span>Home</span>
                        </span>
                    </Link>
                    <Link
                        href="/cart"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="flex items-center">

                            <span>Cart</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    >

                        <span>Logout</span>
                    </button>
                </>
            );
        } else if (userType === 'user') {
            return (
                <>
                    <Link
                        href="/"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="flex items-center">

                            <span>Home</span>
                        </span>
                    </Link>
                    <Link
                        href="/cart"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="flex items-center">

                            <span>Cart</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    >

                        <span>Logout</span>
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <Link
                        href="/"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="flex items-center">
                            <span>Home</span>
                        </span>
                    </Link>
                    <Link
                        href="/signin"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="flex items-center">
                            <span>Sign In</span>
                        </span>
                    </Link>
                    <Link
                        href="/signup"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="flex items-center">
                            <span>Sign Up</span>
                        </span>
                    </Link>
                </>
            );
        }
    };

    return (
        <nav className="bg-white shadow-lg h-[10vh] py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={80}
                                height={80}
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {renderNavLinks()}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3  bg-white">
                    {renderMobileNavLinks()}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;