"use client";
import React from "react";
import { usePathname } from 'next/navigation';
import { productsData } from "../Navbar/menuData";
import ExploreProductCard from "./ExploreProductCard";

const ExploreProducts = () => {
  const pathname = usePathname();

  return (
    <section className="px-4">
      <div className="w-full">
        <h2 className="mb-9 font-heading text-[28px] font-black text-black">
          Explore other solutions
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {productsData.map((product, index) => {
            if (product?.link !== pathname) {
              return <ExploreProductCard product={product} key={index} />;
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreProducts;
