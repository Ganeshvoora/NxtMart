"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Make a POST request to your signup API endpoint
        const res = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        console.log(res);

        if (res.status == 201) {
            // Redirect to the sign-in page or dashboard after successful signup
            router.push('/signin');
        } else {
            const errorData = await res.json();
            setError(errorData.message || "An error occurred during signup");
            console.error("Signup error:", errorData);
        }
    };
    return (
        <div className='min-h-[90vh] flex justify-center items-center' style={{ backgroundImage: "url('./signinbg.png')" }}>
            <div className='bg-white p-8 rounded-lg shadow-md flex flex-col items-center'>
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={90}
                    height={90}
                />
                <form>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2' htmlFor="email">Email</label>
                        <input type="text" id="email" className='border border-gray-300 p-2 w-full rounded' required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2' htmlFor="username">Username</label>
                        <input type="text" id="userName" className='border border-gray-300 p-2 w-full rounded' required  value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2' htmlFor="password">Password</label>
                        <input type="password" id="password" className='border border-gray-300 p-2 w-full rounded' required  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded w-full' onClick={handleSubmit}>Sign Up</button>
                </form>
            </div>

        </div>
    )
}

export default signup
