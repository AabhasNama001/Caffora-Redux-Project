




// import { useRef, useState, useEffect } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";


// export default function BestSeller() {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   const [navReady, setNavReady] = useState(false);

//   const products = [
//     {
//       id: 1,
//       title: "1829 Espresso.",
//       desc: "Our seasonal espresso blend, sourced, roasted, and brewed for an exceptional milk-based experience.",
//       price: "£12.00",
//       btn: "BUY NOW",
//     },
//     {
//       id: 2,
//       title: "Roaster’s Spotlight",
//       desc: "Explore the best of our single origin roasts; each delivery is hand-picked by our Roastery team.",
//       price: "£13.50",
//       btn: "SUBSCRIBE NOW",
//     },
//     {
//       id: 3,
//       title: "Galeras Decaf.",
//       desc: "Clean, sweet and complex. Smooth milk chocolate and clear orange acidity for discerning coffee lovers.",
//       price: "£12.00",
//       btn: "BUY NOW",
//     },
//     {
//       id: 4,
//       title: "Rituals Subscription.",
//       desc: "Smooth, everyday coffee. Rituals, on subscription.designed to make every day taste better.",
//       price: "£12.00",
//       btn: "BUY NOW",
//     },
//     ,
//     {
//       id: 5,
//       title: "Rituals Subscription.",
//       desc: "Smooth, everyday coffee. Rituals, on subscription.designed to make every day taste better.",
//       price: "£12.00",
//       btn: "BUY NOW",
//     },
//     ,
//     {
//       id: 6,
//       title: "Rituals Subscription.",
//       desc: "Smooth, everyday coffee. Rituals, on subscription.designed to make every day taste better.",
//       price: "£12.00",
//       btn: "BUY NOW",
//     }
//   ];

//   // When buttons mount and refs are set, notify swiper
//   useEffect(() => {
//     setNavReady(true);
//   }, []);

//   return (
//     <section className="bg-[#FAF4EB] py-12 px-6">
//       <div className="max-w-7xl mx-auto relative">
//         {/* Heading */}
//         <div className="mb-8 text-center md:text-left">
//           <h2 className="text-3xl font-bold text-black mb-2">Subscribe today.</h2>
//           <p className="text-gray-700 max-w-md">
//             WatchHouse. YourHouse. The Modern Coffee experience in the comfort of your own home.
//           </p>
//         </div>

//         {/* Slider */}

//         <Swiper
//           effect={"coverflow"}
//           grabCursor={true}
//           centeredSlides={true}
//           loop={true}
//           breakpoints={{
//             0: {
//               slidesPerView: 1,
//             },
//             768: {
//               slidesPerView: 2,
//             },
//           }}
//           coverflowEffect={{
//             rotate: 50,
//             stretch: 0,
//             depth: 100,
//             modifier: 1,
//             slideShadows: true,
//           }}
//           pagination={{ clickable: true }}
//           modules={[EffectCoverflow, Pagination]}
//           className="w-full max-w-8xl py-12"
//         >
//           {products.map((item) => (
//             <SwiperSlide key={item.id}>
//               <div className="bg-[#DCC4A6] rounded-2xl p-6 flex flex-col h-full shadow-md">
//                 <div className="h-40 bg-gray-200 rounded-xl flex items-center justify-center mb-6">
//                   {/* Placeholder for product image */}
//                   <span className="text-gray-500">Product Image</span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
//                 <p className="text-gray-700 text-sm mb-4">{item.desc}</p>
//                 <p className="text-black font-bold mb-4">{item.price}</p>
//                 <ul className="text-sm text-gray-800 mb-6 space-y-1">
//                   <li>✓ Free UK shipping</li>
//                   <li>✓ Always 10% off</li>
//                   <li>✓ Pause, skip or cancel anytime</li>
//                 </ul>
//                 <button className="mt-auto bg-white text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition">
//                   {item.btn}
//                 </button>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>


//       </div>
//     </section>
//   );
// }



import { useRef, useState, useEffect, useMemo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function BestSeller() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navReady, setNavReady] = useState(false);

  // Memoized products array
  const products = useMemo(() => [
    {
      id: 1,
      title: "1829 Espresso.",
      desc: "Our seasonal espresso blend, sourced, roasted, and brewed for an exceptional milk-based experience.",
      price: "£12.00",
      btn: "BUY NOW",
    },
    {
      id: 2,
      title: "Roaster’s Spotlight",
      desc: "Explore the best of our single origin roasts; each delivery is hand-picked by our Roastery team.",
      price: "£13.50",
      btn: "SUBSCRIBE NOW",
    },
    {
      id: 3,
      title: "Galeras Decaf.",
      desc: "Clean, sweet and complex. Smooth milk chocolate and clear orange acidity for discerning coffee lovers.",
      price: "£12.00",
      btn: "BUY NOW",
    },
    {
      id: 4,
      title: "Rituals Subscription.",
      desc: "Smooth, everyday coffee. Rituals, on subscription.designed to make every day taste better.",
      price: "£12.00",
      btn: "BUY NOW",
    },
    {
      id: 5,
      title: "Rituals Subscription.",
      desc: "Smooth, everyday coffee. Rituals, on subscription.designed to make every day taste better.",
      price: "£12.00",
      btn: "BUY NOW",
    },
    {
      id: 6,
      title: "Rituals Subscription.",
      desc: "Smooth, everyday coffee. Rituals, on subscription.designed to make every day taste better.",
      price: "£12.00",
      btn: "BUY NOW",
    }
  ], []);

  useEffect(() => {
    setNavReady(true);
  }, []);

  if (!products.length) return null;

  return (
    <section className="bg-[#FAF4EB] py-12 px-6">
      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-bold text-black mb-2">Subscribe today.</h2>
          <p className="text-gray-700 max-w-md">
            WatchHouse. YourHouse. The Modern Coffee experience in the comfort of your own home.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="w-full max-w-8xl py-12"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-[#DCC4A6] rounded-2xl p-6 flex flex-col h-full shadow-md">
                <div className="h-40 bg-gray-200 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-gray-500">Product Image</span>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{item.desc}</p>
                <p className="text-black font-bold mb-4">{item.price}</p>
                <ul className="text-sm text-gray-800 mb-6 space-y-1">
                  <li>✓ Free UK shipping</li>
                  <li>✓ Always 10% off</li>
                  <li>✓ Pause, skip or cancel anytime</li>
                </ul>
                <button className="mt-auto bg-white text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition">
                  {item.btn}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
