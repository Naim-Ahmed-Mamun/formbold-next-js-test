import Link from "next/link";
import React from "react";
import HeaderGraphic from "./HeaderGraphic";

const SolutionHeader = ({ subtitle, title, desc, link, buttonText }) => {
  return (
    <section className="relative z-10 overflow-hidden pb-12 pt-24 sm:pt-32 md:pb-16 lg:pt-[140px]">
      <HeaderGraphic />
      <div
        className="absolute left-0 top-0 -z-10 flex h-[370px] w-full items-center justify-center text-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(247, 249, 252, 0.00) 100%, #F7F9FC 0%)",
        }}
      ></div>
      <div className="mx-auto w-full max-w-[770px] text-center">
        <h1 className="mb-6 block font-heading text-2xl font-bold text-black">
          {subtitle}
        </h1>

        <h2 className="mb-3 font-heading text-3xl font-black text-black sm:text-4xl md:text-[40px]/[48px]">
          {title}
        </h2>

        <p className="mx-auto mb-8 w-full max-w-[660px] text-base text-body-color">
          {desc}
        </p>

        <Link href={link} className="inline-flex h-12 items-center justify-center rounded-[50px] bg-primary px-7 font-heading text-base font-medium text-white duration-300 hover:bg-fb-primary-hover">
            {buttonText || "Get Started — It's Free!"}
        </Link>
      </div>
    </section>
  );
};

export default SolutionHeader;
