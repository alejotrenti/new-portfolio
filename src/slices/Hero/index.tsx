"use client";

import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Headset from "./Headset";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          ".name-animation",
          { y: 100, opacity: 0, rotate: 0 },
          {
            delay:0.2,
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            stagger: 0.05
            }
        )
        .fromTo(
          ".job-title",
          { y: 20, opacity: 0, scale: 1.2 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          }
        );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key}-index inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="relative min-h-[80vh] mx-6 w-full flex flex-col justify-center items-center bg-black/30">
        {/* Contenedor del texto */}
        <div className="absolute top-1/2 transform -translate-y-1/2 z-20 text-center">
          <h1
            className="select-none mb-8 text-[clamp(3rem,20vmin,20rem)] font-medium  leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="select-none flex justify-center text-slate-200 text-center ">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="select-none -mt-[.2em] flex justify-center text-slate-200 text-center">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl select-none">
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
      <div className="absolute z-10 w-full h-screen lg:h-3/4 ">
          <Headset />
        </div>
    </Bounded>
  );
};

export default Hero;
