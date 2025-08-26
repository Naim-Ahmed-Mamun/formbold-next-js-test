'use client'
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/SignUpActions";
import {
  getSignUpValidationErrorFromApi,
  resetSignUpValidation,
  validateSignUpForm,
} from "../../services/authService";
import { toast } from "react-hot-toast";

// import Google from "../Icons/Google";
// import Facebook from "../Icons/Facebook";
// import Twitter from "../Icons/Twitter";

import { socialLoginProviders } from "../../services/SocialLogin";
import ButtonWithText from "../Buttons/ButtonWithText";
import ModalCloseIcon from "../Icons/ModalCloseIcon";

import { signIn as signInProvider } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SignUpModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const signUp = useSelector((state) => state.signUp);
  const showModal = useSelector((state) => state.signIn?.showSignUpModal);
  const loader = useSelector((state) => state.signUp?.loading);
  const user = useSelector((state) => state.auth?.signIn);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const validationError = useSelector((state) => state.signUp?.validationError);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({
    email: [],
    password: [],
    name: [],
  });

  const closeModal = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setErr({
      email: [],
      password: [],
      name: [],
    });
    dispatch({ type: "CLOSE_SIGN_UP_MODAL" });
  };

  const handelOpenSignInModal = (e) => {
    e.preventDefault();
    closeModal();
    dispatch({ type: "SHOW_SIGN_IN_MODAL" });
  };

  const submitRegitrationForm = (e) => {
    e.preventDefault();
    const errors = validateSignUpForm({
      payload: { email: email, password: password, name: fullName },
      setError: setErr,
    });
    if (isEmpty(errors)) {
      const payload = {
        email: email,
        password: password,
        name: fullName,
      };
      dispatch(register(payload)).catch((error) => {
        toast.error(error.message || "Registration failed");
        setErr({
          email: [error.message || "Registration failed"],
          password: [],
          name: []
        });
      });
    }
  };

   const searchParams = useSearchParams();
   const redirectToPath = (path) => {
    if (pathname !== path) {
      const url = `${path}?${searchParams.toString()}`;
      router.push(url);
    }
  };
  

  //useEffect
  useEffect(() => {
    if (user && signUp?.register && showModal) {
      closeModal();
      redirectToPath("/auth/verify-email");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, signUp?.register, showModal]);

  useEffect(() => {
    if (validationError && !isEmpty(validationError)) {
      getSignUpValidationErrorFromApi({
        payload: { ...validationError },
        setError: setErr,
      });
    } else {
      resetSignUpValidation({
        setError: setErr,
      });
    }
  }, [validationError]);

  const handelSocialLogin = async (e, provider) => {
    e.preventDefault();
    const intentedPath = pathname.startsWith("/builder")
      ? pathname
      : "/account/dashboard";
    await signInProvider(provider.key, {
      callbackUrl:
        "/auth/verify-user?intent_page=" +
        intentedPath +
        "&provider=" +
        provider.key,
    });
  };

  return (
    showModal && (
      <div className="fixed left-0 top-0 z-[9999] flex h-full min-h-screen w-full items-center justify-center bg-fb-black/[.85] px-4 py-5">
        <div className="relative max-h-full w-full max-w-[520px] overflow-y-auto rounded-xl bg-white px-8 py-8 shadow-fb-seven md:px-12">
          <div>
            <div className="mx-auto mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
                Sign Up to FormBold
              </h3>
              <p className="mx-auto mb-6 max-w-[360px] text-sm font-medium text-body-color sm:text-base">
                Create your account to create forms and start recieving
                submissions
              </p>
            </div>

            <div>
              <div className="mb-6 space-y-4">
                {socialLoginProviders.map((provider, index) => (
                  <button
                    onClick={(e) => handelSocialLogin(e, provider)}
                    key={provider.key}
                    className="flex w-full items-center justify-center rounded-full border border-fb-gray-4 bg-white px-6 py-3.5 text-base font-medium text-black duration-300 hover:bg-fb-gray"
                  >
                    <span className="pr-3">{provider.icon}</span>
                    Sign up with {provider.name}
                  </button>
                ))}
              </div>

              <div className="mb-6 flex items-center justify-center">
                <span className="block h-px w-full bg-fb-gray-3"></span>
                <p className="whitespace-nowrap bg-white px-[18px] text-base font-medium text-body-color">
                  Or Sign up with your email
                </p>
                <span className="block h-px w-full bg-fb-gray-3"></span>
              </div>
            </div>

            <div>
              <form onSubmit={submitRegitrationForm}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-base font-medium text-black"
                  >
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex h-[52px] w-full items-center rounded-full border border-fb-gray-4 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
                  />
                  {err &&
                    err.name &&
                    err.name.map((err, index) => (
                      <p key={index} style={{ color: "red" }}>
                        {err}
                      </p>
                    ))}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-base font-medium text-black"
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
                  {err &&
                    err.email &&
                    err.email.map((err, index) => (
                      <p key={index} style={{ color: "red" }}>
                        {err}
                      </p>
                    ))}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-base font-medium text-black"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
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
                <ButtonWithText
                  type="submit"
                  text="Sign Up"
                  loading={loader}
                  loaderColor={"white"}
                  className="mb-6 h-[52px] w-full rounded-full bg-primary px-4 text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
                />
              </form>
              <p className="flex items-center justify-center text-center text-sm font-medium text-body-color">
                Already using FormBold?
                <button onClick={(e) => handelOpenSignInModal(e)} type="button">
                  <a className="pl-1 font-medium text-black underline underline-offset-2 transition-all hover:text-primary">
                    Log in now
                  </a>
                </button>
              </p>
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

export default SignUpModal;