"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty } from "lodash";
import { register } from "../../../../actions/SignUpActions";
import {
  getSignUpValidationErrorFromApi,
  resetSignUpValidation,
  validateSignUpForm,
} from "../../../../services/authService";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonWithText from "../../../../components/Buttons/ButtonWithText";
import withAuthProtect from "../../../../hoc/withAuthProtect";
import { socialLoginProviders } from "../../../../services/SocialLogin";

const RegistrationArea = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const signUp = useSelector((state) => state.signUp);
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

  const resetAll = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setErr({
      email: [],
      password: [],
      name: [],
    });
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
      dispatch(register(payload));
    }
  };

  //useEffect
  useEffect(() => {
    if (user && signUp?.register) {
      !emailVeryfied
        ? router.push("/auth/verify-email")
        : router.push("/account/dashboard");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, signUp?.register]);

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
    await signIn(provider.key, {
      callbackUrl: "/auth/verify-user?provider=" + provider.key,
    });
  };

  return (
    <>
      <div className="mx-auto w-full max-w-[420px] pb-14 pt-[200px] md:pb-[120px]">
        <div className="mx-auto mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
            Sign Up to FormBold
          </h1>
          <p className="mx-auto mb-10 max-w-[360px] text-sm font-medium text-body-color sm:text-base">
            Create your account to create forms and start recieving submissions
          </p>
        </div>

        <div className="mb-[30px] space-y-4">
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

        <div className="mb-9 flex items-center justify-center">
          <span className="block h-px w-full bg-fb-gray-3"></span>
          <p className="whitespace-nowrap bg-white px-[18px] text-base font-medium text-body-color">
            Or Sign up with your email
          </p>
          <span className="block h-px w-full bg-fb-gray-3"></span>
        </div>

        <div>
          <form onSubmit={submitRegitrationForm}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2.5 block text-base font-medium text-black"
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
              {err &&
                err.email &&
                err.email.map((err, index) => (
                  <p key={index} style={{ color: "red" }}>
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
              loaderColor="white"
              className="mb-6 h-[52px] w-full rounded-full bg-primary px-4 text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
            />
          </form>

          <p className="flex items-center justify-center text-center text-sm font-medium text-body-color">
            Already using FormBold?
            <button onClick={(e) => router.push("/auth/login")}>
              <a className="pl-1 font-medium text-black underline underline-offset-2 transition-all hover:text-primary">
                Log in now
              </a>
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default withAuthProtect(RegistrationArea);
