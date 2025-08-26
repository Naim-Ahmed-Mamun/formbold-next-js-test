import { useRouter } from 'next/navigation';
import React from "react";
import { useSelector } from "react-redux";

const boltIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.78099 6.60925L5.82241 3.84722C7.14199 2.06186 7.80177 1.16917 8.41735 1.35782C9.03292 1.54646 9.03292 2.64134 9.03292 4.83109V5.03755C9.03292 5.82735 9.03292 6.22225 9.28528 6.46995L9.29863 6.48278C9.55644 6.72525 9.96744 6.72525 10.7895 6.72525C12.2687 6.72525 13.0083 6.72525 13.2583 7.17388C13.2624 7.18131 13.2665 7.1888 13.2704 7.19634C13.5063 7.65191 13.0781 8.23132 12.2216 9.39013L10.1802 12.1521C8.86057 13.9375 8.20077 14.8302 7.5852 14.6415C6.96962 14.4529 6.96964 13.358 6.96967 11.1682L6.96967 10.9618C6.96968 10.172 6.96969 9.77713 6.71733 9.52942L6.70398 9.5166C6.44617 9.27412 6.03516 9.27412 5.21314 9.27412C3.73389 9.27412 2.99427 9.27412 2.7443 8.82549C2.74016 8.81807 2.73614 8.81058 2.73223 8.80304C2.49626 8.34746 2.9245 7.76806 3.78099 6.60925Z"
      fill="currentColor"
    />
  </svg>
);

const crownIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5575 7.41722L14.4047 9.04071C14.1529 11.7158 14.027 13.0533 13.2386 13.8598C12.4502 14.6663 11.2686 14.6663 8.90531 14.6663H7.09208C4.72881 14.6663 3.54717 14.6663 2.75876 13.8598C1.97035 13.0533 1.84447 11.7158 1.5927 9.04071L1.4399 7.41722C1.3199 6.14214 1.2599 5.5046 1.47802 5.24106C1.59602 5.09849 1.75647 5.01114 1.92802 4.99608C2.24515 4.96822 2.64342 5.42161 3.43994 6.32839C3.85188 6.79734 4.05784 7.03181 4.28761 7.06812C4.41493 7.08824 4.54464 7.06756 4.6622 7.0084C4.87437 6.90162 5.01583 6.61175 5.29875 6.03202L6.78999 2.97625C7.3246 1.88075 7.5919 1.33301 7.9987 1.33301C8.4055 1.33301 8.6728 1.88075 9.20741 2.97624L10.6987 6.03202C10.9816 6.61175 11.123 6.90162 11.3352 7.0084C11.4528 7.06756 11.5825 7.08824 11.7098 7.06812C11.9396 7.03181 12.1455 6.79734 12.5575 6.32839C13.354 5.42161 13.7522 4.96822 14.0694 4.99608C14.2409 5.01114 14.4014 5.09849 14.5194 5.24106C14.7375 5.5046 14.6775 6.14214 14.5575 7.41722ZM5.4987 11.9997C5.4987 11.7235 5.72256 11.4997 5.9987 11.4997H9.9987C10.2748 11.4997 10.4987 11.7235 10.4987 11.9997C10.4987 12.2758 10.2748 12.4997 9.9987 12.4997H5.9987C5.72256 12.4997 5.4987 12.2758 5.4987 11.9997Z"
      fill="currentColor"
    />
  </svg>
);

const businessIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 17.1875C25 16.6697 24.5803 16.25 24.0625 16.25H20.3125C19.7947 16.25 19.375 16.6697 19.375 17.1875V25.625H17.5V5.3125C17.5 4.40211 17.498 3.81363 17.4397 3.38003C17.385 2.9734 17.2968 2.84595 17.2254 2.77459C17.154 2.70322 17.0266 2.61496 16.62 2.56029C16.1864 2.50199 15.5979 2.5 14.6875 2.5C13.7771 2.5 13.1886 2.50199 12.755 2.56029C12.3484 2.61496 12.221 2.70322 12.1496 2.77459C12.0782 2.84595 11.99 2.9734 11.9353 3.38003C11.877 3.81363 11.875 4.40211 11.875 5.3125V25.625H10V10.9375C10 10.4197 9.58027 10 9.0625 10H5.3125C4.79473 10 4.375 10.4197 4.375 10.9375V25.625H2.5H2.1875C1.66973 25.625 1.25 26.0447 1.25 26.5625C1.25 27.0803 1.66973 27.5 2.1875 27.5H27.1875C27.7053 27.5 28.125 27.0803 28.125 26.5625C28.125 26.0447 27.7053 25.625 27.1875 25.625H26.875H25V17.1875Z"
      fill="currentColor"
    ></path>
  </svg>
);

const planData = [
  {
    id: 1,
    name: "Free",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.49854 1.33301C4.68633 1.33575 3.23128 1.38606 2.30818 2.30916C1.38508 3.23226 1.33477 4.68731 1.33203 7.49952H4.60771C4.37373 7.20725 4.1989 6.86252 4.10357 6.48119C3.74473 5.04585 5.04487 3.74571 6.48022 4.10455C6.86154 4.19988 7.20628 4.37471 7.49854 4.60869V1.33301Z"
          fill="currentColor"
        />
        <path
          d="M1.33203 8.49952C1.33477 11.3117 1.38508 12.7668 2.30818 13.6899C3.23128 14.613 4.68633 14.6633 7.49854 14.666V9.41528C6.97878 10.4534 5.90523 11.1662 4.66521 11.1662C4.38906 11.1662 4.16521 10.9423 4.16521 10.6662C4.16521 10.39 4.38906 10.1662 4.66521 10.1662C5.68973 10.1662 6.54817 9.45508 6.7739 8.49952H1.33203Z"
          fill="currentColor"
        />
        <path
          d="M8.49854 14.666C11.3108 14.6633 12.7658 14.613 13.6889 13.6899C14.612 12.7668 14.6623 11.3117 14.665 8.49952H9.22318C9.4489 9.45508 10.3073 10.1662 11.3319 10.1662C11.608 10.1662 11.8319 10.39 11.8319 10.6662C11.8319 10.9423 11.608 11.1662 11.3319 11.1662C10.0919 11.1662 9.0183 10.4534 8.49854 9.41528V14.666Z"
          fill="currentColor"
        />
        <path
          d="M14.665 7.49952C14.6623 4.68731 14.612 3.23226 13.6889 2.30916C12.7658 1.38606 11.3108 1.33575 8.49854 1.33301V4.60869C8.7908 4.37471 9.13554 4.19988 9.51686 4.10455C10.9522 3.74571 12.2523 5.04585 11.8935 6.48119C11.7982 6.86252 11.6234 7.20725 11.3894 7.49952H14.665Z"
          fill="currentColor"
        />
        <path
          d="M6.23768 5.07469C6.9787 5.25994 7.49854 5.92575 7.49854 6.68957V7.49952H6.68859C5.92477 7.49952 5.25897 6.97967 5.07371 6.23866C4.89797 5.53569 5.53472 4.89895 6.23768 5.07469Z"
          fill="currentColor"
        />
        <path
          d="M8.49854 6.68957V7.49952H9.30849C10.0723 7.49952 10.7381 6.97967 10.9234 6.23866C11.0991 5.53569 10.4624 4.89895 9.7594 5.07469C9.01838 5.25994 8.49854 5.92575 8.49854 6.68957Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Starter",
    icon: boltIcon,
  },
  {
    id: 3,
    name: "Starter - Monthly",
    icon: boltIcon,
  },
  {
    id: 44,
    name: "Premium",
    icon: crownIcon,
  },
  {
    id: 54,
    name: "Premium - Monthly",
    icon: crownIcon,
  },
  {
    id: 4,
    name: "Business",
    icon: businessIcon,
  },
  {
    id: 5,
    name: "Business - Monthly",
    icon: businessIcon,
  },
];

export const PlanListCard = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const forms = useSelector((state) => state.forms?.forms);

  const userPlan = userInfo?.plan;
  const hasSubscription = userInfo?.hasSubscription;

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-2 font-heading text-[22px] font-bold text-black">
        Active Plan
      </h3>
      <p className="mb-5 text-sm text-body-color">
        You have created {forms ? forms.length : 0} forms
      </p>

      <div className="rounded-[10px] border border-fb-stroke leading-[0]">
        <div className="flex items-center border-b border-fb-stroke">
          <div className="w-1/2 px-5.5 py-4">
            <h5 className="font-heading text-sm font-medium text-black">
              Plans
            </h5>
          </div>
          <div className="w-1/2 border-l border-fb-stroke px-5.5 py-4">
            <h5 className="font-heading text-sm font-medium text-black">
              Your Current Plan
            </h5>
          </div>
        </div>

        {planData.map((plan, i) => (
          <div
            key={i}
            className="flex items-center border-b border-fb-stroke last-of-type:border-none"
          >
            <div
              className={`flex w-1/2 items-center px-5.5 py-3.5 ${
                userPlan?.name === plan.name ? "text-black" : "text-primary"
              }`}
            >
              <span className="pr-2">{plan.icon}</span>
              <h5 className="font-heading text-sm font-medium">{plan.name}</h5>
            </div>
            <div className="flex w-1/2 items-center border-l border-fb-stroke px-5.5 py-3.5">
              {userPlan?.name === plan.name ? (
                <button className="flex h-[34px] w-full cursor-default items-center justify-center rounded-3xl border border-fb-stroke bg-fb-gray text-center font-heading text-sm font-medium text-body-color">
                  Your Current Plan
                </button>
              ) : (
                <button
                  onClick={() => router.push("/account/billing")}
                  className="flex h-[34px] w-full items-center justify-center rounded-3xl border border-transparent bg-primary text-center font-heading text-sm font-medium text-white duration-300 hover:bg-fb-primary-hover"
                >
                  Get the Plan
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
