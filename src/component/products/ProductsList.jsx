import React, { useState, useEffect } from 'react';
import Api from '../../Services/Api';
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate()
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
const handleClick = () => {
    navigate(`/productpage/${product._id}`);
  };
  return (
    <motion.div 
      className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
     onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold line-clamp-1">
          {product.name} ({product.colors})
        </h2>
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            Assured
          </span>
          <button 
            onClick={toggleFavorite}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        </div>
      </div>
      
      {/* Rating */}
      <div className="flex items-center mt-2">
        <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
          <span className="text-yellow-500 mr-1">{product.rating || 4.2}</span>
          <FaStar className="text-yellow-500 text-xs" />
        </div>
        <span className="text-gray-500 text-sm ml-2">({product.reviews || 124} reviews)</span>
      </div>
      
      {/* Image Carousel */}
      <div className="relative mt-4 overflow-hidden rounded-lg">
        <div className="relative h-48 w-full bg-gray-100">
          {product.images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`${product.name} - ${index + 1}`}
              className={`absolute h-[200px] w-full object-cover transition-opacity duration-300 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
        
        {/* Navigation Arrows - Only show if hovered and multiple images */}
        {product.images.length > 1 && isHovered && (
          <>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-sm" />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <FaChevronRight className="text-sm" />
            </motion.button>
          </>
        )}
        
        {/* Dots Indicator */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-black w-3' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex items-center">
          <span className="text-lg font-bold">₹{product.discountPrice.toLocaleString()}</span>
          <span className="text-gray-500 line-through text-sm ml-2">₹{product.originalPrice.toLocaleString()}</span>
          <span className="text-green-600 text-sm font-medium ml-2">{product.discountPercent}% off</span>
        </div>
        
        {product.offers && (
          <div className="mt-2 text-xs text-green-700">
            {product.offers.map((offer, i) => (
              <div key={i} className="flex items-start mb-1">
                <span className="mr-1">•</span>
                <span>{offer}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 flex justify-between">
          <button className="text-sm text-purple-600 font-medium hover:underline">
            View Details
          </button>
          <motion.button 
            className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className="text-xs" />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Api.get('/products');
        // Add some mock data for demonstration
        const enhancedProducts = response.data.map(product => ({
          ...product,
          rating: (Math.random() * 1 + 4).toFixed(1),
          reviews: Math.floor(Math.random() * 500),
          offers: [
            'Bank offer 10% off',
            'No cost EMI available',
            'Exchange offer up to ₹15,000'
          ].slice(0, Math.floor(Math.random() * 3) + 1)
        }));
        setProducts(enhancedProducts);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = () => {
    let result = [...products];
    
    // Apply filters
    if (filter === 'discount') {
      result = result.filter(p => p.discountPercent > 20);
    } else if (filter === 'new') {
      result = result.slice(0, 5); // Just an example
    }
    
    // Apply sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    return result;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg max-w-md mx-auto mt-8">
        <h3 className="font-bold mb-2">Error loading products</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Trending Products</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="filter" className="text-sm font-medium text-gray-700">Filter:</label>
            <select 
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Products</option>
              <option value="discount">Big Discounts</option>
              <option value="new">New Arrivals</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select 
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredProducts().length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-700">No products match your filters</h3>
          <button 
            onClick={() => {
              setFilter('all');
              setSortBy('featured');
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      {filteredProducts().length > 0 && (
        <div className="mt-8 flex justify-center">
          <button className="border border-purple-500 text-purple-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;