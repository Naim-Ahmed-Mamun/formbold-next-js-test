import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation';
import Offer from "./Offer";
import { useDispatch, useSelector } from "react-redux";
import { find, toLower } from "lodash";
import { openCheckout, openCheckoutWithCallBack } from "../../services/pricing";
import { changePlan, makeSubscription } from "../../actions/PricingActions";
import config from "../../services/config";
import ButtonWithText from "../Buttons/ButtonWithText";

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

const offers = [
  {
    text: `5 Forms`,
    Icon: Checkmark,
    isActive: true,
  },
  {
    text: `100 Submissions Per Month`,
    Icon: Checkmark,
    isActive: true,
  },
  {
    text: `2 Target Email Address`,
    Icon: Checkmark,
    isActive: true,
  },
  {
    text: "Recaptcha Integration",
    Icon: Checkmark,
    isActive: true,
  },
  {
    text: "Basic Statistics",
    Icon: WarningIcon,
    isActive: false,
    isWarning: true,
  },
  {
    text: "Basic Spam Filter",
    Icon: WarningIcon,
    isActive: false,
    isWarning: true,
  },
  {
    text: "Connect - Email Only",
    Icon: WarningIcon,
    isActive: false,
    isWarning: true,
  },
  {
    text: "Support - Community Support Only",
    Icon: WarningIcon,
    isActive: false,
    isWarning: true,
  },
  { text: "Access to Apps", Icon: CrossIcon, isActive: false },
  {
    text: "File Attachment",
    Icon: CrossIcon,
    isActive: false,
  },
  {
    text: "Webhook Access",
    Icon: CrossIcon,
    isActive: false,
  },
  {
    text: "Custom Redirects",
    Icon: CrossIcon,
    isActive: false,
  },
  {
    text: "Export Submissions to CSV",
    Icon: CrossIcon,
    isActive: false,
  },
  {
    text: "Allow/Disallow Domains",
    Icon: CrossIcon,
    isActive: false,
  },
  {
    text: "Customizable Form Subject",
    Icon: CrossIcon,
    isActive: false,
  },
  {
    text: "Auto Responder",
    Icon: CrossIcon,
    isActive: false,
  },
  {
    text: "No FormBold Branding",
    Icon: CrossIcon,
    isActive: false,
  },
];

const FreePlanCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.signIn?.userInfo);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const hasSubscription = useSelector((state) => state.auth?.hasSubscription);
  const pricingPage = useSelector((state) => state.pricingPage);
  const plans = useSelector((state) => state.pricingPage?.plans);

  const [loading, setLoading] = useState(false);

  const freePlan = useMemo(
    () =>
      find(plans, function (p) {
        return p.price == 0 && toLower(p.name) === "free";
      }),
    [plans]
  );

  const checkoutCompleted = useCallback(() => {
    window.location.href = `${config.siteURL}/thank-you`;
  }, []);

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
      setLoading(false);
    }
  }, [pricingPage?.loading]);

  const getFreePlanButtonTitle = () => {
    let text = "Select Plan";
    if (user && hasSubscription) {
      text = "Downgrade Plan";
    }
    return text;
  };

  const callSubscriptionFunc = useCallback(
    (func) => {
      dispatch(func);
    },
    [dispatch]
  );

  const handelFreePlanClick = useCallback(
    (e, plan) => {
      e.preventDefault();
      if (!user) {
        // openCheckout(plan.paddle_plan);
        router.push("/auth/register");
        return;
      } else {
        if (!emailVeryfied) {
          router.push("/auth/verify-email");
          return;
        }

        const subsFunc = hasSubscription
          ? changePlan({
              plan: plan.paddle_plan,
              passthrough: `{"user_id": "${user.id}", "email": "${user.email}", "host_url": "${config.siteURL}"}`,
            })
          : makeSubscription({
              plan: plan.paddle_plan,
              passthrough: `{"user_id": "${user.id}", "email": "${user.email}", "host_url": "${config.siteURL}"}`,
            });

        if (
          hasSubscription &&
          plan.price == 0 &&
          !confirm("Are you sure you want to downgrade? This action might cause loss of data history or features might not work that is only available with Pro plans")
        ) {
          return;
        }
        setLoading(true);
        callSubscriptionFunc(subsFunc);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, emailVeryfied, hasSubscription]
  );

  return (
    <div className="mx-auto w-full max-w-[1310px] px-4">
      <div className="flex flex-wrap rounded-[22px] border border-fb-gray-2 bg-fb-gray p-11 md:flex-nowrap">
        <div className="mb-8 w-full max-w-[310px] pr-10 md:mb-0 xl:pr-4">
          <div className="mb-1.5 flex items-center">
            <span className="pr-3">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.0622 2.5C8.78931 2.50514 6.0611 2.59947 4.33029 4.33029C2.59947 6.0611 2.50514 8.78931 2.5 14.0622H8.6419C8.20318 13.5142 7.87538 12.8678 7.69664 12.1528C7.02382 9.46158 9.46158 7.02382 12.1528 7.69664C12.8678 7.87538 13.5142 8.20318 14.0622 8.6419V2.5Z"
                  fill="#0E0B3D"
                />
                <path
                  d="M2.5 15.9372C2.50514 21.2101 2.59947 23.9383 4.33029 25.6691C6.0611 27.3999 8.78931 27.4943 14.0622 27.4994V17.6543C13.0877 19.6008 11.0747 20.9372 8.7497 20.9372C8.23194 20.9372 7.8122 20.5175 7.8122 19.9997C7.8122 19.4819 8.23194 19.0622 8.7497 19.0622C10.6707 19.0622 12.2803 17.7289 12.7035 15.9372H2.5Z"
                  fill="#0E0B3D"
                />
                <path
                  d="M15.9372 27.4994C21.2101 27.4943 23.9383 27.3999 25.6691 25.6691C27.3999 23.9383 27.4943 21.2101 27.4994 15.9372H17.2959C17.7191 17.7289 19.3287 19.0622 21.2497 19.0622C21.7675 19.0622 22.1872 19.4819 22.1872 19.9997C22.1872 20.5175 21.7675 20.9372 21.2497 20.9372C18.9247 20.9372 16.9118 19.6008 15.9372 17.6543V27.4994Z"
                  fill="#0E0B3D"
                />
                <path
                  d="M27.4994 14.0622C27.4943 8.78931 27.3999 6.0611 25.6691 4.33029C23.9383 2.59947 21.2101 2.50514 15.9372 2.5V8.6419C16.4852 8.20318 17.1316 7.87538 17.8466 7.69664C20.5378 7.02382 22.9756 9.46158 22.3028 12.1528C22.124 12.8678 21.7962 13.5142 21.3575 14.0622H27.4994Z"
                  fill="#0E0B3D"
                />
                <path
                  d="M11.6981 9.51565C13.0875 9.863 14.0622 11.1114 14.0622 12.5436V14.0622H12.5436C11.1114 14.0622 9.863 13.0875 9.51565 11.6981C9.18614 10.38 10.38 9.18614 11.6981 9.51565Z"
                  fill="#0E0B3D"
                />
                <path
                  d="M15.9372 12.5436V14.0622H17.4559C18.888 14.0622 20.1364 13.0875 20.4838 11.6981C20.8133 10.38 19.6194 9.18614 18.3013 9.51565C16.9119 9.863 15.9372 11.1114 15.9372 12.5436Z"
                  fill="#0E0B3D"
                />
              </svg>
            </span>
            <h3 className="font-heading text-3xl font-bold text-black">Free</h3>
          </div>
          <p className="mb-3.5 font-heading text-base font-medium text-body-color">Best Suited for Personal, Non-commercial and Hobby Projects</p>

          <h4 className="mb-3 font-heading text-[38px] font-black text-black">$0.00</h4>

          <ButtonWithText
            onClickCallback={(e) => handelFreePlanClick(e, freePlan)}
            loading={loading}
            text={getFreePlanButtonTitle()}
            className={`flex h-12 w-full items-center justify-center rounded-3xl border border-fb-gray-3 bg-white font-heading font-medium text-black duration-300 hover:border-primary hover:bg-primary hover:text-white`}
          />
        </div>

        <div className="w-full">
          <div className="flex flex-wrap">
            <div className="w-full px-3 lg:w-1/2 xl:w-1/3">
              <div className="space-y-3">
                {offers.slice(0, Math.round(offers.length / 3)).map((offer, index) => (
                  <Offer key={index} text={offer.text} Icon={offer.Icon} isActive={offer?.isActive} offer={offer} />
                ))}
              </div>
            </div>
            <div className="w-full px-3 lg:w-1/2 xl:w-1/3">
              <div className="space-y-3">
                {offers.slice(Math.round(offers.length / 3), Math.round(offers.length / 3) * 2).map((offer, index) => (
                  <Offer key={index} text={offer.text} Icon={offer.Icon} isActive={offer?.isActive} offer={offer} />
                ))}
              </div>
            </div>
            <div className="w-full px-3 lg:w-1/2 xl:w-1/3">
              <div className="space-y-3">
                {offers.slice(Math.round(offers.length / 3) * 2).map((offer, index) => (
                  <Offer key={index} text={offer.text} Icon={offer.Icon} isActive={offer?.isActive} offer={offer} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreePlanCard;
