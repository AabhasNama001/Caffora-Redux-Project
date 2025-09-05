import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react'
gsap.registerPlugin(ScrollTrigger);

const lines = [
  " Caffora is where time",
  "slows with every sip.",
  "Rare beans, delicate nuances,",
  "and thoughtful brews to",
  "enrich your routine.",
];
const ScrollReveal = () => {
 
          
      

  
const headingRefs = useRef([]);
    


    useEffect(() => {
        headingRefs.current.forEach((line, i) => {
            const drop = document.createElement("span");
            drop.classList.add("color-overlay");

            Object.assign(drop.style, {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                mixBlendMode: "multiply",
                transformOrigin: "top",
                transform: "scaleY(0)",
                zIndex: 0,
                pointerEvents: "none",
                transition: "transform 0.4s ease",
            });

            line.style.position = "relative";
            line.appendChild(drop);

            ScrollTrigger.create({
                trigger: line,
                start: "top 80%",
                end: "top 40%",
                toggleActions: "play reverse play reverse",
              
                onEnter: () => {
                    drop.style.transform = "scaleY(1)";
                    line.style.color = "white";
                },
                onLeaveBack: () => {
                    drop.style.transform = "scaleY(0)";
                    line.style.color = "";
                },
            });
        });
    }, []);
    return (
        <div>


            <section id="do-it-section" className=" ">
              
                <div className="text-center flex items-center justify-center flex-col ">
                    {lines.map((text, index) => (
                        <h1
                            key={index}
                            ref={(el) => (headingRefs.current[index] = el)}
                            className="text-[#566053] font-semibold relative text-4xl  leading-[48px] w-70 sm:text-5xl sm:leading-[56px] sm:w-90 md:w-150 md:leading-[65px] xl:text-6xl xl:leading-[75px] xl:w-190"
                        >
                            {text}
                        </h1>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ScrollReveal




// text-[29px] leading-[18px] sm:text-[32px] sm:leading-[19px] xl:text-[50px] xl:leading-[40px] 