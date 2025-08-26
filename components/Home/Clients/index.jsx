import Image from "next/image";
import React from "react";
import image1 from "../../../public/clients/image-01.svg";
import image2 from "../../../public/clients/image-02.svg";
import image3 from "../../../public/clients/image-03.svg";
import image4 from "../../../public/clients/image-04.svg";
import image5 from "../../../public/clients/image-05.svg";

const images = [
  {
    id: 1,
    image: image1,
    link: "https://onepagelove.com/",
    name: "onepagelove",
  },
  {
    id: 2,
    image: image2,
    link: "https://metamap.com",
    name: "metamap",
  },
  {
    id: 3,
    image: image3,
    link: "https://www.zavvy.io/",
    name: "zavvy",
  },
  {
    id: 4,
    image: image4,
    link: "https://asuratechnologies.com/",
    name: "asura",
  },
  {
    id: 5,
    image: image5,
    link: "#",
    name: "FC",
  },
];

const startIcon = (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1335_4479)">
      <path
        d="M15.9164 5.975L11.3914 5.275L9.34142 0.975C9.19142 0.675 8.79142 0.675 8.64142 0.975L6.59141 5.3L2.09142 5.975C1.76642 6.025 1.64142 6.45 1.89142 6.675L5.16642 10.05L4.39142 14.775C4.34142 15.1 4.66641 15.375 4.96641 15.175L9.04142 12.95L13.0914 15.175C13.3664 15.325 13.7164 15.075 13.6414 14.775L12.8664 10.05L16.1414 6.675C16.3414 6.45 16.2414 6.025 15.9164 5.975Z"
        fill="#FFA645"
      />
    </g>
    <defs>
      <clipPath id="clip0_1335_4479">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0.991455)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default function Clients() {
  return (
    <section className="bg-white pb-5 pt-14 md:pb-10 md:pt-20">
      <div className="container">
        {/* <div className="flex">
          <div className="w-full">
            <SectionTitle
              title="Notable Users"
              paragraph="You’re in good company, check out who are using FormBold with their projects."
              paraWidth="690"
              center
              margin="mb-10"
            />
          </div>
        </div> */}

        <div className="mb-12 flex flex-wrap items-center gap-5 sm:flex-nowrap sm:justify-center">
          <div className="inline-flex items-center rounded-lg border border-stroke px-5 py-3">
            <div className="mr-3">
              <svg
                width="23"
                height="31"
                viewBox="0 0 23 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.14195 18.0334L0.853399 27.1792C0.719135 27.4556 0.861297 27.6294 1.31147 27.5425L4.80234 26.7843C4.87143 26.76 4.94753 26.7659 5.01209 26.8004C5.07666 26.835 5.12377 26.895 5.14195 26.9659L6.71362 30.1883C6.86369 30.5358 7.03744 30.6069 7.1717 30.3304L11.7367 20.7582L5.14195 18.0334Z"
                  fill="#DE7818"
                />
                <path
                  d="M18.3633 18.0334L22.6518 27.1792C22.794 27.4556 22.6439 27.6294 22.1938 27.5425L18.7029 26.7843C18.6338 26.7609 18.5581 26.7672 18.4938 26.8016C18.4294 26.836 18.3822 26.8955 18.3633 26.9659L16.7916 30.1883C16.6415 30.5358 16.4757 30.6069 16.3335 30.3304L11.7686 20.7582L18.3633 18.0334Z"
                  fill="#DE7818"
                />
                <path
                  d="M10.4654 23.4196C10.4654 23.4275 10.4496 23.4196 10.4338 23.4196C8.04073 23.1544 5.79715 22.124 4.03651 20.4816C4.02861 20.4737 4.00492 20.4658 4.01282 20.4579L4.21027 20.0393C4.21817 20.0235 4.23396 20.063 4.24186 20.0709C5.93201 21.6426 8.27768 22.6298 10.6786 22.9221C10.6865 22.9221 10.7023 22.9221 10.7023 22.93L10.4654 23.4196Z"
                  fill="#B35454"
                />
                <path
                  d="M11.7528 22.9774C17.9598 22.9774 22.9915 17.9456 22.9915 11.7387C22.9915 5.53173 17.9598 0.5 11.7528 0.5C5.54589 0.5 0.51416 5.53173 0.51416 11.7387C0.51416 17.9456 5.54589 22.9774 11.7528 22.9774Z"
                  fill="#F0CD0A"
                />
                <path
                  d="M11.753 21.4293C17.105 21.4293 21.4437 17.0906 21.4437 11.7386C21.4437 6.38653 17.105 2.04785 11.753 2.04785C6.40093 2.04785 2.06226 6.38653 2.06226 11.7386C2.06226 17.0906 6.40093 21.4293 11.753 21.4293Z"
                  fill="#D2B309"
                />
                <path
                  d="M12.0205 21.3924C17.1981 21.3924 21.3953 17.1952 21.3953 12.0176C21.3953 6.84006 17.1981 2.64282 12.0205 2.64282C6.84299 2.64282 2.64575 6.84006 2.64575 12.0176C2.64575 17.1952 6.84299 21.3924 12.0205 21.3924Z"
                  fill="#E3C101"
                />
                <path
                  d="M13.1641 7V16H11.7324V8.47498H11.677L9.41406 9.99753V8.58917L11.774 7H13.1641Z"
                  fill="white"
                />
                <path
                  d="M14.3984 3.80908C17.995 4.66773 20.5622 7.84078 20.6512 11.5373C20.7402 15.2338 18.3286 18.5268 14.7775 19.5575C16.9574 17.891 18.4027 15.0478 18.4027 11.8175C18.4027 8.40565 16.7915 5.42815 14.3984 3.80908Z"
                  fill="white"
                  fillOpacity="0.2"
                />
                <path
                  d="M13.0402 23.4197C13.0481 23.4276 13.0639 23.4197 13.0718 23.4197C15.528 23.1117 17.7868 22.1245 19.4848 20.4975C19.4927 20.4896 19.5164 20.4817 19.5085 20.4738L19.3111 20.0552C19.3032 20.0394 19.2874 20.0789 19.2795 20.0868C17.5893 21.6585 15.2358 22.6299 12.8269 22.9221C12.819 22.9221 12.8032 22.9221 12.8032 22.93L13.0402 23.4197Z"
                  fill="#B35454"
                />
              </svg>
            </div>
            <div>
              <span className="block text-[10px]/[12px] font-medium text-body-color">
                Product Hunt
              </span>
              <span className="whitespace-nowrap font-heading text-sm font-bold text-black">
                #1 Product of the Day
              </span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center">
              {startIcon}
              {startIcon}
              {startIcon}
              {startIcon}
              {startIcon}
            </div>
            <p className="font-heading text-base font-medium text-body-color md:text-lg">
              4.8 Ratings on producthunt and trusted by
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center">
          {images.map((imageItem, id) => (
            <ImageItem imageItem={imageItem} key={id} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ImageItem = ({ imageItem }) => {
  const { image, link, name } = imageItem;
  return (
    <a
      href={link}
      name="image"
      target="_blank"
      rel="noreferrer"
      className="m-3 flex h-[70px] w-[150px] items-center justify-center rounded-lg p-3 md:h-[90px] xl:w-[210px] "
    >
      <Image src={image} alt={name} />
    </a>
  );
};
