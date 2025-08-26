"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty } from "lodash";
import { makeSignedIn } from "../../../../../actions/UserActions";
import {
  getUserActivationData,
  userActivationAttempt,
} from "../../../../../actions/userActivation";
import ButtonWithText from "../../../../../components/Buttons/ButtonWithText";
import PageHeader from "../../../../../components/Common/PageHeader";
import { validateUserActivationForm } from "../../../../../services/userActivation";

const UserActivationsArea = () => {
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth?.signIn);
  const loading = useSelector((state) => state.userActivation?.loading);
  const activationData = useSelector((state) => state.userActivation?.data);
  const searchParams = useSearchParams();

  //states
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({
    name: [],
    password: [],
  });

  const resetAll = () => {
    setName("");
    setPassword("");
    setErr({
      name: [],
      password: [],
    });
  };

  //useEffects
  //   useEffect(() => {
  //     if (!isEmpty(loggedUser)) return;
  //     const user = searchParams.get("user");
  //     if (isEmpty(searchParams.getAll())) {
  //       return;
  //     }
  //     dispatch(getUserActivationData(user));
  //   }, [dispatch, loggedUser, searchParams]);
  useEffect(() => {
    if (!isEmpty(loggedUser)) return;
    const user = searchParams.get("user");

    if ([...searchParams.entries()].length === 0) {
      return;
    }

    dispatch(getUserActivationData(user));
  }, [dispatch, loggedUser, searchParams]);

  useEffect(() => {
    if (activationData?.id) return;
    if (activationData?.user) {
      dispatch(
        makeSignedIn({
          token: activationData.token,
          user: activationData.user,
          message: activationData.message,
          emailVerified: activationData.emailVerified,
          hasSubscription: activationData.hasSubscription,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activationData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payLoad = { name: name, password: password };
    const errors = validateUserActivationForm({
      payload: payLoad,
      setError: setErr,
    });
    if (isEmpty(errors)) {
      dispatch(
        userActivationAttempt({
          ...payLoad,
          id: activationData?.id,
        })
      );
    }
  };

  const ShowActivatedMessage = () => (
    <>
      <PageHeader title="User Activation" metaDescription="" noindex />

      <div className="mx-auto w-full max-w-[380px] py-12 md:py-28 lg:py-36 xl:py-44 2xl:py-56">
        <div className="mx-auto mb-6 text-center">
          <h3 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
            User Activation
          </h3>
          <p className="mb-14 text-sm font-medium text-body-color xs:text-base">
            User already activated
          </p>
        </div>
      </div>
    </>
  );

  return loggedUser || !activationData?.id ? (
    <ShowActivatedMessage />
  ) : (
    <>
      <PageHeader title="User Activation" metaDescription="" noindex />
      <div className="flex min-h-screen items-center justify-center px-6 py-10 md:px-10 lg:p-20">
        <div className="mx-auto w-full max-w-[380px] py-12 xl:py-16">
          <div className="mx-auto mb-6 text-center">
            <h3 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
              Welcome 🎉
            </h3>
            <p className="mb-10 text-sm font-medium text-body-color xs:text-base">
              Choose your password and you are ready to go
            </p>
          </div>

          <div>
            <div className="mb-5">
              <label
                htmlFor="fullName"
                className="mb-2.5 block text-base font-medium text-black"
              >
                Your full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                type="text"
                autoComplete="name"
                name="fullName"
                id="fullName"
                placeholder="Enter your full name"
                className="flex h-[52px] w-full items-center rounded-full border border-fb-gray-4 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
              />
              {err &&
                err.name &&
                err.name.map((err, index) => (
                  <p key={index} className="mt-1 text-red-600">
                    {err}
                  </p>
                ))}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-2.5 block text-base font-medium text-black"
              >
                Your Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                v-model="form.password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="flex h-[52px] w-full items-center rounded-full border border-fb-gray-4 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
              />
              {err &&
                err.password &&
                err.password.map((err, index) => (
                  <p key={index} className="mt-1 text-red-600">
                    {err}
                  </p>
                ))}
            </div>
            <ButtonWithText
              text="Let's go"
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

export default UserActivationsArea;
