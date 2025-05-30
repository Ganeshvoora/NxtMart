"use client";
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { cartContext } from '@/context/context';

interface ItemType {
  id: number;
  name: string;
  image: string;
  price: string; // price is a string like "₹507.63"
  weight?: string;
}

interface ItemProps {
  item: ItemType;
  isCart?: boolean; // Optional prop to indicate if this is in the cart
  quantity: number; // Optional, used for cart items
}

const Item = ({ item, isCart, quantity = 0 }: ItemProps) => {
  const { id, name, image, price, weight} = item;
  const [itemQuantity, setItemQuantity] = useState(0);
  const { setCart } = useContext(cartContext);
  
  useEffect(() => {
    
    setItemQuantity(quantity);
  }, [isCart, quantity]); // Remove cart dependency to avoid infinite loops
  
  function incrementCartItem() {
    setCart(prevCart => {
      const exists = prevCart.some(item => item.id === id);
      if (exists) {
        // Update quantity for existing item
        return prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [
          ...prevCart,
          { id, name, image, price, weight, quantity: 1 }
        ];
      }
    });
  }
  
  function decrementCartItem() {
    setCart(prevCart => {
      const exists = prevCart.some(item => item.id === id);
      if (exists) {
        // Update quantity for existing item
        return prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 1 }
            : item
        );
      } else {
        return prevCart; // Shouldn't happen but just in case
      }
    });
  }

  const handleIncrement = () => {
    setItemQuantity(q => q + 1);
    incrementCartItem();
  };
  
  const handleDecrement = () => {
    setItemQuantity(q => (q > 1 ? q - 1 : 1));
    decrementCartItem();
  };

  return (
    <div className={isCart?"bg-white rounded-lg shadow p-4 w-full min-w-[400px] m-4 loading-lazy":"bg-white rounded-lg shadow p-4 w-full min-w-[200px] max-w-[250px] m-4 loading-lazy"}>
      <div className={isCart ? "flex items-center" : "flex flex-col items-center"}>
        <div className="relative w-full h-[120px] mb-2">
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-800">{name}</h3>
            <p className="text-gray-600 text-sm">{weight}</p>
              <p className="font-medium">{price}</p>
            </div>
            <div>
            {itemQuantity ? <div className="flex items-center border border-green-500 rounded-md">
              <button
                onClick={handleDecrement}
                className="px-2 py-1 text-green-500 font-bold text-lg"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-2">{itemQuantity}</span>
              <button
                onClick={handleIncrement}
                className="px-2 py-1 text-green-500 font-bold text-lg"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div> : <button
              onClick={handleIncrement}
              className="px-4 py-2 bg-green-500 text-white font-bold rounded-md">Add</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;