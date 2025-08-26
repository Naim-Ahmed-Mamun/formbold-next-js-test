import Link from "next/link";
import React from "react";

const PlatformsBox = ({ platform }) => {
  const { icon, title, path, desc } = platform;
  return (
    <div className="mb-8 rounded-[10px] border border-[#E1E4E7] bg-[#fdfdfd] p-6 hover:bg-white hover:shadow-integration sm:p-[30px] md:p-6 xl:p-[30px]">
      <div className="mb-5">{icon}</div>
      <h3 className="mb-3 text-xl font-semibold text-black sm:text-2xl md:text-xl xl:text-2xl">
        {title}
      </h3>
      <p className="mb-[30px] text-base text-body-color">{desc}</p>

      <Link href={`/platforms/${path}`} className="inline-flex items-center justify-center rounded-[5px] border border-stroke bg-white py-2 px-[18px] text-sm text-black hover:border-primary hover:text-primary">
          View Platform
          <span className="ml-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1725_3964)">
                <path
                  d="M10.7817 7.33312L7.20566 3.75712L8.14833 2.81445L13.3337 7.99979L8.14833 13.1851L7.20566 12.2425L10.7817 8.66645H2.66699V7.33312H10.7817Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_1725_3964">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
      </Link>
    </div>
  );
};

export default PlatformsBox;
