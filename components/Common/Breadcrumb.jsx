import Link from "next/link";
import React from "react";

const Breadcrumb = ({ pageTitle, withH1 }) => {
  return (
    <div className="pb-[60px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-2/3 lg:w-1/2">
            <div className="mb-4 md:mb-0">
              {
                withH1 ? (
                  <h1 className="font-heading text-2xl font-bold text-black">
                    {pageTitle}
                  </h1>
                ) : (
                <h3 className="font-heading text-2xl font-bold text-black">
                  {pageTitle}
                </h3>
                )
              }
            </div>
          </div>
          <div className="w-full px-4 md:w-1/3 lg:w-1/2">
            <div>
              <ol className="flex items-center md:justify-end">
                <li className='mr-2 after:pl-2 after:content-["/"]'>
                  <Link href="/" className="text-sm text-body-color duration-300 hover:text-primary">
                      Home
                  </Link>
                </li>
                <li className="text-sm text-body-color">{pageTitle}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
