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

const PricingMain = () => {
  const dispatch = useDispatch();

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
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPageData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInData, emailVeryfied, dispatch]);

  return (
      <PricingSection />
  );
};

export default PricingMain;
