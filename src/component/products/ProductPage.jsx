import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Api from '../../Services/Api';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart, FaChevronLeft, FaChevronRight, FaTruck, FaShieldAlt, FaExchangeAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Rating } from 'react-simple-star-rating';
import Footer from '../Footer';
import Header from '../Header';
import Navigation from '../Navigation';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Api.get(`/products/${id}`);
        // Add mock data for demonstration
        const enhancedProduct = {
          ...response.data,
          images: response.data.images || [
            'https://via.placeholder.com/500',
            'https://via.placeholder.com/500?text=Product+2',
            'https://via.placeholder.com/500?text=Product+3'
          ],
          rating: (Math.random() * 1 + 4).toFixed(1),
          reviews: Math.floor(Math.random() * 500),
          discountPercent: response.data.discountPercent,
          discountPrice: response.data.discountPrice,
          originalPrice: response.data.originalPrice,
          offers: [
            'Bank offer 10% off',
            'No cost EMI available',
            'Exchange offer up to ₹15,000'
          ].slice(0, Math.floor(Math.random() * 3) + 1),
          colors: ['Black', 'White', 'Blue', 'Red'],
          sizes: ['S', 'M', 'L', 'XL'],
          deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          }),
          warranty: '1 Year Manufacturer Warranty',
          returnPolicy: '30 Days Return Policy',
          subcategory: response.data.subcategory || 'electronics' // Default subcategory if not provided
        };
        setProduct(enhancedProduct);
        setSelectedColor(enhancedProduct.colors[0]);
        setSelectedSize(enhancedProduct.sizes[0]);

        // Fetch similar products after setting the product
        fetchSimilarProducts(enhancedProduct.subcategory, id, enhancedProduct.name);
      } catch (err) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarProducts = async (subcategory, currentProductId, currentProductName) => {
      try {
        setSimilarLoading(true);
        const response = await Api.get('/products');
        const filteredProducts = response.data
          .filter(p => p.subcategory === subcategory &&
            p.id !== currentProductId &&
            p.name !== currentProductName)
          .slice(0, 4) // Limit to 4 similar products
          .map(p => ({
            ...p,
            images: p.images || ['https://via.placeholder.com/300'],
            rating: (Math.random() * 1 + 3.5).toFixed(1),
            reviews: Math.floor(Math.random() * 200),
            discountPercent: p.discountPercent,
            discountPrice: p.discountPrice,
            originalPrice: p.originalPrice
          }));

        setSimilarProducts(filteredProducts);
      } catch (err) {
        console.error('Error fetching similar products:', err);
      } finally {
        setSimilarLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg max-w-md mx-auto mt-8">
        <h3 className="font-bold mb-2">Error loading product</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  return (
    <>
      <Header />
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li className="text-gray-500">{product.name}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="relative h-80 md:h-96 w-full bg-gray-50 rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="h-full w-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-all"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-all"
                    aria-label="Next image"
                  >
                    <FaChevronRight className="text-sm" />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discountPercent}% OFF
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto py-2 scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 h-16 w-16 border-2 rounded-md overflow-hidden transition-all ${index === currentImageIndex ? 'border-blue-500 scale-105' : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <motion.button
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaShoppingCart />
                Add to Cart
              </motion.button>
              <motion.button
                className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              <motion.button
                onClick={toggleFavorite}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                whileTap={{ scale: 0.9 }}
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-2xl" />
                ) : (
                  <FaRegHeart className="text-2xl" />
                )}
              </motion.button>
            </div>

            <div className="flex items-center mt-2">
              <Rating
                initialValue={parseFloat(product.rating)}
                readonly
                size={20}
                allowFraction
                SVGstyle={{ display: 'inline-block' }}
                className="mr-2"
              />
              <span className="text-gray-700 font-medium">{product.rating}</span>
              <span className="text-gray-500 text-sm ml-2">({product.reviews} reviews)</span>
            </div>

            <div className="mt-4">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">₹{product.discountPrice}</span>
                <span className="text-gray-500 line-through text-lg">₹{product.originalPrice}</span>
                <span className="text-green-600 text-lg font-medium">{product.discountPercent}% off</span>
              </div>

              {/* Color Selection */}
              <div className="mt-6">
                <h3 className="font-medium text-lg mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${selectedColor === color
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-4">
                <h3 className="font-medium text-lg mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 flex items-center justify-center border rounded-md text-sm font-medium transition-all ${selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaTruck className="text-gray-600 text-xl" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-gray-600">Delivery by {product.deliveryDate}</p>
                  </div>
                </div>
              </div>

              {/* Warranty & Return */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-gray-600" />
                  <span className="text-sm">{product.warranty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaExchangeAlt className="text-gray-600" />
                  <span className="text-sm">{product.returnPolicy}</span>
                </div>
              </div>

              {product.offers && product.offers.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-2">Available offers</h3>
                  <ul className="space-y-2">
                    {product.offers.map((offer, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-gray-700">{offer}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Product Details</h2>
          <div className="prose max-w-none">
            <h3 className="font-medium text-lg mb-2">Description</h3>
            <p className="text-gray-700 mb-6">
              {product.description || 'No description available.'}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>

            <h3 className="font-medium text-lg mb-2">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-500">Brand</span>
                  <span className="text-gray-800 font-medium">BrandX</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Color</span>
                  <span className="text-gray-800 font-medium">{selectedColor}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Size</span>
                  <span className="text-gray-800 font-medium">{selectedSize}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-500">Material</span>
                  <span className="text-gray-800 font-medium">Cotton</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Weight</span>
                  <span className="text-gray-800 font-medium">0.5 kg</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">SKU</span>
                  <span className="text-gray-800 font-medium">PRD{id}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
          <div className="flex items-center mb-6">
            <div className="text-4xl font-bold mr-4">{product.rating}</div>
            <div>
              <Rating initialValue={parseFloat(product.rating)} readonly size={25} SVGstyle={{ display: 'inline-block' }} />
              <p className="text-gray-600 mt-1">{product.reviews} ratings</p>
            </div>
          </div>

          {/* Mock Reviews */}
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b pb-4 last:border-0">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Customer {review}</p>
                    <Rating initialValue={5 - review} readonly size={15} SVGstyle={{ display: 'inline-block' }}/>
                  </div>
                </div>
                <p className="text-gray-700">
                  {review === 1 ? "Great product, very comfortable and fits perfectly!" :
                    review === 2 ? "Good quality but the color was slightly different than expected" :
                      "The product is okay, but delivery took longer than promised"}
                </p>
                <p className="text-gray-500 text-sm mt-2">Reviewed on {new Date().toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          <button className="mt-6 text-blue-600 font-medium hover:underline">
            See all reviews
          </button>
        </div>

        {/* Similar Products Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-6">Similar Products</h2>

          {similarLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : similarProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((item) => (
                <motion.div
                  key={item.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/productpage/${item._id}`} className="block">
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Rating
                            initialValue={parseFloat(item.rating)}
                            readonly
                            size={15}
                            className="mr-2"
                            SVGstyle={{ display: 'inline-block' }}
                          />
                        </div>
                        <span className="text-gray-600 text-sm">({item.reviews})</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-bold">
                          ₹{(item.discountPrice || 0).toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-gray-500 line-through text-sm ml-2">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                        {item.discountPercent && (
                          <span className="text-green-600 text-sm ml-2">
                            {item.discountPercent}% off
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No similar products found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;