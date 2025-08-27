"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePlan, makeSubscription } from "../../actions/PricingActions";
import { openCheckout, openCheckoutWithCallBack } from "../../services/pricing";

import { isNull } from "lodash";
import config from "../../services/config";
import SinglePricingPlan from "./SinglePricingPlan";

// Loader removed. Icons previously declared here were unused and removed.

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
  const pricingState = useSelector((state) => state.pricingPage);

  // const pricingPage = useSelector((state) => state.pricingPage);
  // const plans = useSelector((state) => state.pricingPage?.plans);
  const plans = useMemo(() => pricingPage?.plans || [], [pricingPage?.plans]);
  const user = useSelector((state) => state.auth?.signIn?.userInfo);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const hasSubscription = useSelector((state) => state.auth?.hasSubscription);

  const updatePaymentInfoUrl = pricingState?.updatePaymentInfoUrl;

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
    if (pricingState?.requestSuccess) {
      (async () => {
        pricingState?.paddleSuccessCallback
          ? await openCheckoutWithCallBack({
              link: pricingState?.updatePaymentInfoUrl,
              checkoutCompleted: checkoutCompleted,
            })
          : checkoutCompleted();
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricingState?.requestSuccess]);

  // Local loading state removed as pricing data comes from SSR

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
            {finalPlans.map((plan, index) => (
              <SinglePricingPlan
                key={index}
                plan={plan}
                handelOpenCheckout={handelOpenCheckout}
                yearly={yearly}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
