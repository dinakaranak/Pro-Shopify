import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Api from '../../Services/Api';
import Header from '../Header';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Wishlist = () => {
  const navigate = useNavigate();
  // Destructure functions and state from your contexts
  const { wishlistItems, removeFromWishlist, fetchWishlistItems } = useWishlist();
  const { fetchCartCount } = useCart();

  // Fetches wishlist items on component mount.
  // The dependency array [fetchWishlistItems] is correct as fetchWishlistItems
  // is expected to be stable (e.g., memoized by useCallback in its context).
  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  // Handler for removing an item from the wishlist
  const handleRemoveItem = async (itemId) => {
    // Calling the context function, which presumably handles API calls and state updates
    const success = await removeFromWishlist(itemId);
    if (success) {
      toast.success('Item removed from wishlist');
    } else {
      // You might want to get a specific error message from removeFromWishlist if possible
      toast.error('Failed to remove item');
    }
  };

  // Handler for adding a product to the cart
  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Correctly redirects to login, preserving the current path to return after login
        navigate('/login', { state: { from: '/wishlist' } });
        return;
      }

      await Api.post('/cart', {
        productId,
        quantity: 1 // Always adding one quantity from wishlist to cart
      });

      toast.success('Product added to cart!');
      fetchCartCount(); // Update the cart count in the Header/Navigation
    } catch (error) {
      // Improved error message handling
      toast.error(error.response?.data?.message || 'Failed to add to cart. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Wishlist</h1> {/* Added text color */}

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4 text-gray-300">
              <FaRegHeart className="inline-block" />
            </div>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-6">
              You haven't added any items to your wishlist yet.
            </p>
            <Link
              to="/products"
              className="bg-[#d10024] text-white px-6 py-3 rounded-lg inline-block hover:bg-[#b30020] transition-colors duration-200 ease-in-out" // Added transition
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              // Ensure item._id is unique and stable for keys
              <motion.div
                key={item._id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200" // Added transition
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }} // Transition for individual item animation
              >
                <Link to={`/productpage/${item.product._id}`} className="block">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={item.product.images?.[0] || 'https://via.placeholder.com/300/e0e0e0/ffffff?text=No+Image'} // More descriptive placeholder
                      alt={item.product.name}
                      className="h-full w-full object-contain"
                      loading="lazy" // Add lazy loading for images
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/productpage/${item.product._id}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {item.product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center mb-3"> {/* Removed unnecessary space class */}
                    <div className="font-bold text-lg text-gray-900"> {/* Added text color */}
                      ₹{item.product.discountPrice?.toLocaleString('en-IN') || '0'} {/* Improved currency formatting for India */}
                    </div>
                    {item.product.originalPrice && (
                      <div className="text-gray-500 line-through text-sm ml-2">
                        ₹{item.product.originalPrice.toLocaleString('en-IN')} {/* Improved currency formatting for India */}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between gap-2">
                    <motion.button
                      onClick={() => handleAddToCart(item.product._id)}
                      className="flex-1 bg-[#d10024] text-white py-2 rounded flex items-center justify-center gap-2 text-sm hover:bg-[#b30020] transition-colors duration-200" // Added hover and transition
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </motion.button>

                    <motion.button
                      onClick={() => handleRemoveItem(item._id)} // Correctly using wishlist item's _id for removal
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors duration-200" // Added transition
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Remove from wishlist"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;