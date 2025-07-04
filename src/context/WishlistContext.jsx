import { createContext, useContext, useState, useEffect } from 'react';
import Api from '../Services/Api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlistCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setWishlistCount(0);
        return;
      }
      
      const response = await Api.get('/wishlist/count', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setWishlistCount(response.data.count);
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
      setWishlistCount(0);
    }
  };

  const fetchWishlistItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setWishlistItems([]);
        return;
      }
      
      const response = await Api.get('/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setWishlistItems(response.data.items || []);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      setWishlistItems([]);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await Api.post('/wishlist', { productId }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      await fetchWishlistCount();
      await fetchWishlistItems();
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return false;
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await Api.delete(`/wishlist/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      await fetchWishlistCount();
      await fetchWishlistItems();
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product._id === productId);
  };

  useEffect(() => {
    fetchWishlistCount();
    fetchWishlistItems();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        wishlistItems,
        fetchWishlistCount,
        fetchWishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);