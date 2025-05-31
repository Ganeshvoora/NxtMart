"use client"
import React,{ useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";


const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password
        });

        if (res?.error) {
            setError("Invalid username or password");
        } else {
            localStorage.setItem("userType", "user"); // Set user type in local storage
            router.push("/");  // Redirect to your dashboard or home page
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
                        <label className='block text-gray-700 mb-2' htmlFor="userName">Username</label>
                        <input type="text" id="userName" className='border border-gray-300 p-2 w-full rounded' required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2' htmlFor="password">Password</label>
                        <input type="password" id="password" className='border border-gray-300 p-2 w-full rounded' required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded w-full' onClick={handleSubmit}>Sign In</button>
                </form>
                <p>{error}</p>
            </div>

        </div>
    )
}

export default Signin
