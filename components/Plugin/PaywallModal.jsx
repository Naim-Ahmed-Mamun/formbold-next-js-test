import { useRouter } from 'next/navigation';
import React, { useRef } from "react";
import useClickOutside from '../../hooks/useClickOutside';

const PaywallModal = (props) => {
  const router = useRouter();
  const { modalOpen, setModalOpen } = props;

  // click outside delete popup
  const divRef = useRef(null);
  useClickOutside(divRef, () => setModalOpen(false));

  const gotoBillingPage = (e) => {
    e.preventDefault();
    router.push("/account/billing");
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[9999] flex h-full min-h-screen w-full items-center justify-center bg-fb-black/[.85] px-4 py-5">
          <div
            ref={divRef}
            className="relative max-h-full w-full max-w-[600px] overflow-y-auto rounded-xl bg-white px-8 py-12 shadow-fb-seven md:p-12"
          >
            <div>
              <div className="text-center">
                <div className="mb-6 flex items-center justify-center">
                  <svg
                    width="119"
                    height="119"
                    viewBox="0 0 119 119"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.08"
                      cx="59.5"
                      cy="59.5"
                      r="59.5"
                      fill="url(#paint0_linear_155_6422)"
                    />
                    <circle
                      opacity="0.15"
                      cx="59.5014"
                      cy="59.5014"
                      r="49.98"
                      fill="url(#paint1_linear_155_6422)"
                    />
                    <path
                      d="M78.0591 42.6709L78.5655 45.4796L81.3742 45.9859L78.5655 46.4922L78.0591 49.3009L77.5528 46.4922L74.7441 45.9859L77.5528 45.4796L78.0591 42.6709Z"
                      fill="#8099EC"
                    />
                    <path
                      d="M47.9691 46.2412L48.3975 48.6178L50.7741 49.0462L48.3975 49.4746L47.9691 51.8512L47.5406 49.4746L45.1641 49.0462L47.5406 48.6178L47.9691 46.2412Z"
                      fill="#8099EC"
                    />
                    <path
                      d="M62.7584 37.0605L63.2647 39.8692L66.0734 40.3755L63.2647 40.8819L62.7584 43.6906L62.252 40.8819L59.4434 40.3755L62.252 39.8692L62.7584 37.0605Z"
                      fill="#8099EC"
                    />
                    <path
                      d="M43.378 34.5107L44.0401 38.1836L47.713 38.8457L44.0401 39.5079L43.378 43.1808L42.7159 39.5079L39.043 38.8457L42.7159 38.1836L43.378 34.5107Z"
                      fill="#8099EC"
                    />
                    <path
                      d="M49.5407 60.6542L56.5218 53.3903C61.0344 48.695 63.2907 46.3473 65.0102 47.1285C66.7296 47.9096 66.3163 51.0945 65.4896 57.4644L65.4116 58.065C65.1135 60.3625 64.9644 61.5112 65.605 62.327L65.639 62.3694C66.2974 63.172 67.493 63.3272 69.8841 63.6375C74.1872 64.196 76.3387 64.4752 76.8965 65.8746C76.9058 65.8978 76.9146 65.9211 76.9232 65.9445C77.4376 67.3588 75.9731 68.8826 73.0441 71.9302L66.063 79.194C61.5503 83.8893 59.294 86.237 57.5745 85.4559C55.8551 84.6747 56.2685 81.4897 57.0953 75.1198L57.1732 74.5195C57.4714 72.222 57.6205 71.0732 56.9799 70.2574L56.9459 70.215C56.2875 69.4124 55.0919 69.2572 52.7007 68.9469C48.3976 68.3884 46.2461 68.1092 45.6884 66.7098C45.6791 66.6866 45.6702 66.6633 45.6617 66.6399C45.1473 65.2256 46.6118 63.7018 49.5407 60.6542Z"
                      fill="#C3CEF6"
                    />
                    <path
                      d="M46.0871 62.3881L52.0753 54.2862C55.9461 49.0491 57.8815 46.4306 59.6871 46.9839C61.4928 47.5373 61.4928 50.7489 61.4928 57.1722V57.7778C61.4928 60.0946 61.4928 61.2529 62.2331 61.9795L62.2723 62.0172C63.0285 62.7284 64.2341 62.7284 66.6453 62.7284C70.9845 62.7284 73.1541 62.7284 73.8873 64.0444C73.8994 64.0662 73.9112 64.0881 73.9227 64.1103C74.6149 65.4466 73.3587 67.1462 70.8463 70.5454L64.8581 78.6472C60.9873 83.8843 59.0518 86.5029 57.2462 85.9495C55.4405 85.3962 55.4405 82.1845 55.4406 75.7611L55.4406 75.1558C55.4406 72.839 55.4407 71.6806 54.7004 70.954L54.6612 70.9164C53.905 70.2051 52.6994 70.2051 50.2881 70.2051C45.949 70.2051 43.7794 70.2051 43.0462 68.8891C43.034 68.8673 43.0222 68.8454 43.0108 68.8233C42.3186 67.4869 43.5748 65.7873 46.0871 62.3881Z"
                      fill="#5750F1"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_155_6422"
                        x1="59.5"
                        y1="0"
                        x2="59.5"
                        y2="119"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#5750F1" stopOpacity="0" />
                        <stop offset="1" stopColor="#5750F1" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_155_6422"
                        x1="59.5014"
                        y1="9.52148"
                        x2="59.5014"
                        y2="109.481"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#5750F1" />
                        <stop offset="1" stopColor="#5750F1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="mx-auto mb-4 max-w-[420px] font-heading text-[28px] font-bold leading-tight text-black">
                  Upgrade to Pro Plan to Access This Features!
                </h3>
                <p className="mb-8 text-base text-body-color">
                  You just discovered a Pro Plan Only feature - please upgrade
                  your plan to a Pro Plan to unlock this feature.
                </p>
                <button
                  className="flex h-[52px] w-full items-center justify-center rounded-[30px] bg-primary font-heading text-base font-bold text-white duration-300 hover:bg-fb-primary-hover"
                  onClick={(e) => gotoBillingPage(e)}
                >
                  <span className="pr-2.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.72526 8.2623L7.27704 4.80976C8.92651 2.57805 9.75124 1.4622 10.5207 1.698C11.2902 1.93381 11.2902 3.3024 11.2902 6.03959V6.29767C11.2902 7.28492 11.2902 7.77854 11.6056 8.08817L11.6223 8.10421C11.9446 8.4073 12.4583 8.40729 13.4858 8.40729C15.3349 8.40729 16.2594 8.4073 16.5719 8.96808C16.5771 8.97737 16.5821 8.98673 16.587 8.99616C16.8819 9.56563 16.3466 10.2899 15.276 11.7384L12.7242 15.1909C11.0747 17.4226 10.25 18.5385 9.48052 18.3026C8.71105 18.0668 8.71107 16.6982 8.71111 13.961L8.71111 13.703C8.71113 12.7158 8.71113 12.2221 8.39569 11.9125L8.379 11.8965C8.05674 11.5934 7.54297 11.5934 6.51545 11.5934C4.66639 11.5934 3.74186 11.5934 3.4294 11.0326C3.42422 11.0233 3.4192 11.014 3.41431 11.0045C3.11935 10.4351 3.65465 9.71081 4.72526 8.2623Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Upgrade to Unlock
                </button>
              </div>

              <div className="absolute right-5 top-5">
                <button
                  onClick={() => setModalOpen(false)}
                  type="button"
                  className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-body-color duration-300 hover:bg-fb-gray"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1993_14819)">
                      <path
                        d="M13.0037 11.468L18.3662 6.10547L19.898 7.6373L14.5355 12.9998L19.898 18.3623L18.3662 19.8941L13.0037 14.5316L7.64121 19.8941L6.10938 18.3623L11.4719 12.9998L6.10938 7.6373L7.64121 6.10547L13.0037 11.468Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1993_14819">
                        <rect width="26" height="26" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaywallModal;
