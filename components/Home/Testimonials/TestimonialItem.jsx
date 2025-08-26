import Image from "next/image";
import React from "react";

const starIcon = (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.3078 5.40785L10.6221 4.68335L8.49924 0.232874C8.34391 -0.0776246 7.9297 -0.0776246 7.77437 0.232874L5.65153 4.70923L0.991652 5.40785C0.655105 5.4596 0.525664 5.89947 0.784546 6.13235L4.1759 9.62546L3.37337 14.5158C3.32159 14.8522 3.65814 15.1368 3.9688 14.9298L8.18858 12.6269L12.3825 14.9298C12.6672 15.0851 13.0297 14.8263 12.952 14.5158L12.1495 9.62546L15.5408 6.13235C15.7479 5.89947 15.6444 5.4596 15.3078 5.40785Z"
      fill="#FBB040"
    />
  </svg>
);

export default function TestimonialItem({ testimonialItem }) {
  const { authorImage, imageAlt, description, name, designation } =
    testimonialItem;

  let rattingIcons = [];
  for (let index = 0; index < 5; index++) {
    rattingIcons.push(<span key={index}>{starIcon}</span>);
  }

  return (
    <div className="relative rounded-xl bg-white p-7.5 shadow-fb-one duration-300 hover:shadow-[0px_20px_60px_-32px_rgba(107,110,148,0.05)]">
      <div className="mb-5 flex items-center space-x-0.5">{rattingIcons}</div>
      <div className="mb-6">
        <p className="text-sm leading-[24px] text-body-color">“{description}</p>
      </div>

      <div className="flex items-center">
        <div className="mr-4 aspect-square w-[50px] rounded-full">
          <Image src={authorImage} alt={imageAlt} />
        </div>
        <div>
          <h3 className="mb-1 font-heading text-sm font-medium text-black">
            {name}
          </h3>
          <span className="block text-xs text-body-color">{designation}</span>
        </div>
      </div>
    </div>
  );
}
