"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../../services/config";
import Emitter from "./../../../../services/emitter";

import {
  getBillingPageData,
  getPricingPageData,
  resetPaddleCheckout,
} from "../../../../actions/PricingActions";
import PricingSection from "../../../../components/Pricing/PricingSection";
import useAuth from "../../../../hooks/useAuth";

const PricingMain = ({pricingData}) => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const userData = user();

  const signInData = useSelector((state) => state.auth?.signIn);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);

  const paddleCloseCallback = () => {
    dispatch(resetPaddleCheckout());
  };

  const getPageData = () => {
    dispatch(
      signInData && emailVeryfied ? getBillingPageData() : getPricingPageData()
    );
  };

  useEffect(() => {
    Emitter.on("OPEN_CHECKOUT", ({ link, checkoutCompleted }) => {
      window.Paddle.Checkout.open({
        override: link,
        successCallback: checkoutCompleted,
        closeCallback: paddleCloseCallback,
        success: `${config.siteURL}/thank-you`,
        customData: { userId: userData?.id, email: userData?.email, name: userData?.name },
        ...(userData?.email && {
          customer: {
            email: userData.email,
          },
        }),
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    getPageData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInData, emailVeryfied, dispatch]);

  return (
      <PricingSection pricingData={pricingData} />
  );
};

export default PricingMain;
