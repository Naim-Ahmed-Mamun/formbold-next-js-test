"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePlan, makeSubscription } from "../../actions/PricingActions";
import { openCheckout, openCheckoutWithCallBack } from "../../services/pricing";

import { isNull } from "lodash";
import config from "../../services/config";
import Loader from "../Icons/Loader";
import SinglePricingPlan from "./SinglePricingPlan";

const Checkmark = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.1668 11.0002C20.1668 16.0628 16.0628 20.1668 11.0002 20.1668C5.93755 20.1668 1.8335 16.0628 1.8335 11.0002C1.8335 5.93755 5.93755 1.8335 11.0002 1.8335C16.0628 1.8335 20.1668 5.93755 20.1668 11.0002ZM14.6946 8.22236C14.9631 8.49085 14.9631 8.92615 14.6946 9.19463L10.1113 13.778C9.84281 14.0465 9.40751 14.0465 9.13903 13.778L7.30569 11.9446C7.03721 11.6761 7.03721 11.2408 7.30569 10.9724C7.57418 10.7039 8.00948 10.7039 8.27797 10.9724L9.62516 12.3196L11.6738 10.271L13.7224 8.22236C13.9908 7.95387 14.4261 7.95387 14.6946 8.22236Z"
      fill="#5750F1"
    />
  </svg>
);

const CrossIcon = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.1668 10.9999C20.1668 16.0625 16.0628 20.1666 11.0002 20.1666C5.93755 20.1666 1.8335 16.0625 1.8335 10.9999C1.8335 5.93731 5.93755 1.83325 11.0002 1.83325C16.0628 1.83325 20.1668 5.93731 20.1668 10.9999ZM8.22232 8.2221C8.49081 7.95361 8.92611 7.95361 9.19459 8.2221L11.0001 10.0276L12.8057 8.22212C13.0741 7.95363 13.5094 7.95363 13.7779 8.22212C14.0464 8.4906 14.0464 8.9259 13.7779 9.19439L11.9724 10.9999L13.7779 12.8054C14.0464 13.0739 14.0464 13.5092 13.7779 13.7777C13.5094 14.0462 13.0741 14.0462 12.8056 13.7777L11.0001 11.9722L9.19461 13.7777C8.92613 14.0462 8.49083 14.0462 8.22234 13.7777C7.95386 13.5092 7.95386 13.0739 8.22234 12.8054L10.0279 10.9999L8.22232 9.19437C7.95384 8.92588 7.95384 8.49058 8.22232 8.2221Z"
      fill="#9CA3AF"
    />
  </svg>
);

const WarningIcon = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.1668 11.0002C20.1668 16.0628 16.0628 20.1668 11.0002 20.1668C5.93755 20.1668 1.8335 16.0628 1.8335 11.0002C1.8335 5.93755 5.93755 1.8335 11.0002 1.8335C16.0628 1.8335 20.1668 5.93755 20.1668 11.0002ZM11.0002 16.271C11.3799 16.271 11.6877 15.9632 11.6877 15.5835V10.0835C11.6877 9.7038 11.3799 9.396 11.0002 9.396C10.6205 9.396 10.3127 9.7038 10.3127 10.0835V15.5835C10.3127 15.9632 10.6205 16.271 11.0002 16.271ZM11.0002 6.41683C11.5064 6.41683 11.9168 6.82723 11.9168 7.3335C11.9168 7.83976 11.5064 8.25016 11.0002 8.25016C10.4939 8.25016 10.0835 7.83976 10.0835 7.3335C10.0835 6.82723 10.4939 6.41683 11.0002 6.41683Z"
      fill="#A7A5F7"
    />
  </svg>
);

const PricingPlanHeader = ({ billing, yearly, setYearly, updatePaymentInfoUrl }) => (
  <div className="items-center justify-center pb-12 sm:flex">
    {billing ? (
      <div className={`inline-flex h-[58px] items-center justify-between rounded-[60px] bg-white p-1.5`}>
        <button
          className={`relative flex h-11 items-center rounded-3xl px-6 font-heading text-base font-medium ${
            yearly ? "cursor-pointer text-black" : "bg-primary text-white shadow-fb-three"
          }`}
          onClick={() => setYearly(false)}
        >
          Monthly
        </button>

        <button
          className={`relative flex h-11 items-center rounded-3xl px-6 font-heading text-base font-medium ${
            yearly ? "bg-primary text-white shadow-fb-three" : "cursor-pointer text-black"
          }`}
          onClick={() => setYearly(true)}
        >
          Yearly <span className={`pl-1 ${yearly ? "text-white" : "text-primary"}`}> (Save Over 30%) </span>
        </button>
      </div>
    ) : (
      <div className={`inline-flex h-[58px] items-center justify-between rounded-[60px] bg-fb-gray p-1.5`}>
        <button
          className={`relative flex h-11 items-center rounded-3xl px-6 font-heading text-base font-medium ${
            yearly ? "cursor-pointer text-black" : "bg-white text-primary shadow-fb-three"
          }`}
          onClick={() => setYearly(false)}
        >
          Monthly
        </button>

        <button
          className={`relative flex h-11 items-center rounded-3xl px-6 font-heading text-base font-medium ${
            yearly ? "bg-white text-primary shadow-fb-three" : "cursor-pointer text-black"
          }`}
          onClick={() => setYearly(true)}
        >
          Yearly <span className={`pl-1 text-primary`}> (Save Over 30%) </span>
        </button>
      </div>
    )}
    {billing && !isNull(updatePaymentInfoUrl) && (
      <a href={updatePaymentInfoUrl} target="_blank" className="mt-5 flex items-center rounded-lg bg-primary px-4 py-2 font-medium text-white sm:ml-4 sm:mt-0">
        Update Payment Info
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    )}
  </div>
);

export default function PricingPlan(props) {
  const { pricingPage } = props;
  // console.log(pricingPage, "pricingPage in pricing plan");
  const router = useRouter();
  const dispatch = useDispatch();

  // const pricingPage = useSelector((state) => state.pricingPage);
  // const plans = useSelector((state) => state.pricingPage?.plans);
  const plans = useMemo(() => pricingPage?.plans || [], [pricingPage?.plans]);
  const user = useSelector((state) => state.auth?.signIn?.userInfo);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const hasSubscription = useSelector((state) => state.auth?.hasSubscription);

  const updatePaymentInfoUrl = pricingPage?.updatePaymentInfoUrl;

  const [loading, setLoading] = useState({ plan: undefined, loader: false });
  const [yearly, setYearly] = useState(true);

  const finalPlans = useMemo(() => plans.filter((plan) => !plan.is_monthly === yearly), [plans, yearly]) || [];

  const checkoutCompleted = useCallback(() => {
    // toast.success("Thanks for your purchase. 🥳 - Please, check your email inbox for confirmation link and additional details", {
    //   onClose: function () {
    //     window.location.href = `${config.siteURL}/thank-you`;
    //   },
    // });
    window.location.href = `${config.siteURL}/thank-you`;
  }, []);

  const callSubscriptionFunc = useCallback(
    (func) => {
      dispatch(func);
    },
    [dispatch]
  );

  useEffect(() => {
    if (pricingPage?.requestSuccess) {
      (async () => {
        pricingPage?.paddleSuccessCallback
          ? await openCheckoutWithCallBack({
              link: pricingPage?.updatePaymentInfoUrl,
              callback: checkoutCompleted,
            })
          : checkoutCompleted;
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricingPage?.requestSuccess]);

  useEffect(() => {
    if (!pricingPage?.loading) {
      setLoading({
        plan: undefined,
        loader: false,
      });
    }
  }, [pricingPage?.loading]);

  const handelOpenCheckout = useCallback(
    (e, plan) => {
      if (!user) {
        openCheckout(plan.paddle_plan);
        return;
      } else {
        if (!emailVeryfied) {
          router.push("/auth/verify-email");
          return;
        }

        const payload = {
          plan: plan.paddle_plan,
          passthrough: `{"user_id": "${user.id}", "email": "${user.email}", "host_url": "${config.siteURL}"}`,
        };

        const subsFunc = hasSubscription ? changePlan(payload) : makeSubscription(payload);

        if (
          hasSubscription &&
          plan.price == 0 &&
          !confirm("Are you sure you want to downgrade? This action might cause loss of data history or features might not work that is only available with Pro plans")
        ) {
          return;
        }
        setLoading({ plan: plan.paddle_plan, loader: true });
        callSubscriptionFunc(subsFunc);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, emailVeryfied, hasSubscription]
  );

  let gridCols = `xl:grid-cols-${finalPlans.length}`;

  return (
    <>
      <div className="mx-auto mb-[60px] w-full max-w-[1310px] px-4">
        <PricingPlanHeader billing={props?.billing} yearly={yearly} setYearly={setYearly} updatePaymentInfoUrl={hasSubscription ? updatePaymentInfoUrl : null} />

        <div className={`rounded-[22px] border border-fb-gray-2 md:mt-14 ${props?.billing ? "bg-white" : "bg-fb-gray"}`}>
          <div className={`${pricingPage?.pageLoader ? "content-center" : `grid grid-cols-1 md:grid-cols-2 ${yearly ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}`}>
            {/* {pricingPage?.pageLoader ? (
              <Loader show />
            ) : ( */}
              {finalPlans.map((plan, index) => (
                <SinglePricingPlan
                  key={index}
                  plan={plan}
                  handelOpenCheckout={handelOpenCheckout}
                  loading={loading.plan === plan.paddle_plan ? loading.loader : false}
                  setLoading={setLoading}
                  yearly={yearly}
                />
              ))}
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
}
