'use client'
import { isEmpty } from "lodash";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { validateForgotPasswordForm } from "../../services/forgotPassword";

import {
  requestForgotPassword,
  resetForgetPasswordRequestSuccess,
} from "../../actions/ForgotPassword";
import ButtonWithText from "../Buttons/ButtonWithText";
import ModalCloseIcon from "../Icons/ModalCloseIcon";

const ForgotPassModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const forgotPasswordRequestSuccess = useSelector(
    (state) => state.forgotPassword?.requestSuccess
  );
  const showModal = useSelector((state) => state.forgotPassword?.showModal);
  const loader = useSelector((state) => state.forgotPassword?.loading);
  const validationError = useSelector(
    (state) => state.forgotPassword?.validationError
  );

  const [email, setEmail] = useState("");
  const [err, setErr] = useState({ email: [] });

  useEffect(() => {
    if (validationError && !isEmpty(validationError)) {
      // getSignInValidationErrorFromApi({
      //   payload: { ...validationError },
      //   setError: setErr,
      // });
    } else {
      setErr({
        email: [],
      });
    }
  }, [validationError]);

  const closeModal = () => {
    setEmail("");
    setErr({
      email: [],
    });
    dispatch({ type: "CLOSE_FORGOT_PASS_MODAL" });
  };

  const handelOpenSignInModal = (e) => {
    e.preventDefault();
    closeModal();
    dispatch({ type: "SHOW_SIGN_IN_MODAL" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email: email };
    const errors = validateForgotPasswordForm({
      payload: payload,
      setError: setErr,
    });
    if (isEmpty(errors)) {
      dispatch(requestForgotPassword(payload));
    }
  };

  //useEffect
  useEffect(() => {
    if (forgotPasswordRequestSuccess && showModal) {
      closeModal();
      dispatch(resetForgetPasswordRequestSuccess());
    }
    // dispatch(resetForgetPasswordRequestSuccess());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPasswordRequestSuccess, showModal]);

  return (
    showModal && (
      <div className="fixed left-0 top-0 z-[999] flex h-full min-h-screen w-full items-center justify-center bg-[#000] bg-opacity-40 px-4 py-5">
        <div
          className="relative max-h-full w-full max-w-[520px] overflow-y-auto rounded-xl bg-white px-8 py-12 md:p-12"
          style={{ boxShadow: "0px 14px 40px -10px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="mx-auto w-full max-w-[420px]">
            <div className="mx-auto mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
                Reset password
              </h3>
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
                loading={loader}
                loaderColor="white"
                className="mb-6 h-[52px] w-full rounded-full bg-primary px-4 text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
                onClickCallback={handleSubmit}
              />
            </div>
          </div>
          <div className="absolute right-5 top-5">
            <button
              onClick={() => closeModal()}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-body-color duration-300 hover:bg-fb-gray"
            >
              <ModalCloseIcon />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ForgotPassModal;
