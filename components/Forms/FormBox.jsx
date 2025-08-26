import Link from "next/link";
import React from "react";
import Image from "next/image";

const FormBox = ({ data }) => {
  return (
    <div className="hover:shadow-integration mb-8 flex flex-col rounded-[10px] border border-[#E1E4E7] bg-[#fdfdfd] p-6 hover:bg-white sm:p-[30px] md:p-6 xl:p-[30px]">
      <Image
        src={data.logo}
        className="size-15 mb-5 object-contain"
        width={60}
        height={60}
        alt="Logo"
        role="presentation"
      />

      <h3 className="mb-3 text-xl font-semibold text-black sm:text-2xl md:text-xl xl:text-2xl">
        {data.title}
      </h3>
      <p className="text-body-color mb-[30px] text-base">{data.desc}</p>

      <Link
        href={`/platforms/${data.path}`}
        className="border-stroke hover:border-primary hover:text-primary mt-auto inline-flex max-w-fit items-center justify-center rounded-[5px] border bg-white px-[18px] py-2 text-sm text-black"
      >
        View {data.title}
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

export default FormBox;
