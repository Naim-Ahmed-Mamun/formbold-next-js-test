import { find, toLower } from "lodash";
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePlan, makeSubscription } from "../../actions/PricingActions";
import config from "../../services/config";
import ButtonWithText from "../Buttons/ButtonWithText";
import Offer from "./Offer";

const Checkmark = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
    width="18"
    height="18"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.1668 10.9999C20.1668 16.0625 16.0628 20.1666 11.0002 20.1666C5.93755 20.1666 1.8335 16.0625 1.8335 10.9999C1.8335 5.93731 5.93755 1.83325 11.0002 1.83325C16.0628 1.83325 20.1668 5.93731 20.1668 10.9999ZM8.22232 8.2221C8.49081 7.95361 8.92611 7.95361 9.19459 8.2221L11.0001 10.0276L12.8057 8.22212C13.0741 7.95363 13.5094 7.95363 13.7779 8.22212C14.0464 8.4906 14.0464 8.9259 13.7779 9.19439L11.9724 10.9999L13.7779 12.8054C14.0464 13.0739 14.0464 13.5092 13.7779 13.7777C13.5094 14.0462 13.0741 14.0462 12.8056 13.7777L11.0001 11.9722L9.19461 13.7777C8.92613 14.0462 8.49083 14.0462 8.22234 13.7777C7.95386 13.5092 7.95386 13.0739 8.22234 12.8054L10.0279 10.9999L8.22232 9.19437C7.95384 8.92588 7.95384 8.49058 8.22232 8.2221Z"
      fill="#9CA3AF"
    />
  </svg>
);

const WarningIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.1668 11.0002C20.1668 16.0628 16.0628 20.1668 11.0002 20.1668C5.93755 20.1668 1.8335 16.0628 1.8335 11.0002C1.8335 5.93755 5.93755 1.8335 11.0002 1.8335C16.0628 1.8335 20.1668 5.93755 20.1668 11.0002ZM11.0002 16.271C11.3799 16.271 11.6877 15.9632 11.6877 15.5835V10.0835C11.6877 9.7038 11.3799 9.396 11.0002 9.396C10.6205 9.396 10.3127 9.7038 10.3127 10.0835V15.5835C10.3127 15.9632 10.6205 16.271 11.0002 16.271ZM11.0002 6.41683C11.5064 6.41683 11.9168 6.82723 11.9168 7.3335C11.9168 7.83976 11.5064 8.25016 11.0002 8.25016C10.4939 8.25016 10.0835 7.83976 10.0835 7.3335C10.0835 6.82723 10.4939 6.41683 11.0002 6.41683Z"
      fill="#A7A5F7"
    />
  </svg>
);

const freeIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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
);

const starterIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.46761 15.6017C3.83791 15.9725 3.83754 16.5732 3.46679 16.9435L3.27223 17.1378C3.10604 17.3038 3.10604 17.5725 3.27223 17.7384C3.43906 17.9051 3.71002 17.9051 3.87684 17.7384L6.01699 15.6009C6.38775 15.2306 6.98849 15.231 7.35879 15.6017C7.7291 15.9725 7.72873 16.5732 7.35798 16.9435L5.21782 19.081C4.31013 19.9876 2.83894 19.9876 1.93125 19.081C1.02292 18.1738 1.02292 16.7025 1.93125 15.7952L2.12581 15.6009C2.49656 15.2306 3.09731 15.231 3.46761 15.6017ZM9.60831 16.8621C9.97884 17.2326 9.97884 17.8333 9.60831 18.2038L6.9303 20.8818C6.55978 21.2523 5.95903 21.2523 5.5885 20.8818C5.21798 20.5113 5.21798 19.9106 5.5885 19.54L8.26651 16.8621C8.63704 16.4915 9.23779 16.4915 9.60831 16.8621ZM13.1198 20.3692C13.4903 20.7397 13.4903 21.3404 13.1198 21.711L10.4601 24.3706C10.0895 24.7412 9.48878 24.7412 9.11826 24.3706C8.74773 24.0001 8.74773 23.3994 9.11826 23.0289L11.778 20.3692C12.1485 19.9987 12.7492 19.9987 13.1198 20.3692ZM9.12149 20.87C9.48787 21.2446 9.48119 21.8453 9.10656 22.2117L6.94385 24.3267C6.56922 24.6931 5.96851 24.6864 5.60213 24.3118C5.23575 23.9372 5.24243 23.3365 5.61706 22.9701L7.77977 20.855C8.1544 20.4886 8.75511 20.4953 9.12149 20.87ZM14.3514 22.6475C14.7217 23.0183 14.7213 23.619 14.3506 23.9893L12.2104 26.1269C12.0442 26.2928 12.0442 26.5615 12.2104 26.7275C12.3773 26.8941 12.6482 26.8941 12.815 26.7275L13.0096 26.5331C13.3803 26.1628 13.9811 26.1632 14.3514 26.534C14.7217 26.9047 14.7213 27.5054 14.3506 27.8757L14.156 28.0701C13.2483 28.9766 11.7771 28.9766 10.8694 28.0701C9.96111 27.1628 9.96111 25.6915 10.8694 24.7843L13.0096 22.6467C13.3803 22.2764 13.9811 22.2768 14.3514 22.6475Z"
      fill="#5750F1"
    />
    <path
      d="M13.5579 6.76139L10.8233 9.48779C10.3206 9.98891 9.85953 10.4486 9.4954 10.8641C9.26156 11.131 9.02787 11.4231 8.82993 11.7458L8.80328 11.7193C8.75271 11.6688 8.72738 11.6436 8.70199 11.6189C8.22667 11.1578 7.66758 10.7911 7.0546 10.5385C7.02185 10.525 6.9886 10.5119 6.92211 10.4855L6.51495 10.3242C5.96336 10.1056 5.81636 9.39556 6.23607 8.97713C7.44062 7.77624 8.88686 6.33439 9.58483 6.0448C10.2004 5.7894 10.8653 5.70443 11.5066 5.7992C12.0942 5.88604 12.6501 6.18787 13.5579 6.76139Z"
      fill="#5750F1"
    />
    <path
      d="M18.2273 21.1165C18.4476 21.3402 18.594 21.4982 18.7263 21.667C18.9009 21.8897 19.057 22.1263 19.193 22.3744C19.3462 22.6536 19.4651 22.9519 19.7029 23.5484C19.8965 24.0341 20.5397 24.1625 20.9132 23.79L21.0036 23.6999C22.2081 22.499 23.6543 21.0571 23.9448 20.3613C24.201 19.7476 24.2862 19.0846 24.1911 18.4452C24.104 17.8595 23.8014 17.3053 23.2262 16.4005L20.4825 19.136C19.9684 19.6485 19.4971 20.1185 19.0708 20.4866C18.8154 20.7072 18.5359 20.9277 18.2273 21.1165Z"
      fill="#5750F1"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.3778 17.9593L25.6649 11.6911C26.5704 10.7884 27.0231 10.337 27.2615 9.76308C27.5 9.18912 27.5 8.55082 27.5 7.27421V6.66432C27.5 4.70124 27.5 3.7197 26.8883 3.10985C26.2766 2.5 25.2921 2.5 23.3231 2.5H22.7114C21.4309 2.5 20.7907 2.5 20.215 2.73774C19.6393 2.97548 19.1866 3.42684 18.2811 4.32955L11.994 10.5977C10.936 11.6525 10.28 12.3066 10.026 12.9383C9.94571 13.1379 9.90557 13.3353 9.90557 13.5423C9.90557 14.4048 10.6017 15.0988 11.994 16.487L12.1811 16.6735L14.3732 14.4488C14.6858 14.1316 15.1964 14.1278 15.5137 14.4404C15.8309 14.753 15.8347 15.2636 15.5221 15.5809L13.3234 17.8123L13.4708 17.9593C14.8631 19.3474 15.5592 20.0414 16.4243 20.0414C16.6154 20.0414 16.7983 20.0075 16.9823 19.9398C17.631 19.7008 18.2932 19.0407 19.3778 17.9593ZM22.3315 10.5982C21.5159 11.4113 20.1935 11.4113 19.378 10.5982C18.5624 9.78503 18.5624 8.46668 19.378 7.65355C20.1935 6.84041 21.5159 6.84041 22.3315 7.65355C23.1471 8.46668 23.1471 9.78503 22.3315 10.5982Z"
      fill="#5750F1"
    />
  </svg>
);

const premiumIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.2977 13.9079L27.0112 16.9519C26.5392 21.9677 26.3032 24.4756 24.8249 25.9878C23.3466 27.5 21.131 27.5 16.6999 27.5H13.3001C8.86896 27.5 6.65339 27.5 5.17512 25.9878C3.69685 24.4756 3.46082 21.9677 2.98875 16.9519L2.70226 13.9079C2.47725 11.5171 2.36475 10.3217 2.77373 9.82759C2.99497 9.56029 3.29582 9.3965 3.61748 9.36825C4.21211 9.31602 4.95885 10.1661 6.45234 11.8663C7.22471 12.7456 7.61089 13.1853 8.04172 13.2533C8.28043 13.2911 8.52365 13.2523 8.74407 13.1414C9.14189 12.9412 9.40712 12.3976 9.93759 11.3106L12.7337 5.58107C13.7361 3.52702 14.2373 2.5 15 2.5C15.7627 2.5 16.2639 3.52702 17.2663 5.58107L20.0624 11.3106C20.5929 12.3976 20.8581 12.9412 21.2559 13.1414C21.4764 13.2523 21.7196 13.2911 21.9583 13.2533C22.3891 13.1853 22.7753 12.7456 23.5477 11.8663C25.0411 10.1661 25.7879 9.31602 26.3825 9.36825C26.7042 9.3965 27.005 9.56029 27.2263 9.82759C27.6353 10.3217 27.5227 11.5171 27.2977 13.9079ZM10.3125 22.5C10.3125 21.9822 10.7322 21.5625 11.25 21.5625H18.75C19.2678 21.5625 19.6875 21.9822 19.6875 22.5C19.6875 23.0178 19.2678 23.4375 18.75 23.4375H11.25C10.7322 23.4375 10.3125 23.0178 10.3125 22.5Z"
      fill="#5750F1"
    />
  </svg>
);

const businessIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 17.1875C25 16.6697 24.5803 16.25 24.0625 16.25H20.3125C19.7947 16.25 19.375 16.6697 19.375 17.1875V25.625H17.5V5.3125C17.5 4.40211 17.498 3.81363 17.4397 3.38003C17.385 2.9734 17.2968 2.84595 17.2254 2.77459C17.154 2.70322 17.0266 2.61496 16.62 2.56029C16.1864 2.50199 15.5979 2.5 14.6875 2.5C13.7771 2.5 13.1886 2.50199 12.755 2.56029C12.3484 2.61496 12.221 2.70322 12.1496 2.77459C12.0782 2.84595 11.99 2.9734 11.9353 3.38003C11.877 3.81363 11.875 4.40211 11.875 5.3125V25.625H10V10.9375C10 10.4197 9.58027 10 9.0625 10H5.3125C4.79473 10 4.375 10.4197 4.375 10.9375V25.625H2.5H2.1875C1.66973 25.625 1.25 26.0447 1.25 26.5625C1.25 27.0803 1.66973 27.5 2.1875 27.5H27.1875C27.7053 27.5 28.125 27.0803 28.125 26.5625C28.125 26.0447 27.7053 25.625 27.1875 25.625H26.875H25V17.1875Z"
      fill="#5750F1"
    />
  </svg>
);

export let offers = [];

const SinglePricingPlan = ({
  plan,
  handelOpenCheckout,
  loading,
  yearly,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.signIn?.userInfo);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const hasSubscription = useSelector((state) => state.auth?.hasSubscription);
  const plans = useSelector((state) => state.pricingPage?.plans);
  const subscribedPlan = useSelector(
    (state) => state.pricingPage?.subscribedPlan
  );

  const freePlan = useMemo(
    () =>
      find(plans, function (p) {
        return p.price == 0 && toLower(p.name) === "free";
      }),
    [plans]
  );

  const isActive = subscribedPlan?.paddle_plan == plan?.paddle_plan;

  offers = [
    {
      text: `${plan.forms_count} Forms`,
      Icon: Checkmark,
      isChecked: true,
    },
    {
      text: `${plan.submissions_count} Submissions Per Month`,
      Icon: Checkmark,
      isChecked: true,
    },
    {
      text: `${plan.email_addresses_count} Target Email Address`,
      Icon: Checkmark,
      isChecked: true,
    },
    {
      text: "Recaptcha Integration",
      Icon: plan.features.recaptcha && Checkmark,
      isChecked: plan.features.recaptcha && true,
    },
    {
      text:
        plan.price == 0
          ? "Basic Statistics"
          : "Detailed Statistics and Data Export",
      Icon: plan.price == 0 ? WarningIcon : Checkmark,
      isWarning: plan.price == 0 ? true : false,
      isChecked: plan.price == 0 ? false : true,
    },
    {
      text: plan.price == 0 ? "Basic Spam Filter" : "Advanced Spam Filter",
      Icon: plan.price == 0 ? WarningIcon : Checkmark,
      isWarning: plan.price == 0 ? true : false,
      isChecked: plan.price == 0 ? false : true,
    },
    {
      text:
        plan.price == 0
          ? "Connect - Email Only"
          : "Connect Form Apps and Integrations",
      Icon: !plan.plugins ? WarningIcon : Checkmark,
      isWarning: plan.price == 0 ? true : false,
      isChecked: plan.price == 0 ? false : true,
    },
    {
      text: plan.features.support
        ? "Priority Email Support"
        : "Support - Community Support Only",
      Icon: !plan.features.support ? WarningIcon : Checkmark,
      isWarning: !plan.features.support ? true : false,
      isChecked: !plan.features.support ? false : true,
    },
    {
      text: "Access to Apps",
      Icon: plan.price > 0 ? Checkmark : CrossIcon,
      isChecked: plan.price > 0 ? true : false,
    },
    {
      text: "File Attachment",
      Icon: plan.features.attachments ? Checkmark : CrossIcon,
      isChecked: plan.features.attachments ? true : false,
    },
    {
      text: "Webhook Access",
      Icon: plan.features.plugins ? Checkmark : CrossIcon,
      isChecked: plan.features.plugins ? true : false,
    },
    {
      text: "Custom Redirects",
      Icon: plan.features.redirect ? Checkmark : CrossIcon,
      isChecked: plan.features.redirect ? true : false,
    },
    {
      text: "Export Submissions to CSV",
      Icon: plan.price > 0 ? Checkmark : CrossIcon,
      isChecked: plan.price > 0 ? true : false,
    },
    {
      text: "Allow/Disallow Domains",
      Icon: plan.features.allowed_domains ? Checkmark : CrossIcon,
      isChecked: plan.features.allowed_domains ? true : false,
    },
    {
      text: "Customizable Form Subject",
      Icon: plan.features.email_subject ? Checkmark : CrossIcon,
      isChecked: plan.features.email_subject ? true : false,
    },
    {
      text: "Auto Responder",
      Icon: plan.features.autoresponder ? Checkmark : CrossIcon,
      isChecked: plan.features.autoresponder ? true : false,
    },
    {
      text: "No FormBold Branding",
      Icon: plan.features.remove_branding ? Checkmark : CrossIcon,
      isChecked: plan.features.remove_branding ? true : false,
    },
  ];

  const getPlanName = useCallback(
    (currentPlan) => {
      let planName = currentPlan?.name;
      if (currentPlan?.is_monthly) {
        const parts = planName.split(" - ");
        planName = parts.length > 0 ? parts[0] : planName;
      }
      return planName;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plan]
  );

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
          !confirm(
            "Are you sure you want to downgrade? This action might cause loss of data history or features might not work that is only available with Pro plans"
          )
        ) {
          return;
        }
        callSubscriptionFunc(subsFunc);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, emailVeryfied, hasSubscription]
  );

  return (
    <div
      className={`relative col-span-1 flex flex-col justify-between px-6 py-11 sm:px-9 md:px-6 xl:px-6 2xl:px-9 ${
        (plan.name === "Premium" || plan.name === "Premium - Monthly") &&
        "mt-14 rounded-b-xl border-4 border-t-0 border-[#D7EDFF] bg-white md:mt-0"
      }`}
    >
      {(plan.name === "Premium" || plan.name === "Premium - Monthly") && (
        <div className="absolute -left-1 -top-14 flex h-14 w-[calc(100%+8px)] items-center justify-center rounded-t-xl border-4 border-[#D7EDFF] bg-[#D7EDFF] text-base font-medium text-black ">
          <span className="pr-2">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.1969 9.08833L8.00386 5.29054C9.81828 2.83566 10.7255 1.60822 11.5719 1.86761C12.4183 2.12699 12.4183 3.63245 12.4183 6.64335V6.92725C12.4183 8.01322 12.4183 8.5562 12.7653 8.89679L12.7837 8.91443C13.1382 9.24783 13.7033 9.24783 14.8335 9.24783C16.8675 9.24783 17.8845 9.24783 18.2282 9.86469C18.2339 9.87491 18.2394 9.8852 18.2448 9.89558C18.5693 10.522 17.9804 11.3187 16.8027 12.912L13.9958 16.7098C12.1813 19.1647 11.2741 20.3921 10.4277 20.1327C9.58128 19.8733 9.5813 18.3679 9.58134 15.3569L9.58135 15.0731C9.58136 13.9872 9.58137 13.4442 9.23438 13.1036L9.21602 13.0859C8.86153 12.7525 8.29639 12.7525 7.16611 12.7525C5.13215 12.7525 4.11516 12.7525 3.77146 12.1357C3.76577 12.1255 3.76024 12.1152 3.75486 12.1048C3.43041 11.4784 4.01924 10.6817 5.1969 9.08833Z"
                fill="#0E0B3D"
              />
            </svg>
          </span>
          Most Popular
        </div>
      )}

      <div>
        <div className="mb-3 flex items-center">
          <div className="h-9 w-full max-w-[36px] pr-2 pt-0.5">
            {plan.name === "Free" && freeIcon}

            {(plan.name === "Premium" || plan.name === "Premium - Monthly") &&
              premiumIcon}

            {(plan.name === "Starter" || plan.name === "Starter - Monthly") &&
              starterIcon}
            {(plan.name === "Business" || plan.name === "Business - Monthly") &&
              businessIcon}
          </div>
          <h3
            className={`truncate font-heading text-[26px]/[36px] font-bold ${
              plan.name === "Free" ? "text-black" : "text-primary"
            }`}
          >
            {getPlanName(plan)}
          </h3>
        </div>
        <p className="mb-6 max-w-[306px] font-heading text-base font-medium text-body-color">
          {plan.description}
        </p>

        <p className="flex min-h-[28px] items-end font-heading text-base font-medium text-body-color">
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

        <div className="mb-10 border-b border-fb-gray-3 pb-7.5">
          <div className="mb-7.5 flex items-end">
            <span className="font-heading text-2xl font-black !leading-tight text-black md:text-[28px] lg:text-[32px] 2xl:text-[40px]">
              ${plan.price}
            </span>
            <span className="pb-1 pl-2 text-base font-medium text-body-color md:text-xs lg:text-sm 2xl:text-base">
              /{yearly ? "month" : "month"}
            </span>
          </div>

          <div>
            {plan.name !== "Free" ? (
              <ButtonWithText
                disabled={isActive}
                onClickCallback={(e) => handelOpenCheckout(e, plan)}
                loading={loading}
                text={isActive ? "Current Plan" : "Select Plan"}
                className={`flex h-[52px] w-full items-center justify-center rounded-full border font-heading text-base font-medium duration-300  ${
                  plan.name === "Premium" || plan.name === "Premium - Monthly"
                    ? "border-transparent bg-primary text-white hover:bg-fb-primary-hover"
                    : "border-transparent bg-black text-white hover:bg-black/90"
                } ${
                  isActive
                    ? "pointer-events-none border !border-fb-gray-3 bg-white !text-black"
                    : ""
                } ${
                  plan.name === "Free" &&
                  "!border-fb-gray-3 bg-white !text-black hover:!border-primary hover:bg-primary hover:!text-white"
                }
            `}
              />
            ) : (
              <ButtonWithText
                onClickCallback={(e) => handelFreePlanClick(e, freePlan)}
                text={getFreePlanButtonTitle()}
                className={`flex h-[52px] w-full items-center justify-center rounded-full border !border-fb-gray-3 bg-white font-heading text-base font-medium !text-black duration-300 hover:!border-primary hover:bg-primary hover:!text-white ${
                  isActive
                    ? "pointer-events-none border !border-fb-gray-3 bg-white !text-black"
                    : ""
                } `}
              />
            )}
          </div>
        </div>

        <div className="space-y-5">
          {offers.map((offer, index) => (
            <Offer
              text={offer.text}
              Icon={offer.Icon}
              isActive={isActive}
              isChecked={offer.isChecked}
              offer={offer}
              key={index}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 mt-8">
          {plan.name !== "Free" ? (
            <ButtonWithText
              disabled={isActive}
              onClickCallback={(e) => handelOpenCheckout(e, plan)}
              loading={loading}
              text={isActive ? "Current Plan" : "Select Plan"}
              className={`flex h-[52px] w-full items-center justify-center rounded-full border font-heading text-base font-medium duration-300  ${
                plan.name === "Premium" || plan.name === "Premium - Monthly"
                  ? "border-transparent bg-primary text-white hover:bg-fb-primary-hover"
                  : "border-transparent bg-black text-white hover:bg-black/90"
              } ${
                isActive
                  ? "pointer-events-none border !border-fb-gray-3 bg-white !text-black"
                  : ""
              } ${
                plan.name === "Free" &&
                "!border-fb-gray-3 bg-white !text-black hover:!border-primary hover:bg-primary hover:!text-white"
              }
            `}
            />
          ) : (
            <ButtonWithText
              onClickCallback={(e) => handelFreePlanClick(e, freePlan)}
              text={getFreePlanButtonTitle()}
              className={`flex h-[52px] w-full items-center justify-center rounded-full border !border-fb-gray-3 bg-white font-heading text-base font-medium !text-black duration-300 hover:!border-primary hover:bg-primary hover:!text-white ${
                isActive
                  ? "pointer-events-none border !border-fb-gray-3 bg-white !text-black"
                  : ""
              } `}
            />
          )}
        </div>
        <div>
          <p className="text-center font-heading text-sm font-medium text-body-color">
            Cancel Anytime!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePricingPlan;
