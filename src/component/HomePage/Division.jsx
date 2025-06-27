import { useState, useEffect } from 'react';
import img1 from '../../assets/mug-the-adventure-begins.jpg'
import img2 from '../../assets/Trending.jpg'
import img3 from '../../assets/shoes.jpg'
import img4 from '../../assets/watch.jpg'
import img5 from '../../assets/womens.jpg'
import img6 from '../../assets/wooden-chair.jpg'
import img7 from '../../assets/casual1.jpg'
import img8 from '../../assets/sunglass.jpg'
import img9 from '../../assets/bags.jpg'
import img10 from '../../assets/perfume.jpg'
import img11 from '../../assets/wallet.jpg'
import img12 from '../../assets/belt.jpg'

const Division = () => {
  // Fake API data
  const categories = [
    { id: 1, name: "IPHONE'S", image: img1, link: "/IPHONE'S" },
    { id: 2, name: "MENSWEAR", image: img7, link: "/casual-menswear" },
    { id: 3, name: "SHOES", image: img3, link: "/home-living" },
    { id: 4, name: "WOMENS", image: img5, link: "/kurtas-suit-sets" },
    { id: 5, name: "CHAIRS", image: img6, link: "/formal-shirts" },
    { id: 6, name: "WATCHES", image: img4, link: "/sports-shoes" },
    { id: 7, name: "TRENDING'S", image: img2, link: "/watches" },
    { id: 8, name: "SUNGLASSES", image:img8, link: "/Bags" },
    { id: 9, name: "BAGS", image: img9, link: "/sunglasses" },
    { id: 10, name: "PERFUMES", image: img10, link: "/perfumes" },
    { id: 11, name: "WALLETS", image: img11, link: "/wallets" },
    { id: 12, name: "BELTS", image: img12, link: "/belts" },
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    // Calculate the range of items to display
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisibleItems(categories.slice(startIndex, endIndex));
  }, [currentPage]);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="container mx-auto px-4 py-2 max-w-7xl">
      <div className="">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrev}
            className={`p-2 h-10 mt-[60px] rounded-full ${currentPage === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} focus:outline-none transition-colors`}
            aria-label="Previous"
            disabled={currentPage === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {visibleItems.map((category) => (
          <a 
            key={category.id} 
            href={category.link} 
            className="block group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="ml-2 mr-2 flex flex-col items-center">
              <div className="w-full h-32 mb-4 flex items-center justify-center">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center font-medium text-gray-800 text-sm md:text-base line-clamp-2">{category.name}</h3>
            </div>
          </a>
        ))}
      </div>
          <button 
            onClick={handleNext}
            className={`p-2 h-10 mt-[60px] rounded-full ${currentPage === totalPages - 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} focus:outline-none transition-colors`}
            aria-label="Next"
            disabled={currentPage === totalPages - 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile pagination dots */}
      <div className="flex justify-center mt-8 lg:hidden">
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full ${currentPage === index ? 'bg-gray-800' : 'bg-gray-300'}`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Division;