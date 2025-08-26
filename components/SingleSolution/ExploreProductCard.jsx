import Link from "next/link";
import React from "react";

const ExploreProductCard = ({ product }) => {
  const { icon, title, desc, link } = product;
  return (
    <div className="w-full rounded-[18px] border border-stroke bg-white p-9 shadow-[0px_80px_50px_-32px_rgba(107,110,148,0.04)] duration-300">
      <div className="mb-5 text-primary">{icon}</div>

      <div>
        <h3 className="mb-3 font-heading text-2xl font-bold text-black">
          {title}
        </h3>

        <p className="mb-[22px] text-base text-body-color">{desc}</p>

        <Link href={link} className="group/link inline-flex items-center gap-2 font-heading text-base font-medium text-black">
            <span className="group-hover/link:underline">Explore product</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.1023 4.10225C10.3219 3.88258 10.6781 3.88258 10.8977 4.10225L15.3977 8.60225C15.6174 8.82192 15.6174 9.17808 15.3977 9.39775L10.8977 13.8977C10.6781 14.1174 10.3219 14.1174 10.1023 13.8977C9.88258 13.6781 9.88258 13.3219 10.1023 13.1023L13.642 9.5625H3C2.68934 9.5625 2.4375 9.31066 2.4375 9C2.4375 8.68934 2.68934 8.4375 3 8.4375H13.642L10.1023 4.89775C9.88258 4.67808 9.88258 4.32192 10.1023 4.10225Z"
                fill="#0E0B3D"
              />
            </svg>
        </Link>
      </div>
    </div>
  );
};

export default ExploreProductCard;
