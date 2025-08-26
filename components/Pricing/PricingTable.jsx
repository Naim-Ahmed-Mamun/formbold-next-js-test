import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Emitter from "../../services/emitter";

const Checkmark = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.1668 11.0002C20.1668 16.0628 16.0628 20.1668 11.0002 20.1668C5.93755 20.1668 1.8335 16.0628 1.8335 11.0002C1.8335 5.93755 5.93755 1.8335 11.0002 1.8335C16.0628 1.8335 20.1668 5.93755 20.1668 11.0002ZM14.6946 8.22236C14.9631 8.49085 14.9631 8.92615 14.6946 9.19463L10.1113 13.778C9.84281 14.0465 9.40751 14.0465 9.13903 13.778L7.30569 11.9446C7.03721 11.6761 7.03721 11.2408 7.30569 10.9724C7.57418 10.7039 8.00948 10.7039 8.27797 10.9724L9.62516 12.3196L11.6738 10.271L13.7224 8.22236C13.9908 7.95387 14.4261 7.95387 14.6946 8.22236Z"
      fill="#5750F1"
    />
  </svg>
);

const CrossIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.1668 10.9999C20.1668 16.0625 16.0628 20.1666 11.0002 20.1666C5.93755 20.1666 1.8335 16.0625 1.8335 10.9999C1.8335 5.93731 5.93755 1.83325 11.0002 1.83325C16.0628 1.83325 20.1668 5.93731 20.1668 10.9999ZM8.22232 8.2221C8.49081 7.95361 8.92611 7.95361 9.19459 8.2221L11.0001 10.0276L12.8057 8.22212C13.0741 7.95363 13.5094 7.95363 13.7779 8.22212C14.0464 8.4906 14.0464 8.9259 13.7779 9.19439L11.9724 10.9999L13.7779 12.8054C14.0464 13.0739 14.0464 13.5092 13.7779 13.7777C13.5094 14.0462 13.0741 14.0462 12.8056 13.7777L11.0001 11.9722L9.19461 13.7777C8.92613 14.0462 8.49083 14.0462 8.22234 13.7777C7.95386 13.5092 7.95386 13.0739 8.22234 12.8054L10.0279 10.9999L8.22232 9.19437C7.95384 8.92588 7.95384 8.49058 8.22232 8.2221Z"
      fill="#9CA3AF"
    />
  </svg>
);

const warningIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
  >
    <path
      d="M10.9821 0C4.90081 0 0 4.90081 0 10.9821C0 17.0634 4.90081 22 10.9821 22C17.0634 22 22 17.0634 22 10.9821C22 4.90081 17.0634 0 10.9821 0ZM10.9821 20.748C5.61626 20.748 1.25203 16.348 1.25203 10.9821C1.25203 5.61626 5.61626 1.25203 10.9821 1.25203C16.348 1.25203 20.748 5.61626 20.748 10.9821C20.748 16.348 16.348 20.748 10.9821 20.748Z"
      fill="#FFA70B"
    ></path>
    <path
      d="M10.8077 14.5312H10.6923C10.3077 14.5312 10 14.8646 10 15.2812C10 15.6979 10.3077 16.0312 10.6923 16.0312H10.8077C11.1923 16.0312 11.5 15.6979 11.5 15.2812C11.5 14.8646 11.1923 14.5312 10.8077 14.5312Z"
      fill="#FFA70B"
    ></path>
    <rect x="10" y="4" width="1.34" height="9" rx="0.67" fill="#FFA70B"></rect>
  </svg>
);

export default function PricingTable() {
  const dispatch = useDispatch();

  const openCheckout = async ({ product }) => {
    Emitter.emit("OPEN_CHECKOUT", product);
  };

  const plans = useSelector((state) => state.pricingPage?.plans);
  const [yearly, setYearly] = useState(true);

  const finalPlans = useMemo(
    () => plans.filter((plan) => !plan.is_monthly === yearly),
    [plans, yearly]
  );

  const [openTable, setOpenTable] = useState(false);

  const features = [
    {
      id: 1,
      text: "Forms",
      value: {
        freePlan: "05",
        starterPlan: "100",
        premiumPlan: "300",
        businessPlan: "500",
      },
    },
    {
      id: 2,
      text: "Submissions Per Month	",
      value: {
        freePlan: "100",
        starterPlan: "3000",
        premiumPlan: "5000",
        businessPlan: "15000",
      },
    },
    {
      id: 3,
      text: "Target Email Address	",
      value: {
        freePlan: "02",
        starterPlan: "50",
        premiumPlan: "100",
        businessPlan: "300",
      },
    },
    {
      id: 4,
      text: "Recaptcha Integration",
      value: {
        freePlan: true,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 5,
      text: "Detailed Statistics and Data Export to CSV",
      value: {
        freePlan: false,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 6,
      text: "Advanced Spam Filter",
      value: {
        freePlan: false,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 7,
      text: "File Attachment",
      value: {
        freePlan: false,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 8,
      text: "Connect - Email, Slack, Google Sheet, Notion and Telegram",
      value: {
        freePlan: false,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 9,
      text: "Priority Email Support",
      value: {
        freePlan: false,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 10,
      text: "Custom Redirect After Submission",
      value: {
        freePlan: false,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 11,
      text: "Webhook Access",
      value: {
        freePlan: false,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 12,
      text: "Allow/Disallow Referer Domains for Submission",
      value: {
        freePlan: false,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 13,
      text: "Customize Email Subject Based on Forms",
      value: {
        freePlan: false,
        starterPlan: true,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 14,
      text: "Auto Responder",
      value: {
        freePlan: false,
        starterPlan: false,
        premiumPlan: true,
        businessPlan: true,
      },
    },
    {
      id: 15,
      text: "Remove FormBold Branding",
      value: {
        freePlan: false,
        starterPlan: false,
        premiumPlan: true,
        businessPlan: true,
      },
    },
  ];

  return (
    <>
      <div className="pb-[70px] pt-5 text-center">
        <button
          className="inline-flex h-[52px] items-center justify-center rounded-3xl bg-fb-gray px-[50px] font-heading text-base font-medium text-primary duration-300 hover:bg-primary/10"
          id="compare"
          onClick={() => setOpenTable(!openTable)}
        >
          View Detailed comparison
          <span className={`pl-2`}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`${openTable && "rotate-180"}`}
            >
              <path
                d="M10.3085 13.196L15.6666 7.67064C16.0009 7.32586 15.7983 6.66675 15.3579 6.66675H4.64176C4.20141 6.66675 3.99875 7.32586 4.33308 7.67064L9.69116 13.196C9.86879 13.3792 10.1309 13.3792 10.3085 13.196Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </button>
      </div>
      <div
        className={`mb-16 overflow-hidden rounded-lg border border-fb-gray-3 bg-white ${
          openTable ? "block" : "hidden"
        }`}
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto p-[1px]">
            <thead>
              <tr>
                <th
                  className="mx-auto min-w-[220px] border-r border-fb-gray-3 px-5 pb-12 pt-16 xl:px-8"
                  aria-label="empty th"
                ></th>

                {finalPlans.map((plan, i) => (
                  <th
                    key={i}
                    className="mx-auto min-w-[220px] border-r border-fb-gray-3 px-5 pb-12 pt-16 text-left last-of-type:border-none xl:px-8"
                  >
                    <h3 className="mb-4 text-xl font-bold text-black">
                      {plan.name}
                    </h3>
                    <p className="mb-2 flex min-h-[28px] items-end font-heading text-sm font-medium text-body-color">
                      {plan.name === "Free" && "Free Forever!"}
                      {plan.name !== "Free" && (
                        <>
                          <span> Normally</span>{" "}
                          <span className="pl-1.5 text-xl font-bold line-through">
                            ${plan.previous_price}
                          </span>
                        </>
                      )}
                    </p>
                    <div className="mb-2 flex items-end">
                      <span className="pr-2 font-heading text-3xl font-black text-black">
                        ${plan.price}
                      </span>
                      <span className="block font-heading text-sm font-medium text-body-color xl:text-base">
                        /monthly
                      </span>
                    </div>
                    <p className="mb-5 text-sm font-normal text-body-color">
                      {plan.description}
                    </p>

                    {plan.name !== "Free" ? (
                      <button
                        onClick={() =>
                          openCheckout({ product: plan.paddle_plan })
                        }
                        className={`flex h-12 w-full items-center justify-center rounded-full border font-heading text-base font-medium duration-300  ${
                          plan.name === "Premium" ||
                          plan.name === "Premium - Monthly"
                            ? "border-transparent bg-primary text-white hover:bg-fb-primary-hover"
                            : "border-transparent bg-black text-white hover:bg-black/90"
                        } ${
                          plan.name === "Free" &&
                          "!border-fb-gray-3 bg-white !text-black hover:!border-primary hover:bg-primary hover:!text-white"
                        }
                    `}
                      >
                        Select
                      </button>
                    ) : (
                      <Link href="/auth/register" className={`flex h-12 w-full items-center justify-center rounded-full border !border-fb-gray-3 bg-white font-heading text-base  
                        font-medium !text-black duration-300 hover:!border-primary hover:bg-primary hover:!text-white
                        `}>
                        Select
                      </Link>
                    )}
                  </th>
                ))}

                {/* <th className="mx-auto min-w-[220px] border-r border-fb-gray-3 px-5 pb-12 pt-16 text-left xl:px-9">
                  <h3 className="mb-4 text-xl font-bold text-black">Free</h3>
                  <div className="mb-2">
                    <span className="pr-2 text-3xl font-black text-black font-heading">
                      $0.00
                    </span>
                    <span className="block text-sm font-medium font-heading text-body-color xl:text-base">
                      (Free Forever)
                    </span>
                  </div>
                  <p className="mb-5 text-sm font-normal text-body-color">
                    Best suited for personal and hobby projects.
                  </p>
                  <a
                    href="/auth/register"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                    className="flex items-center justify-center w-full h-12 font-medium text-black duration-300 bg-white border rounded-3xl border-fb-gray-3 font-heading hover:border-primary hover:bg-primary hover:text-white"
                  >
                    Select
                  </a>
                </th>
                <th className="mx-auto min-w-[220px] border-r border-fb-gray-3 px-5 pb-12 pt-16 text-left xl:px-9">
                  <h3 className="mb-4 text-xl font-bold text-black">
                    Standard
                  </h3>
                  <div className="mb-2">
                    <span className="text-3xl font-black line-through font-heading text-fb-gray-6">
                      $10
                    </span>
                    <span className="px-2 text-3xl font-black text-black font-heading">
                      $4
                    </span>
                    <span className="text-sm font-medium font-heading text-body-color xl:text-base">
                      /Monthly
                    </span>
                  </div>
                  <p className="mb-5 text-sm font-normal text-body-color">
                    Best suited for developers and freelance projects.
                  </p>
                  <button
                    onClick={() => openCheckout({ product: 748456 })}
                    className="flex items-center justify-center w-full h-12 text-base font-medium text-white duration-300 rounded-3xl bg-primary font-heading hover:bg-fb-primary-hover"
                  >
                    Select
                  </button>
                </th>
                <th className="mx-auto min-w-[220px] px-5 pb-12 pt-16 text-left xl:px-9">
                  <h3 className="mb-4 text-xl font-bold text-black">
                    Business
                  </h3>
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-black line-through font-heading text-fb-gray-6">
                      $39
                    </span>
                    <span className="px-2 text-3xl font-black text-black font-heading">
                      $14
                    </span>
                    <span className="text-sm font-medium font-heading text-body-color xl:text-base">
                      /Mo
                    </span>
                  </div>
                  <p className="mb-5 text-sm font-normal text-body-color">
                    Best suited for team, agencies and businesses.
                  </p>
                  <button
                    onClick={() => openCheckout({ product: 748457 })}
                    className="flex items-center justify-center w-full h-12 text-base font-medium text-white duration-300 bg-black rounded-3xl font-heading hover:bg-black/90"
                  >
                    Select
                  </button>
                </th> */}
              </tr>
            </thead>

            <tbody>
              <tr className="bg-[#FAFBFD]">
                <td className="border border-fb-gray-3 px-5 py-5 font-heading text-base font-medium text-black xl:px-9">
                  Core Features
                </td>
                <td className="border border-fb-gray-3 px-5 py-5 xl:px-9"></td>
                <td className="border border-fb-gray-3 px-5 py-5 xl:px-9"></td>
                <td className="border border-fb-gray-3 px-5 py-5 xl:px-9"></td>
                <td className="border border-fb-gray-3 px-5 py-5 xl:px-9"></td>
              </tr>

              {features.map((feature, i) => (
                <PricingRow key={i} feature={feature} />
              ))}

              <tr>
                <th
                  className="mx-auto min-w-[220px] border-r border-fb-gray-3 px-5 pb-12 pt-16 xl:px-8"
                  aria-label="empty th"
                ></th>
                {finalPlans.map((plan, i) => (
                  <th
                    key={i}
                    className="mx-auto min-w-[220px] border-r border-fb-gray-3 px-5 pb-12 pt-16 text-left last-of-type:border-none xl:px-8"
                  >
                    <h3 className="mb-4 text-xl font-bold text-black">
                      {plan.name}
                    </h3>
                    <p className="mb-2 flex min-h-[28px] items-end font-heading text-sm font-medium text-body-color">
                      {plan.name === "Free" && "Free Forever!"}
                      {plan.name !== "Free" && (
                        <>
                          <span> Normally</span>{" "}
                          <span className="pl-1.5 text-xl font-bold line-through">
                            ${plan.previous_price}
                          </span>
                        </>
                      )}
                    </p>
                    <div className="mb-2 flex items-end">
                      <span className="pr-2 font-heading text-3xl font-black text-black">
                        ${plan.price}
                      </span>
                      <span className="block font-heading text-sm font-medium text-body-color xl:text-base">
                        /monthly
                      </span>
                    </div>
                    <p className="mb-5 text-sm font-normal text-body-color">
                      {plan.description}
                    </p>

                    {plan.name !== "Free" ? (
                      <button
                        onClick={() =>
                          openCheckout({ product: plan.paddle_plan })
                        }
                        className={`flex h-12 w-full items-center justify-center rounded-full border font-heading text-base font-medium duration-300  ${
                          plan.name === "Premium" ||
                          plan.name === "Premium - Monthly"
                            ? "border-transparent bg-primary text-white hover:bg-fb-primary-hover"
                            : "border-transparent bg-black text-white hover:bg-black/90"
                        } ${
                          plan.name === "Free" &&
                          "!border-fb-gray-3 bg-white !text-black hover:!border-primary hover:bg-primary hover:!text-white"
                        }
                    `}
                      >
                        Select
                      </button>
                    ) : (
                      <Link href="/auth/register" className={`flex h-12 w-full items-center justify-center rounded-full border !border-fb-gray-3 bg-white font-heading text-base  
                        font-medium !text-black duration-300 hover:!border-primary hover:bg-primary hover:!text-white
                        `}>
                          Select
                      </Link>
                    )}
                  </th>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const PricingRow = ({ feature }) => {
  const { text, value } = feature;

  let valueContent;

  if (value)
    return (
      <tr>
        <td className="border border-fb-gray-3 px-5 py-5 text-base text-body-color xl:px-9">
          {text}
        </td>
        <td className="border border-fb-gray-3 px-5 py-5 text-center text-base text-body-color xl:px-9">
          {value?.freePlan}
          {value?.freePlan === true && Checkmark}
          {value?.freePlan === false && CrossIcon}
        </td>
        <td className="border border-fb-gray-3 px-5 py-5 text-center text-base text-body-color xl:px-9">
          {value?.starterPlan}
          {value?.starterPlan === true && Checkmark}
          {value?.starterPlan === false && CrossIcon}
        </td>
        <td className="border border-fb-gray-3 px-5 py-5 text-center text-base text-body-color xl:px-9">
          {value?.premiumPlan}
          {value?.premiumPlan === true && Checkmark}
          {value?.premiumPlan === false && CrossIcon}
        </td>
        <td className="border border-fb-gray-3 px-5 py-5 text-center text-base text-body-color xl:px-9">
          {value?.businessPlan}
          {value?.businessPlan === true && Checkmark}
          {value?.businessPlan === false && CrossIcon}
        </td>
      </tr>
    );
};
