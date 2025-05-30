"use client";


import Navbar from "@/components/Navbar";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Declare the cart state


  return (
    <html lang="en">
      <body>
            <Navbar/>
            {children}
      </body>
    </html>
  );
}
