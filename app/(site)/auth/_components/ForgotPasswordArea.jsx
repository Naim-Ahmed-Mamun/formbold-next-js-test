"use client";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestForgotPassword } from "../../../../actions/ForgotPassword";
import ButtonWithText from "../../../../components/Buttons/ButtonWithText";
import { validateForgotPasswordForm } from "../../../../services/forgotPassword";

const ForgotPasswordArea = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.forgotPassword?.loading);

  const [email, setEmail] = useState("");
  const [err, setErr] = useState({ email: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForgotPasswordForm({
      payload: { email: email },
      setError: setErr,
    });
    if (isEmpty(errors)) {
      const payLoad = { email };
      dispatch(requestForgotPassword(payLoad));
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-[420px] pb-14 pt-[200px] md:pb-[120px]">
        <div className="mx-auto mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
            Reset password
          </h1>
        </div>
        <div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2.5 block text-base font-medium text-black"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-[52px] w-full items-center rounded-full border border-fb-gray-4 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
            />
          </div>
          <ButtonWithText
            text="Reset Password"
            loading={loading}
            loaderColor="white"
            className="mb-6 h-[52px] w-full rounded-full bg-primary px-4 text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
            onClickCallback={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordArea;
