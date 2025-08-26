import Image from "next/image";
import Link from "next/link";
import React from "react";

const FormBuilder = () => {
  return (
    <section>
      <div className="mx-auto w-full max-w-[500px] px-4 md:max-w-[1030px]">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">
          <div className="w-full">
            <h2 className="mb-5 flex items-center font-heading text-[26px] font-black leading-snug text-black sm:text-[32px] md:text-[26px] lg:text-[32px]">
              Form Builder
              <span className="ml-2 rounded-[10px] rounded-bl-[3px] bg-[#DAF8E6] px-2 py-0.5 text-[10px] font-bold text-fb-green">
                New
              </span>
            </h2>
            <p className="mb-4 text-base text-body-color">
            Crafting custom web forms has never been easier with our user-friendly drag-and-drop form builder.
            </p>
            <p className="mb-8 text-base text-body-color">
            Thanks to our user-friendly form builder that you can navigate with a simple drag-and-drop. Packed with essential form components, that simplifies and speeds up the process.
            </p>

            <Link href="/builder" className="inline-flex h-12 items-center justify-center rounded-3xl bg-primary px-7 font-heading text-base font-medium text-white duration-300 hover:bg-primary/90">
                Launch Builder
            </Link>
          </div>

          <div className="w-full">
            <div className="relative aspect-[500/340] w-full max-w-[500px] overflow-hidden rounded-xl border border-stroke">
              <Image
                src="/products-feature/form-builder.png"
                alt="Shareable-form"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormBuilder;
