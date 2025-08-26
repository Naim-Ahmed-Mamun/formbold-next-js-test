import Image from "next/image";
import Link from "next/link";
import React from "react";

const ShareableForm = () => {
  return (
    <section className="pb-14 pt-16 lg:pb-20 lg:pt-[100px]">
      <div className="mx-auto w-full max-w-[500px] px-4 md:max-w-[1030px]">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">
          <div className="w-full">
            <div className="relative aspect-[5/3] w-full max-w-[500px] overflow-hidden rounded-xl border border-stroke">
              <Image
                src="/products-feature/shareable-form.jpg"
                alt="Shareable-form"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="w-full">
            <h2 className="mb-5 font-heading text-[26px] font-black leading-snug text-black sm:text-[32px] md:text-[26px] lg:text-[32px]">
              Shareable Forms
            </h2>
            <p className="mb-4 text-base text-body-color">
            Now, effortlessly design and share online forms for collecting data. You can either share the unique URL online or embed it onto your website.
            </p>
            <p className="mb-8 text-base text-body-color">
            Making the process more convenient and efficient, experience the convenience of creating online forms and gathering data with just a few clicks.
            </p>

            <Link href="/survey-form" className="inline-flex h-12 items-center justify-center rounded-3xl bg-primary px-7 font-heading text-base font-medium text-white duration-300 hover:bg-primary/90">
                Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareableForm;
