import Image from "next/image";
import React from "react";

const SolutionStep = ({ image, title, desc, desc2, right }) => {
  return (
    <div className="mx-auto w-full max-w-[770px] px-4">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className={`w-full ${right ? "md:order-last" : "order-first"}`}>
          <div className="relative aspect-[5/3] w-full max-w-[500px] overflow-hidden rounded-xl border border-stroke">
            <Image
              src={image}
              alt="Shareable-form"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="w-full">
          <h2 className="mb-5 font-heading font-black leading-snug text-black sm:text-2xl">
            {title}
          </h2>
          <p className="mb-4 text-base text-body-color">{desc}</p>
          <p className="text-base text-body-color">{desc2}</p>
        </div>
      </div>
    </div>
  );
};

export default SolutionStep;
