import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaPinterestP, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Contact Information */}
          <div className="text-center mb-6">
            <p className="text-lg">For any queries, contact +91-9876543210</p>
            <p className="text-lg">or mail us help@nxtmart.co.in</p>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-8">
            <Link href="https://facebook.com" aria-label="Facebook" className="bg-white p-3 rounded-md hover:opacity-80 transition">
              <FaFacebookF className="text-green-900 text-xl" />
            </Link>
            
            <Link href="https://pinterest.com" aria-label="Pinterest" className="bg-white p-3 rounded-md hover:opacity-80 transition">
              <FaPinterestP className="text-green-900 text-xl" />
            </Link>
            
            <Link href="https://twitter.com" aria-label="Twitter" className="bg-white p-3 rounded-md hover:opacity-80 transition">
              <FaTwitter className="text-green-900 text-xl" />
            </Link>
            
            <Link href="https://instagram.com" aria-label="Instagram" className="bg-white p-3 rounded-md hover:opacity-80 transition">
              <FaInstagram className="text-green-900 text-xl" />
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <p>Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer