import React, { useState, useMemo } from 'react';
import { ShoppingBag, Star, Truck, RefreshCw, Coffee, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContactSupportPopup from './ContactSupportPopup';

const ProductDetailsBottom = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const allProducts = useSelector((state) => state.productReducer.products); // All products from Redux

  // ----------------------- Static Data -----------------------
  const productDetails = {
    fullDescription: `${product.description}`,
    shippingPolicy:
      "Orders are processed within 1-2 business days. Standard Shipping (3-5 days) is Rs. 50, and Free Shipping is available for orders over Rs. 500. We ship beans in airtight, one-way valve bags to lock in freshness.",
    returnPolicy:
      "Due to the perishable nature of coffee, we do not accept returns. However, if your order arrives damaged or you are unsatisfied, please contact us within 7 days for a replacement or store credit. Customer satisfaction is our highest priority.",
    reviews: [
      { id: 1, author: 'Anya S.', rating: 5, date: 'Oct 1, 2025', comment: 'Absolutely my new favorite! Smooth, rich, and never bitter.' },
      { id: 2, author: 'Ravi M.', rating: 4, date: 'Sep 25, 2025', comment: 'Great coffee for my espresso machine. A little pricey, but worth it.' },
    ],
  };

  // ----------------------- Random Product Selection Logic -----------------------
  const randomRelatedProducts = useMemo(() => {
    // 1. Filter out the current product
    const otherProducts = allProducts.filter(p => p.id !== product.id);

    if (otherProducts.length === 0) {
      return [];
    }

    const numToSelect = 3; // Number of random products to display
    const selectedProducts = [];
    const availableIndices = [...Array(otherProducts.length).keys()]; // Array of indices [0, 1, 2, ...]

    // 2. Select unique random products
    for (let i = 0; i < Math.min(numToSelect, otherProducts.length); i++) {
      // Pick a random index from the available indices
      const randomAvailableIndex = Math.floor(Math.random() * availableIndices.length);

      // Get the actual index in the otherProducts array
      const productIndex = availableIndices[randomAvailableIndex];

      // Add the product to the selected list
      selectedProducts.push(otherProducts[productIndex]);

      // Remove the selected index from the available indices to prevent duplicates
      availableIndices.splice(randomAvailableIndex, 1);
    }

    return selectedProducts;
  }, [allProducts, product.id]); // Recalculate if allProducts or the current product changes


  // ----------------------- Tab Content Renderer -----------------------
  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4 text-[#5B2C06]">
            <p className="leading-relaxed">{productDetails.fullDescription}</p>
            <h4 className="font-semibold text-lg border-b border-[#E3D3B5] pb-2">Brewing Suggestion:</h4>
            <p className="text-sm italic">
              Use a 1:15 coffee-to-water ratio. For pour-over, grind medium-fine. Water temperature: 93°C (200°F).
            </p>
          </div>
        );
      case 'reviews':
        const avgRating = productDetails.reviews.reduce((acc, r) => acc + r.rating, 0) / productDetails.reviews.length;
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 pb-4 border-b border-[#E3D3B5]">
              <span className="text-4xl font-bold text-[#5B2C06]">{avgRating.toFixed(1)}</span>
              <div className="flex flex-col">
                <div className="flex">{Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={20} className={i < Math.round(avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                ))}</div>
                <span className="text-sm text-[#7B5E2E]">{productDetails.reviews.length} Customer Reviews</span>
              </div>
              {/* Add a placeholder for a 'Write a Review' button here */}
            </div>
            {productDetails.reviews.map((review) => (
              <div key={review.id} className="p-4 bg-[#FCF7E6] rounded-lg border border-[#E3D3B5]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-[#5B2C06]">{review.author}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-[#7B5E2E]">{review.date}</span>
                </div>
                <p className="text-[#5B2C06]">{review.comment}</p>
              </div>
            ))}
          </div>
        );
      case 'shipping':
        return (
          <div className="space-y-6 text-[#5B2C06]">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Truck size={20} className="text-[#E17B25]" />
                <h4 className="font-semibold text-lg">Shipping Policy</h4>
              </div>
              <p className="leading-relaxed text-[#7B5E2E]">{productDetails.shippingPolicy}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <RefreshCw size={20} className="text-[#E17B25]" />
                <h4 className="font-semibold text-lg">Returns & Exchange</h4>
              </div>
              <p className="leading-relaxed text-[#7B5E2E]">{productDetails.returnPolicy}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);
  // ----------------------- Main Render -----------------------
  return (
    <div className='w-full max-w-6xl mx-auto mt-16 px-4'>
      {/* -------------------- 1. Information Tabs -------------------- */}
      <div className="bg-white rounded-xl shadow-lg border border-[#E3D3B5] p-6 mb-12">
        <div className="flex flex-wrap border-b border-[#E3D3B5] mb-6">
          {[
            { key: 'description', label: 'Product Details', icon: <Coffee size={20} /> },
            { key: 'reviews', label: `Reviews (${productDetails.reviews.length})`, icon: <Star size={20} /> },
            { key: 'shipping', label: 'Shipping & Returns', icon: <Truck size={20} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 py-3 px-6 md:px-8 font-semibold transition-all ${activeTab === tab.key
                ? 'border-b-4 border-[#E17B25] text-[#E17B25]'
                : 'text-[#7B5E2E] hover:text-[#5B2C06]'
                }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[250px]">{renderTabContent()}</div>
      </div>

      {/* -------------------- 2. Related Products (Random Selection) -------------------- */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-[#5B2C06] mb-8 text-center tracking-wider">
          MORE COFFEE TO EXPLORE ☕
        </h2>

        {randomRelatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {randomRelatedProducts.map((p) => (
              <div
                key={p.id}
                
                className="group bg-white rounded-xl shadow-md overflow-hidden border border-[#E3D3B5] hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="overflow-hidden">
                  <img
                    src={p.image[0]}
                    alt={p.title}
                    className="w-full h-70 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs uppercase font-semibold text-[#E17B25] tracking-widest">{p.category}</p>
                  <h3 className="text-lg font-bold text-[#5B2C06] group-hover:text-[#D26A1F] transition">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-[#E17B25]">Rs. {p.price.toFixed(2)}</span>
                    <NavLink
                      to={`/products/${p.id}`}
                      className="cursor-pointer active:scale-[0.96] flex items-center bg-[#5B2C06] text-white py-2 px-3 rounded-full text-sm hover:bg-[#7B5E2E] transition"
                    >
                      <ShoppingBag size={16} className="mr-1" />
                      View
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-[#7B5E2E]">No other products to recommend right now!</p>
        )}
      </div>

      {/* -------------------- 3. Final Call to Action (Simple Banner) -------------------- */}
      <div className='mt-16 p-8 bg-[#99804D] rounded-xl text-center shadow-2xl'>
        <h3 className='text-2xl font-bold text-white mb-2'>Love Your Coffee, Guaranteed!</h3>
        <p className='text-white text-opacity-80 mb-4'>If you're not completely satisfied, we'll make it right. That's the Caffora promise.</p>
        <div className='flex justify-center'>
          <button onClick={handleOpenPopup} className='flex cursor-pointer active:scale-[0.96] bg-white text-[#ad540c] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition'>
            <Mail size={20} className="mr-2" />
            Contact Support
          </button>
        </div>
      </div>
      <ContactSupportPopup
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
      // onSubmit prop is optional, but useful if the handler is defined here
      />
    </div>
  );
};

export default ProductDetailsBottom;