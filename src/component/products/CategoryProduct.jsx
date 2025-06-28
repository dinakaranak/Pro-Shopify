import { useContext, useState } from 'react'; // Import useState
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductDetail';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa'; // Removed unused FaChevronLeft, FaChevronRight
import { motion } from 'framer-motion';
import Header from '../Header';
import Navigation from '../Navigation';
import Footer from '../Footer';

const CategoryProduct = () => {
  const { category } = useParams();
  const { product, loading, error } = useContext(ProductContext);
  const navigate = useNavigate()
  const handleClick = (productId) => {
    navigate(`/productpage/${productId}`);
  };

  // console.log('URL Category:', category);
  // console.log('All Products:', product);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
        <p className="text-lg text-gray-600">Failed to load products. Please try again later.</p>
        <p className="text-sm text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }

  // Filter products by category
  // Ensure product is an array before filtering
  const filteredProducts = Array.isArray(product)
    ? product.filter(
        (item) => item.category && item.category.toString().toLowerCase() === category.toLowerCase()
      )
    : [];

  // console.log('Filtered Products:', filteredProducts);

  return (
    <>
    <Header />
    <Navigation />
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 capitalize mb-2">
          {category}
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => ( // Renamed 'product' to 'product' to avoid conflict with `product` from useContext
            <motion.div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white flex flex-col" // Added flex flex-col for better layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              onClick={() => handleClick(product._id)}
            >
              {/* Product Image */}
              <div className="relative h-48 w-full bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={
                    Array.isArray(product.images) && product.images.length > 0
                      ? product.images[0]
                      : 'https://via.placeholder.com/300x300?text=No+Image'
                  }
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {product.discountPrice && product.discountPrice < product.originalPrice && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="mt-4 flex-grow flex flex-col justify-between"> {/* flex-grow to push price/button to bottom */}
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold line-clamp-1" title={product.name}>
                    {product.name} {product.colors ? `(${product.colors})` : ''}
                  </h2>
                  {/* Favorite Button (simplified for per-product) */}
                  <button
                    // You'll need to manage favorite state for each product, perhaps in a parent component or a separate hook/context
                    onClick={() => console.log('Toggle favorite for', product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Toggle favorite"
                  >
                    {/* This would ideally check if product.id is in a favorites list */}
                    <FaRegHeart /> {/* Placeholder: Always show FaRegHeart */}
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                    <span className="text-yellow-500 mr-1">{product.rating || 4.2}</span>
                    <FaStar className="text-yellow-500 text-xs" />
                  </div>
                  <span className="text-gray-500 text-sm ml-2">({product.reviews || 124} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold">₹{product.discountPrice?.toLocaleString() || product.originalPrice?.toLocaleString()}</span>
                  {product.discountPrice && product.discountPrice < product.originalPrice && (
                    <>
                      <span className="text-gray-500 line-through text-sm ml-2">₹{product.originalPrice?.toLocaleString()}</span>
                      <span className="text-green-600 text-sm font-medium ml-2">
                        {Math.round(
                          ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
                        )}% off
                      </span>
                    </>
                  )}
                </div>

                {/* Offers */}
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

                {/* Actions */}
                <div className="mt-4 flex justify-between items-center">
                  <button className="text-sm text-blue-600 font-medium hover:underline">
                    View Details
                  </button>
                  <motion.button
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => console.log('Add to cart:', product.id)}
                  >
                    <FaShoppingCart className="text-xs" />
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 min-h-[40vh]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
            alt="No products found"
            className="w-32 h-32 object-contain mb-4 opacity-70"
          />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No products found in "{category}"
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            We couldn't find any products in this category. Please check back later or browse our
            other categories.
          </p>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default CategoryProduct;