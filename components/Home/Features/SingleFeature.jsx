import React from "react";

const SingleFeature = ({ feature }) => {
  const { icon, title, description } = feature;

  return (
    <div className="rounded-[18px] border border-stroke bg-white p-7 shadow-[0px_80px_50px_-32px_rgba(107,110,148,0.04)] duration-300 hover:shadow-[0px_5px_30px_-32px_rgba(107,110,148,0.04)] sm:p-9 lg:p-7 xl:p-9">
      <div className="relative z-20 mb-9 flex aspect-square w-[76px] items-center justify-center rounded-full">
        <span className="relative z-20">{icon}</span>
        <div className="absolute left-0 top-0 z-10 h-full w-full">
          <Lines />
        </div>

        <div className="absolute bottom-2 left-1/2 -z-20 h-7 w-10 -translate-x-1/2 bg-primary blur-[22px]"></div>

        <div className="absolute -left-[7px] -top-1.5">
          <svg
            width="90"
            height="111"
            viewBox="0 0 90 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_960_10739)">
              <circle
                cx="45"
                cy="43"
                r="38"
                fill="url(#paint0_linear_960_10739)"
              />
              <circle
                cx="45"
                cy="43"
                r="40.5"
                stroke="white"
                strokeOpacity="0.7"
                strokeWidth="5"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_960_10739"
                x="0"
                y="0"
                width="90"
                height="111"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="31"
                  operator="erode"
                  in="SourceAlpha"
                  result="effect1_dropShadow_960_10739"
                />
                <feOffset dy="23" />
                <feGaussianBlur stdDeviation="16.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.34211 0 0 0 0 0.315278 0 0 0 0 0.945833 0 0 0 0.59 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_960_10739"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_960_10739"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_960_10739"
                x1="45"
                y1="5"
                x2="45"
                y2="81"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5750F1" />
                <stop offset="1" stopColor="#5750F1" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
        {title}
      </h3>
      <p className="text-base text-body-color">{description}</p>
    </div>
  );
};

export default SingleFeature;

const Lines = () => {
  return (
    <svg
      width="80"
      height="101"
      viewBox="0 0 80 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_960_10741"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="0"
        width="76"
        height="76"
      >
        <circle cx="40" cy="38" r="38" fill="url(#paint0_linear_960_10741)" />
      </mask>
      <g mask="url(#mask0_960_10741)">
        <line
          x1="34.25"
          y1="-2"
          x2="34.25"
          y2="79"
          stroke="url(#paint1_linear_960_10741)"
          strokeWidth="0.5"
        />
        <line
          x1="40.25"
          y1="-2"
          x2="40.25"
          y2="79"
          stroke="url(#paint2_linear_960_10741)"
          strokeWidth="0.5"
        />
        <line
          x1="46.25"
          y1="-2"
          x2="46.25"
          y2="79"
          stroke="url(#paint3_linear_960_10741)"
          strokeWidth="0.5"
        />
        <line
          x1="-3"
          y1="43.75"
          x2="78"
          y2="43.75"
          stroke="url(#paint4_linear_960_10741)"
          strokeWidth="0.5"
        />
        <line
          x1="-3"
          y1="37.75"
          x2="78"
          y2="37.75"
          stroke="url(#paint5_linear_960_10741)"
          strokeWidth="0.5"
        />
        <line
          x1="-3"
          y1="31.75"
          x2="78"
          y2="31.75"
          stroke="url(#paint6_linear_960_10741)"
          strokeWidth="0.5"
        />
        <g filter="url(#filter0_d_960_10741)">
          <circle cx="40" cy="38" r="38" fill="url(#paint7_radial_960_10741)" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_960_10741"
          x="0"
          y="0"
          width="80"
          height="101"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="31"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_960_10741"
          />
          <feOffset dy="23" />
          <feGaussianBlur stdDeviation="16.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.34211 0 0 0 0 0.315278 0 0 0 0 0.945833 0 0 0 0.59 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_960_10741"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_960_10741"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_960_10741"
          x1="40"
          y1="0"
          x2="40"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5750F1" />
          <stop offset="1" stopColor="#5750F1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_960_10741"
          x1="34.5001"
          y1="-2"
          x2="34.5001"
          y2="79"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.515625" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_960_10741"
          x1="40.5001"
          y1="-2"
          x2="40.5001"
          y2="79"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.515625" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_960_10741"
          x1="46.5001"
          y1="-2"
          x2="46.5001"
          y2="79"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.515625" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_960_10741"
          x1="-3"
          y1="43.4999"
          x2="78"
          y2="43.4999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.515625" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_960_10741"
          x1="-3"
          y1="37.4999"
          x2="78"
          y2="37.4999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.515625" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_960_10741"
          x1="-3"
          y1="31.4999"
          x2="78"
          y2="31.4999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.515625" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint7_radial_960_10741"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(40 38) rotate(90) scale(38)"
        >
          <stop offset="0.286458" stopColor="#8883FF" />
          <stop offset="1" stopColor="#5750F1" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
