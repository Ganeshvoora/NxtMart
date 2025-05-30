"use client";

import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { cartContext } from '@/context/context';

export default function PaymentSuccess() {
  const { setCart } = useContext(cartContext);
  
  // Clear the cart after successful payment
  useEffect(() => {
    setCart([]);
  }, [setCart]);

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="border-2 border-dashed border-green-200 rounded-lg p-10 max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-green-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
        
        <p className="text-lg mb-2">Thank you for ordering.</p>
        <p className="text-gray-600 mb-8">Your payment is successfully completed.</p>
        
        <Link href="/">
          <button className="bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 transition-colors w-full">
            Return to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}