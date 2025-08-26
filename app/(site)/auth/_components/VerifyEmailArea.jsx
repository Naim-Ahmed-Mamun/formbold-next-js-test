"use client";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  resendVerifyEmail,
  verifyEmail,
} from "../../../../actions/VerifyEmailActions";
import ButtonWithText from "../../../../components/Buttons/ButtonWithText";

const VerifyEmailArea = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const signInData = useSelector((state) => state.auth?.signIn);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const loading = useSelector((state) => state.verifyEmail?.loading);
  const requestSuccess = useSelector(
    (state) => state.verifyEmail?.requestSuccess
  );

  //useEffects
  useEffect(() => {
    const id = searchParams.get("id");
    const hash = searchParams.get("hash");
    const expires = searchParams.get("expires");
    const signature = searchParams.get("signature");
    if (!id || !hash || !expires || !signature) {
      return;
    }
    dispatch(
      verifyEmail({
        id: id,
        hash: hash,
        expires: expires,
        signature: signature,
      })
    );
  }, [searchParams, dispatch]);

  useEffect(() => {
    requestSuccess && router.push("/");
  }, [requestSuccess, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signInData) {
      dispatch(resendVerifyEmail());
    }
  };

  const ShowVerifedMessage = () => (
    <>
      <div className="mx-auto w-full max-w-[420px] pb-14 pt-[200px] md:pb-[120px]">
        <div className="mx-auto mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
            Email Verification
          </h1>
          <p className="mb-9 text-sm text-body-color">
            Your Email Address is already verified
          </p>
        </div>
      </div>
    </>
  );

  const ShowEmailVerifyMessage = () => (
    <>
      <div className="mx-auto w-full max-w-[420px] pb-14 pt-[200px] md:pb-[120px]">
        <div className="mx-auto mb-6 text-center">
          <h3 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
            Confirmation Email Sent!
          </h3>
          <p className="mb-9 text-sm text-body-color">
            We sent you an email to confirm your account please go to your email
            inbox and click to verify
          </p>
        </div>

        <div>
          <p className="mb-6 text-sm font-medium text-body-color">
            Didn’t receive any email? {" "}
            <span
              onClick={(e) => handleSubmit(e)}
              tabIndex="0"
              role="button"
              className="text-black"
            >
              Click to Resend to receive confirmation email again
            </span>
          </p>
          <ButtonWithText
            text="Resend"
            loading={loading}
            loaderColor={"white"}
            className="mb-6 h-[52px] w-full rounded-full bg-primary px-4 text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
            onClickCallback={handleSubmit}
          />
        </div>
      </div>
    </>
  );

  return emailVeryfied ? <ShowVerifedMessage /> : <ShowEmailVerifyMessage />;
};

export default dynamic(() => Promise.resolve(VerifyEmailArea), {
  ssr: false,
});
