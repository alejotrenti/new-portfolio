"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

export default function Avatar({
  image,
  className,
  src,
}: {
  src?: string;
  image?: ImageField;
  className?: string;
}) {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power3.inOut",
        },
      );

      window.onmousemove = (e) => {
        if (!component.current) return; // no component, no animation!
        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;
        const componentCenterY = componentRect.top + componentRect.height / 2;

        let componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
          y: (e.clientY - componentCenterY) / componentRect.height / 2,
        };

        gsap.to(".avatar", {
          x: componentPercent.x * 20,
          y: componentPercent.y * 20,
          rotateY: componentPercent.x * 10,
          rotateX: -componentPercent.y * 10,
          scale: 1 + Math.abs(componentPercent.x) * 0.1,
          borderColor: `rgb(240, 236, 18, ${1 - Math.abs(componentPercent.x)})`,
          duration: 0.5,
          ease: "power3.out",
        });

        let distFromCenterX = 1 - Math.abs(componentPercent.x);
        gsap.to(".highlight", {
          opacity: distFromCenterX - 0.7,
          x: -10 + 20 * componentPercent.x,
          duration: 0.5,
        });
      };
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div
        className="avatar aspect-auto overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0"
        style={{ perspective: "500px", perspectiveOrigin: "150% 150%" }}
      >
        <PrismicNextImage
          field={image}
          className="avatar-image h-full w-full object-cover"
          imgixParams={{ q: 90 }}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}
