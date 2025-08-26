import Image from "next/image";
import image from "../../../public/connect-apps/image-1.svg";
import image2 from "../../../public/connect-apps/image-2.svg";

const index = () => {
  return (
    <section className="pt-14 md:pt-32">
      <div className="sm:container">
        <div
          className={`relative z-10 overflow-hidden border border-fb-stroke bg-fb-gray px-6 py-12 sm:rounded-[22px] sm:px-8 md:px-14`}
        >
          <div className="flex flex-wrap items-center lg:flex-nowrap">
            <div className="w-full">
              <div className="relative z-20 mb-10 text-center lg:mb-0 lg:text-left">
                <div className="mb-4.5 inline-flex items-center rounded-3xl bg-[#F7F2F2] px-3.5 py-2.5">
                  <span className="pr-2.5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8324 21.8013C15.9583 21.1747 20 18.926 20 13.1112C20 7.8196 16.1267 4.29593 13.3415 2.67685C12.7235 2.31757 12 2.79006 12 3.50492V5.3334C12 6.77526 11.3938 9.40711 9.70932 10.5018C8.84932 11.0607 7.92052 10.2242 7.816 9.20388L7.73017 8.36604C7.6304 7.39203 6.63841 6.80075 5.85996 7.3946C4.46147 8.46144 3 10.3296 3 13.1112C3 20.2223 8.28889 22.0001 10.9333 22.0001C11.0871 22.0001 11.2488 21.9955 11.4171 21.9858C10.1113 21.8742 8 21.064 8 18.4442C8 16.3949 9.49507 15.0085 10.631 14.3346C10.9365 14.1533 11.2941 14.3887 11.2941 14.7439V15.3331C11.2941 15.784 11.4685 16.4889 11.8836 16.9714C12.3534 17.5174 13.0429 16.9454 13.0985 16.2273C13.1161 16.0008 13.3439 15.8564 13.5401 15.9711C14.1814 16.3459 15 17.1465 15 18.4442C15 20.4922 13.871 21.4343 12.8324 21.8013Z"
                        fill="#F27430"
                      />
                    </svg>
                  </span>
                  <p className="font-heading text-sm font-medium text-fb-orange">
                    Works with almost anything
                  </p>
                </div>

                <h2 className="mx-auto mb-5 max-w-[490px] font-heading text-2xl font-black text-black sm:text-4xl sm:leading-[45px] lg:ml-0">
                  Connect apps and get notified immediately.
                </h2>
                <p className="mx-auto max-w-[530px] text-sm leading-[24px] text-body-color lg:ml-0">
                  When a new submission is received, get notified immediately
                  with submission data. Connect your form with apps and
                  integrations you like and never miss a submission again.
                  Currently, we have - Slack, Telegram, Zapier, and Webhook
                  integrations and more integrations are coming soon!
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="relative z-20 mx-auto aspect-square w-full max-w-[394px] sm:aspect-[394/373] lg:mr-0">
                <div className="absolute rounded-2xl leading-[0] shadow-[0px_45px_80px_-32px_rgba(107,110,148,0.12)]">
                  <Image src={image} alt="connect-apps-image" />
                </div>
                <div className="absolute right-0 top-7 rounded-[10px] leading-[0] shadow-[-8px_6px_34px_-5px_rgba(107,110,148,0.14)]">
                  <Image src={image2} alt="connect-apps-image" />
                </div>

                <div className="absolute bottom-8 right-12">
                  <svg
                    width="36"
                    height="31"
                    viewBox="0 0 36 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.255716 29.7721C0.275249 29.1236 0.816826 28.6137 1.46536 28.6332C3.93833 28.7077 7.57154 28.005 10.4024 25.7175C11.5318 24.8049 12.5601 23.6188 13.3393 22.0826C11.6838 20.966 10.3754 19.0607 9.51713 16.355C8.52184 13.2174 8.25459 11.9091 8.58751 10.3181C8.75808 9.50302 9.10451 8.79317 9.67782 8.29578C10.2659 7.78561 10.9779 7.59902 11.6699 7.6359C12.9765 7.70553 14.2532 7.55308 15.1819 8.59993C16.1393 9.67902 16.9005 11.1564 17.0508 12.7919C17.3401 15.942 17.0582 18.6027 16.367 20.8336C18.0053 21.1348 19.9821 20.6014 22.0498 19.3082C24.2387 17.9393 26.3717 15.8105 28.0294 13.3517C29.6893 10.8896 30.8211 8.17366 31.0976 5.65864C31.1685 5.0137 31.7489 4.54837 32.3938 4.61928C33.0387 4.6902 33.5041 5.27051 33.4332 5.91545C33.1044 8.90535 31.7885 11.9792 29.9777 14.6651C28.1647 17.3542 25.8041 19.7316 23.2957 21.3003C20.8272 22.8441 18.0553 23.6983 15.4858 23.0448C14.5614 24.9056 13.311 26.388 11.8791 27.5451C8.50237 30.2737 4.27113 31.0684 1.39462 30.9818C0.746091 30.9622 0.236184 30.4207 0.255716 29.7721ZM14.2219 19.8048C14.747 17.9461 14.9589 15.7054 14.711 13.0068C14.614 11.9507 14.1074 11.9292 13.4243 11.1592C12.7126 10.357 11.9761 10.0052 11.5449 9.98218C11.3679 9.97275 11.2798 10.0165 11.2176 10.0706C11.1406 10.1374 10.9865 10.3255 10.8873 10.7994C10.6808 11.7863 10.7973 12.6197 11.7568 15.6446C12.4037 17.684 13.2688 18.999 14.2219 19.8048Z"
                      fill="#C4C3DF"
                    />
                    <path
                      d="M35.8633 7.5199L32.9264 6.36122L31.2144 6.7301L27.0214 8.8876L32.2965 0.943333L35.8633 7.5199Z"
                      fill="#C4C3DF"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-0 z-10 h-full w-full bg-[url('/common/pseudo-bg.png')]"></div>

          <div className="absolute right-0 top-0">
            <svg
              width="361"
              height="310"
              viewBox="0 0 361 310"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.75"
                cx="277"
                cy="33"
                r="227"
                stroke="url(#paint0_linear_198_10175)"
                strokeWidth="100"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_198_10175"
                  x1="72.5"
                  y1="-29.5"
                  x2="437"
                  y2="310"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#5750F1" />
                  <stop offset="1" stopColor="#5750F1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="absolute bottom-0 left-0">
            <svg
              width="537"
              height="474"
              viewBox="0 0 537 474"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="0.786383"
                height="521.187"
                transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 123.232 -47.187)"
                fill="url(#paint0_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="371.992"
                transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 154.066 102.008)"
                fill="url(#paint1_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="337.18"
                transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 184.9 136.82)"
                fill="url(#paint2_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="455.337"
                transform="matrix(1.20101e-07 -1 -1 -1.45893e-07 455.236 444.16)"
                fill="url(#paint3_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="408.793"
                transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 92.3999 65.2065)"
                fill="url(#paint4_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="312.314"
                transform="matrix(1.20101e-07 -1 -1 -1.45893e-07 312.213 413.327)"
                fill="url(#paint5_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="652.697"
                transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 61.5659 -178.698)"
                fill="url(#paint6_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="487.761"
                transform="matrix(1.20101e-07 -1 -1 -1.45893e-07 487.659 382.493)"
                fill="url(#paint7_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="387.906"
                transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 30.7319 86.0938)"
                fill="url(#paint8_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="537.101"
                transform="matrix(1.29039e-07 -1 -1 -1.33335e-07 537 351.66)"
                fill="url(#paint9_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="389.895"
                transform="matrix(1.29039e-07 -1 -1 -1.33335e-07 389.793 320.826)"
                fill="url(#paint10_linear_198_10177)"
              />
              <rect
                width="0.786383"
                height="326.239"
                transform="matrix(1.29039e-07 -1 -1 -1.33335e-07 326.138 289.993)"
                fill="url(#paint11_linear_198_10177)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_198_10177"
                  x1="0.195119"
                  y1="12.6574"
                  x2="2.43865"
                  y2="12.665"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_198_10177"
                  x1="0.195119"
                  y1="9.0341"
                  x2="2.43863"
                  y2="9.04469"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_198_10177"
                  x1="0.195119"
                  y1="8.18866"
                  x2="2.43862"
                  y2="8.20035"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_198_10177"
                  x1="0.195119"
                  y1="11.0582"
                  x2="2.43864"
                  y2="11.0669"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_198_10177"
                  x1="0.195119"
                  y1="9.92785"
                  x2="2.43863"
                  y2="9.93748"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_198_10177"
                  x1="0.195119"
                  y1="7.58478"
                  x2="2.43861"
                  y2="7.59739"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_198_10177"
                  x1="0.195119"
                  y1="15.8512"
                  x2="2.43866"
                  y2="15.8573"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint7_linear_198_10177"
                  x1="0.195119"
                  y1="11.8456"
                  x2="2.43865"
                  y2="11.8537"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint8_linear_198_10177"
                  x1="0.195119"
                  y1="9.42058"
                  x2="2.43863"
                  y2="9.43074"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint9_linear_198_10177"
                  x1="0.195119"
                  y1="13.0439"
                  x2="2.43865"
                  y2="13.0512"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint10_linear_198_10177"
                  x1="0.195119"
                  y1="9.46889"
                  x2="2.43863"
                  y2="9.479"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
                <linearGradient
                  id="paint11_linear_198_10177"
                  x1="0.195119"
                  y1="7.92295"
                  x2="2.43861"
                  y2="7.93503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0208333" stopColor="white" />
                  <stop offset="0.541667" stopColor="#EFF0F3" />
                  <stop offset="1" stopColor="#EBECF2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
