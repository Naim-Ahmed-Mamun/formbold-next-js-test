import { useRouter } from 'next/navigation';
import React from "react";
import { useSelector } from "react-redux";

export const MonthlySubmissionsCard = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);

  const userPlan = userInfo?.plan;
  const hasSubscription = userInfo?.hasSubscription;

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-8 font-heading text-[22px] font-bold text-black">
        Your Monthly Submissions {userPlan?.usage?.submissions}/{userPlan?.usage?.submissions_limit}
      </h3>
      <div>
        <span className="relative block h-2 w-full rounded-2xl bg-fb-gray-3">
          <span 
            className="absolute left-0 top-0 block h-full rounded-2xl bg-primary" 
            style={{
              width: `${Math.min((userPlan?.usage?.submissions / userPlan?.usage?.submissions_limit) * 100, 100)}%`
            }}
          ></span>
        </span>
      </div>
      {!hasSubscription && (
        <div className="pt-5">
          <p className="mb-6 text-sm text-body-color">Upgrade your plan now to get more submissions</p>
          <button
            onClick={() => router.push("/account/billing")}
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary px-4 text-center font-heading text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
          >
            <span className="pr-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.7233 8.2623L7.27509 4.80976C8.92455 2.57805 9.74929 1.4622 10.5188 1.698C11.2882 1.93381 11.2882 3.3024 11.2882 6.03959V6.29767C11.2882 7.28492 11.2882 7.77854 11.6037 8.08817L11.6204 8.10421C11.9426 8.4073 12.4564 8.40729 13.4839 8.40729C15.333 8.40729 16.2575 8.4073 16.57 8.96808C16.5751 8.97737 16.5802 8.98673 16.585 8.99616C16.88 9.56563 16.3447 10.2899 15.2741 11.7384L12.7223 15.1909C11.0728 17.4226 10.248 18.5385 9.47856 18.3026C8.7091 18.0668 8.70912 16.6982 8.70916 13.961L8.70916 13.703C8.70917 12.7158 8.70918 12.2221 8.39373 11.9125L8.37704 11.8965C8.05478 11.5934 7.54102 11.5934 6.51349 11.5934C4.66443 11.5934 3.7399 11.5934 3.42745 11.0326C3.42227 11.0233 3.41724 11.014 3.41236 11.0045C3.1174 10.4351 3.6527 9.71081 4.7233 8.2623Z"
                  fill="white"
                />
              </svg>
            </span>
            Upgrade
          </button>
        </div>
      )}
    </div>
  );
};
