"use client";
import { useState, useContext, useEffect } from 'react';
import { cartContext } from '@/context/context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PrivateRoute from '@/components/PrivateRoute';
export type CartItem = {
  id: string;         
  name: string;       
  image: string;      
  price: string;      
  weight?: string;    
  quantity: number;   
};

const PaymentPage = () => {
  const { cart, setCart } = useContext(cartContext);
  const router = useRouter();
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }

    setTotalItems(cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0));
    setTotalPrice(cart.reduce((sum: number, item: CartItem) => {
      const cleanPrice = parseFloat(item.price.replace(/[₹,]/g, ''));
      return sum + cleanPrice * item.quantity;
    }, 0));
  }, [cart, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Order placed successfully!');
      setCart([]); // Clear cart after successful order
      router.push('/cart/payment/done');
    }, 2000);
  };

  return (
    <PrivateRoute>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Order Summary */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow p-6 mb-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="max-h-[40vh] overflow-y-auto">
                {cart.map((item: CartItem) => (
                  <div key={item.id} className="flex items-center py-3 border-b">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "contain" }}
                        className="rounded"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.weight}</p>
                      <div className="flex justify-between mt-1">
                        <p>₹ {parseFloat(item.price.replace(/[₹,]/g, ''))} × {item.quantity}</p>
                        <p className="font-semibold">₹ {parseFloat(item.price.replace(/[₹,]/g, '')) * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-lg mb-2">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg mb-2">
                  <span>Delivery</span>
                  <span>₹ 40.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>₹ {(totalPrice + 40).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Payment Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-2 border rounded"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-2 border rounded"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-2 border rounded"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1">Address</label>
                    <textarea
                      name="address"
                      className="w-full p-2 border rounded"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      className="w-full p-2 border rounded"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-1">State</label>
                    <select
                      name="state"
                      className="w-full p-2 border rounded"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      {/* Add other states */}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1">PIN Code</label>
                    <input
                      type="text"
                      name="pincode"
                      className="w-full p-2 border rounded"
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h2 className="text-xl font-semibold my-6">Payment Method</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-2"
                    />
                    <label htmlFor="card">Credit/Debit Card</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mr-2"
                    />
                    <label htmlFor="upi">UPI</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mr-2"
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        className="w-full p-2 border rounded"
                        placeholder="XXXX XXXX XXXX XXXX"
                        required={paymentMethod === 'card'}
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          className="w-full p-2 border rounded"
                          placeholder="MM/YY"
                          required={paymentMethod === 'card'}
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block mb-1">CVV</label>
                        <input
                          type="password"
                          name="cardCvv"
                          className="w-full p-2 border rounded"
                          placeholder="XXX"
                          maxLength={3}
                          required={paymentMethod === 'card'}
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="mt-4">
                    <label className="block mb-1">UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      className="w-full p-2 border rounded"
                      placeholder="example@upi"
                      required={paymentMethod === 'upi'}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full mt-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 disabled:bg-gray-400"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default PaymentPage;