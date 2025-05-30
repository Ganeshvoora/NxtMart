"use client";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "@/context/context";
import Link from "next/link";
import Item from "@/components/Item";
import PrivateRoute from "@/components/PrivateRoute";

export default function CartPage() {
  const { cart } = useContext(cartContext);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    setTotalItems(cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0));
    setTotalPrice(cart.reduce((sum, item) => {
      // Use parseFloat instead of parseInt to preserve decimals
      const price = parseFloat(item.price.replace(/[₹,]/g, '')) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0));
  }, [cart]);
  
  return (
    <PrivateRoute>
      {cart.length === 0 ? (
        <div className="max-w-4xl mx-auto py-8 min-h-[68vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
          <Link href="/">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700">
              Go to Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-8 min-h-[68vh]">
          <h1 className="text-3xl font-bold mb-6">Items</h1>
          <div className="bg-white rounded-2xl shadow p-8">
            {cart.filter((item) => item.quantity > 0).map((item) => (
              <Item 
                item={item} 
                key={item.id} 
                isCart={true} 
                quantity={item.quantity} 
              />
            ))}
            <div className="flex justify-between items-center mt-8">
              <div className="text-lg">
                Total ({totalItems} items) : <span className="font-bold">₹ {totalPrice.toFixed(2)}</span>
              </div>
              <Link href="/cart/payment">
                <button className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </PrivateRoute>
  );
}