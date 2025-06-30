// CartPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../Services/Api';

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await Api.get('/cart', {
        });
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await Api.put(`/cart/${itemId}`, {
        quantity: newQuantity
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await Api.delete(`/cart/${itemId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await Api.delete('/cart/clear/all');
      setCart({ items: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + (item.productId?.price * item.quantity), 
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      
      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link 
            to="/products" 
            className="text-purple-600 hover:underline font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.items.map(item => (
              <div key={item._id} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                <img 
                  src={item.productId?.images?.[0] || 'https://via.placeholder.com/150'} 
                  alt={item.productId?.name} 
                  className="w-32 h-32 object-contain" 
                />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.productId?.name}</h3>
                  <p className="text-gray-600">Color: {item.color}</p>
                  {item.size && <p className="text-gray-600">Size: {item.size}</p>}
                  <p className="font-bold mt-2">₹{(item.productId?.price * item.quantity).toLocaleString()}</p>
                  
                  <div className="flex items-center mt-4 gap-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-white text-center w-12">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={clearCart}
              className="mt-4 text-red-500 hover:text-red-700 font-medium"
            >
              Clear Entire Cart
            </button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({cart.items.reduce((total, item) => total + item.quantity, 0)} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg mt-6 transition-colors">
              Proceed to Checkout
            </button>
            
            <Link 
              to="/products" 
              className="block text-center text-purple-600 hover:underline mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;