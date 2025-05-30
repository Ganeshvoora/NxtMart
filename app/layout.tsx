"use client";

import "./globals.css";
import CartProvider from "@/components/CartProvider";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Declare the cart state


  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CartProvider>
            {children}
            <Footer/>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
