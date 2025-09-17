// import React from "react";
// import featureImg1 from '../../assets/images/feature1.png'
// import featureImg2 from '../../assets/images/feature2.png'
// import featureImg3 from '../../assets/images/feature3.png'
// const features = [
//   {
//     image: (
//       // Example image, replace with appropriate SVG or custom illustration
//       <img className="w-50 h-30 object-cover" src={featureImg1} />
//     ),
//     title: "Globally sourced. Locally crafted.",
//     description:
//       "Cupped, tested, developed and roasted at our Coffee Lab right here in South London.",
//   },
//   {
//     image: (
//        <img className="w-50 h-30 object-cover" src={featureImg2} />
//     ),
//     title: "Modern Coffee. Holistic approach.",
//     description:
//       "It encapsulates the attention to detail, creativity, and focus on provenance and quality.",
//   },
//   {
//     image: (
//        <img className="w-50 h-30 object-cover" src={featureImg3} />
//     ),
//     title: "No two Houses are the same.",
//     description:
//       "Each of our locations are designed to play a contemporary role in the Modern Coffee experience.",
//   },
// ];

// export default function CoffeeFeatures() {
//   return (
//     <section className="bg-[#f9db9e] py-10 px-4 min-[468px]:px-8 sm:px-12 lg:px-4">
//       <div className="xl:max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-stretch gap-8 2xl:max-w-[1200px] 2xl:gap-13">
//         {features.map((feature, idx) => (
//           <div
//             key={idx}
//             className="flex flex-col items-center  md:text-center flex-1"
//           >
//             <div className="mb-4">{feature.image}</div>
//             <h2 className=" text-center text-lg md:text-2xl font-bold mb-2 text-[#21221C]">
//               {feature.title}
//             </h2>
//             <p className="font-mono text-base text-center text-[#21221C] opacity-80">
//               {feature.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
// // ecdfb9




import React, { useMemo, memo, useRef, useState, useEffect } from "react";
import featureImg1 from "../../assets/images/feature1.png";
import featureImg2 from "../../assets/images/feature2.png";
import featureImg3 from "../../assets/images/feature3.png";

// Individual Feature Card (memoized to avoid re-renders unless props change)
const FeatureCard = memo(({ image, title, description }) => (
  <div className="flex flex-col items-center md:text-center flex-1">
    <div className="mb-4">
      <img
        className="w-50 h-30 object-cover"
        src={image}
        alt={title}
        loading="lazy" // ✅ Lazy loading images
      />
    </div>
    <h2 className="text-center text-lg md:text-2xl font-bold mb-2 text-[#21221C]">
      {title}
    </h2>
    <p className="font-mono text-base text-center text-[#21221C] opacity-80">
      {description}
    </p>
  </div>
));

export default function CoffeeFeatures() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Intersection Observer to render only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ useMemo for static feature data
  const features = useMemo(
    () => [
      {
        image: featureImg1,
        title: "Globally sourced. Locally crafted.",
        description:
          "Cupped, tested, developed and roasted at our Coffee Lab right here in South London.",
      },
      {
        image: featureImg2,
        title: "Modern Coffee. Holistic approach.",
        description:
          "It encapsulates the attention to detail, creativity, and focus on provenance and quality.",
      },
      {
        image: featureImg3,
        title: "No two Houses are the same.",
        description:
          "Each of our locations are designed to play a contemporary role in the Modern Coffee experience.",
      },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#f9db9e] py-10 px-4 min-[468px]:px-8 sm:px-12 lg:px-4"
    >
      <div className="xl:max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-stretch gap-8 2xl:max-w-[1200px] 2xl:gap-13">
        {isVisible &&
          features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
      </div>
    </section>
  );
}


