// CollectionAtelier.jsx
import React from "react";
import coffeeImg from '../../assets/products/coffee1.webp'
const CollectionAtelier = () => {
  return (
    <div className=" h-[75vh] flex flex-col md:flex-row items-center justify-center md:justify-between py-10 lg:py-20 px-5 lg:px-20">
      {/* Left: Perfume Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={coffeeImg} // Replace with the correct path
          alt="Perfume Bottle"
          className="rounded-xl h-64 w-64 sm:w-110 sm:h-90 md:w-70 md:h-60 lg:w-90 lg:h-75 xl:w-110 xl:h-90 2xl:w-130 2xl:h-100 object-cover shadow-lg "
        />
      </div>
      {/* Right: Content & Cards */}
      <div className="w-full lg:w-1/2 flex flex-col px-5 lg:px-16 mt-8 lg:mt-0 text-center items-center md:items-start md:text-left">
        <h2 className="text-4xl font-bold mb-2">Collection<br/>Atelier</h2>
        
        {/* Description and Button */}
        <p className="text-gray-600 mb-3 text-sm sm:w-120 md:w-80 font-mono">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the&nbsp;the
        </p>
        <a
          href="#"
          className="text-[#e0ac2b] font-semibold underline hover:text-[#b48c27] transition"
        >
          Koleksiyonu incele &rarr;
        </a>
      </div>
    </div>
  );
};

export default CollectionAtelier;


// bg-[#F6F6ED]