import Emitter from "./emitter";
import config from "./config";

import { toast } from "react-toastify";

export const openCheckout = async (product) => {
  window.Paddle.Checkout.open({
    product: product,
    success: `${config.siteURL}/thank-you`,
    email: undefined,
    passthrough: { host_url: config.siteURL },
    successCallback: () => {
      window.location.href = `${config.siteURL}/thank-you`;
    },
    // successCallback: () =>
    //   toast.success("Thanks for your purchase. 🥳 - Please, check your email inbox for confirmation link and additional details", {
    //     onClose: function () {
    //       window.location.href = `${config.siteURL}/thank-you`;
    //     },
    //   }),
    closeCallback: (reason) => console.warn(reason),
  });
};

export const openCheckoutWithCallBack = async ({ link, checkoutCompleted }) => {
  Emitter.emit("OPEN_CHECKOUT", {
    link: link,
    checkoutCompleted: checkoutCompleted,
  });
};
