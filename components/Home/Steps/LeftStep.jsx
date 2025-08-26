import Image from "next/image";
import React from "react";

const LeftStep = ({ icon, subTitle, title, paragraph, stepImage, graphic }) => {
  return (
    <div className="relative px-5 pt-[90px] sm:px-10 md:px-5 lg:px-14 xl:px-20">
      <div className="-mx-4 flex flex-wrap items-center md:flex-nowrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-10 w-full max-w-[400px] md:ml-0 md:mb-0">
            <div className="mb-4 inline-flex h-9 items-center rounded-3xl bg-[#EFF1FB] py-2.5 px-3.5">
              <span className="mr-2.5">{icon}</span>
              <p className="font-heading text-sm font-medium text-primary">
                {subTitle}
              </p>
            </div>
            <h2 className="mb-5 font-heading text-[26px] font-black leading-snug text-black sm:text-[32px] md:text-[26px] lg:text-[32px]">
              {title}
            </h2>
            <p className="text-sm leading-[24px] text-body-color">
              {paragraph}
            </p>
          </div>
        </div>
        <div className="w-full px-4">
          <div className="relative mx-auto w-full max-w-[400px] md:mr-0 md:max-w-[415px]">
            <Image src={stepImage} alt="steps image" className="shadow-step" />
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 right-0 -z-10 -translate-y-1/2">
        {graphic}
      </div>
    </div>
  );
};

export default LeftStep;
