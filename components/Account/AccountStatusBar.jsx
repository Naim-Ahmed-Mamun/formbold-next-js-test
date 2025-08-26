import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileData } from "../../actions/AccountSettings";

const AccountStatusBar = (props) => {
  const dispatch = useDispatch();
  const { openSidebar, setOpenSidebar } = props;

  const router = useRouter();
  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);

  const userPlan = userInfo?.plan;
  const hasSubscription = userInfo?.hasSubscription;

  useEffect(() => {
    if (userInfo && emailVeryfied) {
      dispatch(getUserProfileData({ id: userInfo?.id }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative flex w-full items-center justify-end border-b border-stroke bg-white py-4 pl-20 pr-5 md:justify-between md:pl-24 md:pr-9 xl:px-9">
        <button
          className="absolute left-5 top-1/2 block -translate-y-1/2 cursor-pointer bg-transparent md:left-9 xl:hidden"
          onClick={() => setOpenSidebar(!openSidebar)}
          name="mobileMenuButton"
          aria-label="mobileMenuButton"
        >
          <span
            className={`relative mx-auto my-2 block h-[2px] w-8 bg-gray-900 transition ${
              openSidebar ? "rotate-45" : " "
            }`}
          ></span>
          <span
            className={`relative mx-auto my-2 block h-[2px] w-8 bg-gray-900 transition ${
              openSidebar ? "hidden" : ""
            }`}
          ></span>
          <span
            className={`relative mx-auto my-2 block h-[2px] w-8 bg-gray-900 transition ${
              openSidebar ? "top-[-10px] -rotate-45" : ""
            }`}
          ></span>
        </button>

        <div className="hidden md:block">
          <p className="mb-2.5 text-sm font-medium text-body-color">
            Monthly Submissions {userPlan?.usage?.submissions}/
            {userPlan?.usage?.submissions_limit}
          </p>
          <span className="relative block h-1.5 w-full rounded-2xl bg-fb-gray-3">
            <span
              className="absolute left-0 top-0 block h-full rounded-2xl bg-primary"
              // style={{ width: `${userPlan?.usage?.submissions}%` }}
              style={{width: `${Math.min((userPlan?.usage?.submissions / userPlan?.usage?.submissions_limit) * 100, 100)}%`}}
            ></span>
          </span>
        </div>

        <div className="flex items-center justify-end space-x-3.5">
          <button
            onClick={() => router.push("/pricing")}
            className="inline-flex h-9 items-center justify-center rounded-full border border-[#E1E8FF] bg-[#F7F9FC] px-4 font-heading text-sm font-medium"
          >
            <span className="pr-2">
              {userPlan?.name === "Free" ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.311 1.83301C6.44419 1.83678 4.4435 1.90595 3.17424 3.17522C1.90498 4.44448 1.8358 6.44517 1.83203 10.312H6.33609C6.01437 9.91009 5.77398 9.43608 5.6429 8.91176C5.1495 6.93816 6.93719 5.15048 8.91079 5.64387C9.43511 5.77495 9.90912 6.01534 10.311 6.33706V1.83301Z"
                    fill="#0E0B3D"
                  />
                  <path
                    d="M1.83203 11.687C1.8358 15.5537 1.90498 17.5544 3.17424 18.8237C4.4435 20.093 6.44419 20.1621 10.311 20.1659V12.9461C9.59631 14.3736 8.12018 15.3536 6.41515 15.3536C6.03545 15.3536 5.72765 15.0458 5.72765 14.6661C5.72765 14.2864 6.03545 13.9786 6.41515 13.9786C7.82387 13.9786 9.00423 13.0009 9.3146 11.687H1.83203Z"
                    fill="#0E0B3D"
                  />
                  <path
                    d="M11.686 20.1659C15.5528 20.1621 17.5535 20.093 18.8227 18.8237C20.092 17.5544 20.1612 15.5537 20.1649 11.687H12.6824C12.9927 13.0009 14.1731 13.9786 15.5818 13.9786C15.9615 13.9786 16.2693 14.2864 16.2693 14.6661C16.2693 15.0458 15.9615 15.3536 15.5818 15.3536C13.8768 15.3536 12.4007 14.3736 11.686 12.9461V20.1659Z"
                    fill="#0E0B3D"
                  />
                  <path
                    d="M20.1649 10.312C20.1612 6.44517 20.092 4.44448 18.8227 3.17522C17.5535 1.90595 15.5528 1.83678 11.686 1.83301V6.33706C12.0878 6.01534 12.5619 5.77495 13.0862 5.64387C15.0598 5.15048 16.8475 6.93816 16.3541 8.91176C16.223 9.43608 15.9826 9.91009 15.6609 10.312H20.1649Z"
                    fill="#0E0B3D"
                  />
                  <path
                    d="M8.5773 6.97782C9.5962 7.23254 10.311 8.14802 10.311 9.19828V10.312H9.1973C8.14705 10.312 7.23157 9.59717 6.97684 8.57827C6.7352 7.6117 7.61072 6.73618 8.5773 6.97782Z"
                    fill="#0E0B3D"
                  />
                  <path
                    d="M11.686 9.19828V10.312H12.7997C13.8499 10.312 14.7654 9.59717 15.0201 8.57827C15.2618 7.6117 14.3862 6.73618 13.4197 6.97782C12.4008 7.23254 11.686 8.14802 11.686 9.19828Z"
                    fill="#0E0B3D"
                  />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.019 10.1988L19.8089 12.4311C19.4627 16.1093 19.2896 17.9484 18.2056 19.0574C17.1215 20.1663 15.4967 20.1663 12.2472 20.1663H9.75405C6.50455 20.1663 4.8798 20.1663 3.79574 19.0574C2.71167 17.9484 2.53858 16.1093 2.1924 12.4311L1.98231 10.1988C1.8173 8.44556 1.7348 7.56895 2.03472 7.20658C2.19696 7.01055 2.41759 6.89044 2.65347 6.86972C3.08953 6.83143 3.63714 7.45483 4.73236 8.70165C5.29877 9.34646 5.58197 9.66886 5.89791 9.71879C6.07296 9.74645 6.25133 9.71801 6.41297 9.63667C6.7047 9.48985 6.89921 9.09128 7.28822 8.29415L9.33867 4.09246C10.0738 2.58616 10.4413 1.83301 11.0007 1.83301C11.56 1.83301 11.9275 2.58616 12.6626 4.09246L14.7131 8.29414C15.1021 9.09128 15.2966 9.48985 15.5883 9.63667C15.75 9.71801 15.9283 9.74645 16.1034 9.71879C16.4193 9.66886 16.7025 9.34646 17.2689 8.70165C18.3642 7.45483 18.9118 6.83143 19.3478 6.86972C19.5837 6.89044 19.8043 7.01055 19.9666 7.20658C20.2665 7.56895 20.184 8.44557 20.019 10.1988ZM7.56315 16.4997C7.56315 16.12 7.87095 15.8122 8.25065 15.8122H13.7506C14.1303 15.8122 14.4381 16.12 14.4381 16.4997C14.4381 16.8794 14.1303 17.1872 13.7506 17.1872H8.25065C7.87095 17.1872 7.56315 16.8794 7.56315 16.4997Z"
                    fill="#5750F1"
                  />
                </svg>
              )}
            </span>
            Current Plan
            <span
              className={`pl-1.5 font-bold ${
                userPlan?.name === "Free" ? "text-black" : "text-primary"
              }`}
            >
              {userPlan?.name}
            </span>
          </button>

          {!hasSubscription && (
            <button
              onClick={() => router.push("/pricing")}
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 font-heading text-sm font-medium text-white duration-300 hover:bg-fb-primary-hover"
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
                    d="M4.7233 8.2623L7.27509 4.80976C8.92455 2.57805 9.74929 1.4622 10.5188 1.698C11.2882 1.93381 11.2882 3.3024 11.2882 6.03959V6.29767C11.2882 7.28492 11.2882 7.77854 11.6037 8.08817L11.6204 8.10421C11.9426 8.4073 12.4564 8.40729 13.4839 8.40729C15.333 8.40729 16.2575 8.4073 16.57 8.96808C16.5751 8.97737 16.5802 8.98673 16.585 8.99616C16.88 9.56563 16.3447 10.2899 15.2741 11.7384L12.7223 15.1909C11.0728 17.4226 10.248 18.5385 9.47856 18.3026C8.7091 18.0668 8.70912 16.6982 8.70916 13.961L8.70916 13.703C8.70917 12.7158 8.70918 12.2221 8.39373 11.9125L8.37704 11.8965C8.05478 11.5934 7.54102 11.5934 6.51349 11.5934C4.66443 11.5934 3.7399 11.5934 3.42745 11.0326C3.42227 11.0233 3.41724 11.014 3.41236 11.0045C3.1174 10.4351 3.6527 9.71081 4.7233 8.2623Z"
                    fill="white"
                  />
                </svg>
              </span>
              Upgrade
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountStatusBar;
