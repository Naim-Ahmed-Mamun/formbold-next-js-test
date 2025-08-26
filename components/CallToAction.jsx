import Link from "next/link";
import React from "react";

export default function CallToAction() {
  return (
    <section>
      <div className="sm:container">
        <div className="relative z-10 overflow-hidden bg-black px-8 py-12 sm:rounded-[22px] sm:px-12 md:px-[60px] lg:px-10 xl:px-[60px]">
          <div className="-mx-4 flex flex-wrap items-center justify-between">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-8 lg:mb-0">
                <h2 className="font-heading text-[26px]/[32px] font-black text-white sm:text-4xl">
                  Start building automated serverless forms
                </h2>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
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
    </section>
  );
}
