import React from "react";

import Link from "next/link";
import * as data from "./footersLinksData.js";

const FooterLinks = () => {
  return (
    <div className="border-t border-fb-gray-2 py-12 md:py-[70px]">
      <div className="-mx-4 flex flex-wrap">
        <div className="mb-10 w-full px-4 md:w-1/2 lg:mb-0 lg:w-4/12">
          <h3 className="mb-6 text-base font-medium text-black">
            Our Products
          </h3>

          <div className="sm:flex">
            <div className="mb-2.5 space-y-2.5 sm:mb-0 sm:w-1/2">
              {data.productsData.slice(0, 5).map((item, index) => (
                <SingleLink key={index} item={item} />
              ))}
            </div>
            <div className="space-y-2.5 sm:w-1/2">
              {data.productsData.slice(5).map((item, index) => (
                <SingleLink key={index} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-10 w-full px-4 md:w-1/2 lg:mb-0 lg:w-4/12">
          <h3 className="mb-6 text-base font-medium text-black">
            Integrations
          </h3>

          <div className="sm:flex">
            <div className="mb-2.5 space-y-2.5 sm:mb-0 sm:w-1/2">
              {data.integrationsData.slice(0, 5).map((item, index) => (
                <SingleLink key={index} item={item} />
              ))}
            </div>
            <div className="space-y-2.5 sm:w-1/2">
              {data.integrationsData.slice(5).map((item, index) => (
                <SingleLink key={index} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-10 w-full px-4 sm:mb-0 sm:w-1/2 md:w-1/2 lg:w-2/12">
          <h3 className="mb-6 text-base font-medium text-black">
            Support & Docs
          </h3>

          <div className="space-y-2.5">
            {data.supportData.map((item, index) => (
              <SingleLink key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12">
          <h3 className="mb-6 text-base font-medium text-black">
            Useful Links
          </h3>

          <div className="space-y-2.5">
            {data.usefulLinksData.map((item, index) => (
              <SingleLink key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;

const SingleLink = ({ item }) => {
  return (
    <p>
      <Link 
          href={item.link} 
          target={item?.newTab ? "_blank" : null}
          rel={item?.newTab ? "noopener nofollow noreferrer" : null}
          className="flex items-center text-sm text-body-color duration-300 hover:text-black"
        >
          {item.title === "System Status" && (
            <span className="relative mr-2 block h-2 w-2 rounded-full bg-fb-green after:absolute after:left-0 after:top-0 after:h-full after:w-full after:animate-ping after:rounded-full after:bg-fb-green"></span>
          )}
          {item.title}
      </Link>
    </p>
  );
};
