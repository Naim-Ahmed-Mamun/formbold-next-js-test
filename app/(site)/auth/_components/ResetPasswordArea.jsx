"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty } from "lodash";
import { signOut } from "../../../../actions";
import { requestResetPassword } from "../../../../actions/ResetPassword";
import ButtonWithText from "../../../../components/Buttons/ButtonWithText";
import { validatePasswordResetForm, validatePasswordResetFormFromApi } from "../../../../services/resetPassword";


const ResetPasswordArea = ({token}) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.resetPassword?.loading);
  const requestSuccess = useSelector((state) => state.resetPassword?.requestSuccess);
  const validationError = useSelector((state) => state.resetPassword?.validationError);

  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = searchParams.get("email");

  const [err, setErr] = useState({
    email: [],
    password: [],
    confirmPassword: [],
    token: [],
  });

  //   useEffects
  useEffect(() => {
    if (!token || !email) {
      return;
    }
    setResetEmail(email);
    setResetToken(token);
  }, [dispatch, email, token]);

  useEffect(() => {
    requestSuccess && dispatch(signOut());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestSuccess]);

  useEffect(() => {
    if (validationError && !isEmpty(validationError)) {
      validatePasswordResetFormFromApi({
        payload: { ...validationError },
        setError: setErr,
      });
    } else {
      setErr({ email: [], password: [], confirmPassword: [], token: [] });
    }
  }, [validationError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      token: resetToken,
      email: resetEmail,
      password: password,
      password_confirmation: confirmPassword,
    };
    const errors = validatePasswordResetForm({
      payload: payload,
      setError: setErr,
    });
    if (isEmpty(errors)) {
      dispatch(requestResetPassword(payload));
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-[420px] pb-14 pt-[200px] md:pb-[120px]">
        <div className="mx-auto mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl">Reset password</h1>
        </div>
        <div>
          <div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-2.5 block text-base font-medium text-black">
                Your Email
              </label>
              <input
                type="email"
                v-model="form.email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="flex h-[52px] w-full items-center rounded-full border border-fb-gray-4 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
              />
              {err &&
                err.email &&
                err.email.map((err, index) => (
                  <p key={index} style={{ color: "red" }}>
                    {err}
                  </p>
                ))}
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="mb-2.5 block text-base font-medium text-black">
                New Password
              </label>
              <input
                type="password"
                v-model="form.password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-[52px] w-full items-center rounded-full border border-fb-gray-4 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
              />
              {err &&
                err.password &&
                err.password.map((err, index) => (
                  <p key={index} style={{ color: "red" }}>
                    {err}
                  </p>
                ))}
            </div>
            <div className="mb-5">
              <label htmlFor="confirm-password" className="mb-2.5 block text-base font-medium text-black">
                Confirm Password
              </label>
              <input
                type="password"
                v-model="form.password_confirmation"
                name="password"
                id="confirm-password"
                placeholder="Enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex h-[52px] w-full items-center rounded-full border border-fb-gray-4 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
              />
              {err &&
                err.password_confirmation &&
                err.password_confirmation.map((err, index) => (
                  <p key={index} style={{ color: "red" }}>
                    {err}
                  </p>
                ))}
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
      </div>
    </>
  );
};

export default ResetPasswordArea;
