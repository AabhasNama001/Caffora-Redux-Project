import { useRef, useState, useEffect, useMemo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

export default function BestSeller() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navReady, setNavReady] = useState(false);

  // Memoized products array
  const products = useMemo(() => [
    {
      id: 1,
      image: "/CoffeeBeans/coffeebean1a.jpg",
      categ: "Coffee Beans",
      desc: "Sourced globally, perfectly roasted beans; the foundation for your daily, aromatic ritual.",
      btn: "Explore More",
    },
    {
      id: 2,
       image: "/InstaPour/insta8a.jpg",
      categ: "Insta Pour",
      desc: "Instant, premium flavor; rich coffee ready in seconds, effortlessly elevating your day.",
      price: "£13.50",
      btn: "Explore More",
    },
    {
      id: 3,
       image: "/Equipments/filter2a.jpg",
      categ: "Coffee Equipments",
      desc: "Tools for the artisan; machines and accessories to grind, brew, and master your perfect cup.",
      btn: "Explore More",
    },
    {
      id: 4,
       image: "/Coffees/coffee7a.jpg",
      categ: "Coffees",
      desc: "Curated blends and unique single-origins, offering endless flavor journeys for every palate.",
      btn: "Explore More",
    },
    {
      id: 5,
       image: "/Glasses&Mugs/mug6a.jpg",
      categ: "Glasses & Mugs",
      desc: "Stylish vessels for sipping; durable, ergonomic drinkware that enhances every coffee experience.",
      btn: "Explore More",
    },
    
  ], []);
  const navigate = useNavigate();
const ExploreMoreHandler = ()=>{
  navigate('/products')
}
  useEffect(() => {
    setNavReady(true);
  }, []);

  if (!products.length) return null;

  return (
    <section className="bg-[#FAF4EB] py-12 px-6">
      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <div className="mb-8 text-center md:text-left flex flex-col items-center justify-center sm:gap-2 md:gap-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-2 md:text-6xl">Collections</h2>
          <p className="text-gray-700 max-w-md text-center">
            CAFFORA. YourHouse. The Modern Coffee experience in the comfort of your own home.
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
                <div className=" bg-gray-200 rounded-xl  mb-6">
                  <span className="text-gray-500">  <img className="h-[350px] w-full object-cover rounded-xl" src ={item.image}/></span>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{item.categ}</h3>
                <p className="text-gray-700 text-sm mb-4">{item.desc}</p>
               
                <ul className="text-sm text-gray-800 mb-6 space-y-1">
                  <li>✓ Free UK shipping</li>
                  <li>✓ Always 10% off</li>
                  <li>✓ Pause, skip or cancel anytime</li>
                </ul>
                <button onClick={ExploreMoreHandler} className="mt-auto bg-white text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer active:scale-[0.96]">
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
