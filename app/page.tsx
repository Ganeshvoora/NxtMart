"use client";
import { useState, useContext, useEffect } from "react";
import Item from "@/components/Item";
import { cartContext } from "@/context/context";
import categoriesOrder from "@/data/categories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// Types for cart items
// Define types that match your data structure
type Product = {
  id: number;         // Note: API returns numeric IDs
  name: string;
  image: string;
  price: string;
  weight: string;
};

type Category = {
  name: string;
  products: Product[];
};
type CartItem = {
  id: number;
  name: string;
  image: string;
  price: string;
  weight?: string;
  quantity: number;
};

export default function Home() {
  const { cart } = useContext(cartContext);
  const [items, setItems] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "/api/products";
      const response = await fetch(url);
      const data = await response.json();
      setItems(data.categories);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <div className="w-screen lg:w-[15vw] h-[10vh] lg:h-screen py-2 px-3.5 flex lg:flex-col items-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <h1>Categories</h1>
          {
            categoriesOrder.map((cat) => (
              <a href={cat === "All" ? "#" : `#${cat.replaceAll(" ", "").replaceAll("&", "").replaceAll(",", "")}`} key={cat === "All" ? "#" : `#${cat.replaceAll(" ", "").replaceAll("&", "").replaceAll(",", "")}`}>
                <button className="focus:bg-green-800 focus:text-white p-2 rounded-lg bg-transparent border-none m-2"
                >
                  {cat}
                </button>
              </a>
            ))
          }
        </div>
        <div className="w-screen lg:w-[85vw] h-[90vh] lg:h-screen p-8 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {
            items.map((item) => (
              <div key={item.name} id={item.name.replaceAll(" ", "").replaceAll("&", "").replaceAll(",", "")}>
                <h1 className="text-2xl font-bold my-4">{item.name}</h1>
                <div className="flex overflow-auto " style={{ scrollbarWidth: "none" }}>
                  {item.products.map((i) => {
                    // Find quantity in cart (if exists) without mutating original data
                    const cartQuantity = cart.find((c: CartItem) => c.id === i.id)?.quantity;
                    console.log(cartQuantity);
                    return <Item key={i.id} item={i} quantity={cartQuantity} />;
                  })}
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Footer />

    </div>

  );
}
