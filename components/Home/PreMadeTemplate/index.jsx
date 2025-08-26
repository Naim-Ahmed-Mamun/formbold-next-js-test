import Image from "next/image";
import Link from "next/link";
import image from "../../../public/premade-template/image-1.svg";
import image2 from "../../../public/premade-template/image-2.svg";
import image3 from "../../../public/premade-template/image-3.svg";

const index = () => {
  return (
    <section className="py-14 md:pb-20 md:pt-32">
      <div className="container">
        <div
          className={`relative z-10 overflow-hidden rounded-[22px] border border-fb-stroke bg-fb-gray px-6 py-12 sm:px-14 lg:px-10 xl:px-14`}
        >
          <div className="-mx-4 flex flex-wrap items-center lg:flex-nowrap">
            <div className="w-full px-4">
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10ZM6 12C6 10.5858 6 9.87868 6.43934 9.43934C6.87868 9 7.58579 9 9 9H15C16.4142 9 17.1213 9 17.5607 9.43934C18 9.87868 18 10.5858 18 12V16C18 17.4142 18 18.1213 17.5607 18.5607C17.1213 19 16.4142 19 15 19H9C7.58579 19 6.87868 19 6.43934 18.5607C6 18.1213 6 17.4142 6 16V12ZM7 5.25C6.58579 5.25 6.25 5.58579 6.25 6C6.25 6.41421 6.58579 6.75 7 6.75H12C12.4142 6.75 12.75 6.41421 12.75 6C12.75 5.58579 12.4142 5.25 12 5.25H7Z"
                        fill="#F27430"
                      />
                    </svg>
                  </span>
                  <p className="font-heading text-sm font-medium text-fb-orange">
                    Premade Form Templates
                  </p>
                </div>

                <h2 className="mx-auto mb-5 max-w-[490px] font-heading text-2xl font-black text-black sm:text-4xl sm:leading-[45px] lg:ml-0">
                  Ready to use form templates
                </h2>
                <p className="mx-auto mb-10 max-w-[480px] text-base text-body-color lg:ml-0">
                  Tons of free form templates to get started! we crafted all
                  essential form templates that you can start using immediately
                  without coding from scratch.
                </p>

                <Link href="/templates" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 font-heading text-sm font-medium text-white duration-300 hover:bg-fb-primary-hover">
                    Explore Templates
                </Link>
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative z-20 mx-auto aspect-square w-full max-w-[443px] pt-[68px] sm:aspect-[443/406] lg:mr-0">
                <div className="rounded-2xl leading-[0] shadow-[0px_45px_80px_-32px_rgba(107,110,148,0.12)]">
                  <Image src={image} alt="connect-apps-image" />
                </div>
                <div className="absolute left-1/2 top-7 -z-10 w-[calc(100%-56px)] -translate-x-1/2 rounded-[10px] leading-[0] shadow-[-8px_6px_34px_-5px_rgba(107,110,148,0.14)]">
                  <Image src={image2} alt="connect-apps-image" />
                </div>
                <div className="absolute left-1/2 top-0 -z-10 w-[calc(100%-136px)] -translate-x-1/2">
                  <Image src={image3} alt="connect-apps-image" />
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
