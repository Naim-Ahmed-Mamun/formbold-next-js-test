import Image from "next/image";
import React, { useState } from "react";
import brandsData from "./brandsData";

function Brands() {
  const [productSubmenu, setProductSubmenu] = useState(false);

  return (
    <div className="group relative hidden py-3 2xl:block">
      <button
        onClick={() => {
          setProductSubmenu(!productSubmenu);
        }}
        className="flex items-center justify-center rounded border-[.3px] border-stroke bg-white px-[10px] py-1 font-heading font-semibold text-black group-hover:bg-bg-color"
        style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.12)" }}
      >
        <span className="mr-[6px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7122 3H15.1628C16.1776 3 17 3.81507 17 4.82097V7.24983C17 8.25572 16.1776 9.0708 15.1628 9.0708H12.7122C11.6974 9.0708 10.875 8.25572 10.875 7.24983V4.82097C10.875 3.81507 11.6974 3 12.7122 3Z"
              fill="#FB6B6A"
            />
            <path
              d="M12.7122 10.9292H15.1628C16.1776 10.9292 17 11.7443 17 12.7502V15.179C17 16.1849 16.1776 17 15.1628 17H12.7122C11.6974 17 10.875 16.1849 10.875 15.179V12.7502C10.875 11.7443 11.6974 10.9292 12.7122 10.9292Z"
              fill="#EC9041"
            />
            <path
              d="M4.83723 10.9292H7.28777C8.30265 10.9292 9.125 11.7443 9.125 12.7502V15.179C9.125 16.1849 8.30265 17 7.28777 17H4.83723C3.82235 17 3 16.1849 3 15.179V12.7502C3 11.7443 3.82235 10.9292 4.83723 10.9292Z"
              fill="#B378C8"
            />
            <path
              d="M4.83723 3H7.28777C8.30265 3 9.125 3.81507 9.125 4.82097V7.24983C9.125 8.25572 8.30265 9.0708 7.28777 9.0708H4.83723C3.82235 9.0708 3 8.25572 3 7.24983V4.82097C3 3.81507 3.82235 3 4.83723 3Z"
              fill="#41B57C"
            />
          </svg>
        </span>
        Brands
      </button>

      <div
        className={`shadow-template shadow-dropdown invisible relative -right-10 top-[115%] z-40 h-[350px] w-[350px] overflow-y-auto rounded-[5px] border border-stroke bg-white p-4 pb-1 opacity-0 transition-all scrollbar-thin scrollbar-track-stroke scrollbar-thumb-primary scrollbar-track-rounded scrollbar-thumb-rounded group-hover:visible group-hover:top-full group-hover:opacity-100 sm:absolute md:right-0 lg:h-auto lg:w-[550px] lg:!overflow-visible ${
          !productSubmenu ? "block" : " block"
        }`}
      >
        <span className="absolute right-6 top-[-6px] hidden h-3 w-3 rotate-45 rounded-sm border-l border-t border-stroke bg-white lg:block" />
        <span className="absolute left-1/2 top-0 hidden h-full w-[1px] -translate-x-1/2 bg-stroke lg:block"></span>
        <div className="-mx-4 flex flex-wrap">
          {brandsData.map((item) => (
            <div key={item.name} className="w-full px-4 lg:w-1/2">
              <a
                href={item?.link}
                target="_blank"
                rel="noopener nofollow noreferrer"
                className={`mb-3 flex w-full rounded px-4 py-[10px] text-sm font-medium text-body-color hover:bg-bg-color hover:text-primary`}
              >
                <div className="mr-3 h-10 w-full max-w-[40px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full"
                    quality={100}
                  />
                </div>
                <div className="w-full">
                  <span className="block text-base font-medium text-black">
                    {item.name}
                  </span>
                  <span className="block text-xs font-normal leading-normal text-body-color">
                    {item.text}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brands;
