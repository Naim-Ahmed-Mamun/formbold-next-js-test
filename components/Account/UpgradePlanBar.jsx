import { useRouter } from 'next/navigation';
import React from "react";

const UpgradePlanBar = () => {
  const router = useRouter();

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between space-y-4 rounded-[10px] border border-orange-light-4 bg-orange-light-6 p-5">
        <div className="flex">
          <span className="mr-5">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.8535 17.9358C13.7174 9.31194 16.1494 5 20.0007 5C23.8519 5 26.2839 9.31194 31.1478 17.9358L31.7539 19.0104C35.7958 26.1768 37.8167 29.76 35.9902 32.38C34.1637 35 29.6447 35 20.6068 35H19.3945C10.3566 35 5.8376 35 4.01108 32.38C2.18455 29.76 4.2055 26.1768 8.2474 19.0105L8.8535 17.9358ZM20.0007 12.0833C20.691 12.0833 21.2507 12.643 21.2507 13.3333V21.6667C21.2507 22.357 20.691 22.9167 20.0007 22.9167C19.3103 22.9167 18.7507 22.357 18.7507 21.6667V13.3333C18.7507 12.643 19.3103 12.0833 20.0007 12.0833ZM20.0007 28.3333C20.9211 28.3333 21.6673 27.5871 21.6673 26.6667C21.6673 25.7462 20.9211 25 20.0007 25C19.0802 25 18.334 25.7462 18.334 26.6667C18.334 27.5871 19.0802 28.3333 20.0007 28.3333Z"
                fill="#F59E0B"
              />
            </svg>
          </span>
          <div>
            <h4 className="mb-2 text-[22px] font-bold leading-tight text-fb-yellow-dark">
              Upgrade the Plan
            </h4>
            <p className="text-base font-normal text-black">
              Please upgrade to connect forms with Apps and Integrations.
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={(e) => router.push("/pricing")}
            className="inline-flex items-center justify-center whitespace-normal rounded-lg bg-fb-yellow-dark px-6 py-2.5 font-heading text-base font-medium text-white"
          >
            <span className="pr-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.1978 9.27226L18.0068 11.3016C17.6921 14.6455 17.5348 16.3174 16.5493 17.3255C15.5638 18.3337 14.0867 18.3337 11.1326 18.3337H8.86608C5.91199 18.3337 4.43494 18.3337 3.44943 17.3255C2.46391 16.3174 2.30656 14.6455 1.99185 11.3016L1.80086 9.27225C1.65085 7.67841 1.57585 6.88148 1.8485 6.55205C1.996 6.37385 2.19656 6.26466 2.411 6.24583C2.80742 6.21101 3.30525 6.77774 4.30091 7.91122C4.81582 8.4974 5.07328 8.79049 5.36049 8.83588C5.51963 8.86103 5.68178 8.83518 5.82873 8.76123C6.09394 8.62776 6.27076 8.26543 6.62441 7.54076L8.48846 3.72104C9.15672 2.35168 9.49085 1.66699 9.99935 1.66699C10.5078 1.66699 10.842 2.35167 11.5102 3.72104L13.3743 7.54075C13.7279 8.26542 13.9048 8.62776 14.17 8.76123C14.3169 8.83518 14.4791 8.86103 14.6382 8.83588C14.9254 8.79049 15.1829 8.4974 15.6978 7.91122C16.6934 6.77774 17.1913 6.21101 17.5877 6.24583C17.8021 6.26466 18.0027 6.37385 18.1502 6.55205C18.4228 6.88148 18.3478 7.67841 18.1978 9.27226ZM6.87435 15.0003C6.87435 14.6551 7.15417 14.3753 7.49935 14.3753H12.4993C12.8445 14.3753 13.1243 14.6551 13.1243 15.0003C13.1243 15.3455 12.8445 15.6253 12.4993 15.6253H7.49935C7.15417 15.6253 6.87435 15.3455 6.87435 15.0003Z"
                  fill="white"
                />
              </svg>
            </span>{" "}
            Upgrade Now
          </button>
        </div>
      </div>
    </>
  );
};

export default UpgradePlanBar;
