import Link from "next/link";
import React from "react";

export default function CallToActionSmall() {
  return (
    <div className="px-4 pb-14 pt-[60px] lg:pb-[120px]">
      <div className="relative z-10 overflow-hidden rounded-[22px] bg-black p-9">
        <div className="-mx-4 flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full md:w-[290px]">
            <div className="mb-8 lg:mb-0">
              <h2 className="font-heading text-2xl font-bold text-white">
                Start building automated serverless forms
              </h2>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <div className="items-center sm:flex lg:justify-end">
              <p className="mb-6 font-heading text-base font-medium text-white sm:mb-0 sm:pr-5">
                It’s Free - Try Now
              </p>

              <Link href="/auth/register" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 font-heading text-base font-medium text-white duration-300 hover:bg-fb-primary-hover">
                  Create Your First Form
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[url('/cta/bg.svg')] bg-cover bg-center"></div>
      </div>
    </div>
  );
}
