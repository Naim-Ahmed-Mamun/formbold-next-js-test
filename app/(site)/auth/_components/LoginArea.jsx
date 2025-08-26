"use client";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getSignInValidationErrorFromApi,
  resetSignInValidation,
  validateSignInForm,
} from "../../../../services/authService";

import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { getUserRequiredData } from "../../../../actions/SigninActions";
import ButtonWithText from "../../../../components/Buttons/ButtonWithText";
import PageHeader from "../../../../components/Common/PageHeader";
import withAuthProtect from "../../../../hoc/withAuthProtect";
import { socialLoginProviders } from "../../../../services/SocialLogin";

const LoginArea = () => {
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const signInState = useSelector((state) => state.signIn);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);

  const user = signInState;
  const validationError = signInState?.validationError;
  const loader = signInState?.signInLoader;

  const [btnLoader, setBtnLoader] = useState(false);
  const [saveAccessToken, setSaveAccessToken] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({
    email: [],
    password: [],
  });

  const resetAll = () => {
    setEmail("");
    setPassword("");
    setErr({
      email: [],
      password: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignInForm({
      payload: { email: email, password: password },
      setError: setErr,
    });
    if (isEmpty(errors)) {
      const payLoad = {
        email,
        password,
      };
      setBtnLoader(true);

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(response,'response','error',response?.error);
      if (response?.error) {
        setBtnLoader(false);
        toast.error(response.error);
        setErr({
          email: [response.error],
          password: []
        });
      } else {
        setSaveAccessToken(true);
      }
    }
  };

  const redirectToPath = (path) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  //useEffect
  useEffect(() => {
    if (session && saveAccessToken) {
      localStorage.setItem("access_token", session?.accessToken);
      dispatch(getUserRequiredData());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveAccessToken, session]);

  useEffect(() => {
    if (user && signInState?.requestSuccess) {
      !emailVeryfied && redirectToPath("/auth/verify-email");
      emailVeryfied && redirectToPath("/account/dashboard");
    }
    setBtnLoader(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, signInState?.requestSuccess]);

  useEffect(() => {
    if (validationError && !isEmpty(validationError)) {
      getSignInValidationErrorFromApi({
        payload: { ...validationError },
        setError: setErr,
      });
    } else {
      resetSignInValidation({
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
      <PageHeader
        title="Login | Formbold"
        metaDescription="Please log in to manage your forms"
        noindex
      />

      <div className="mx-auto w-full max-w-[420px] pb-14 pt-[200px] md:pb-[120px]">
        <div className="mx-auto mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
            Log in to FormBold
          </h1>
          <p className="mb-9 text-sm text-body-color">
            Please log in to manage your forms
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
              Log in with {provider.name}
            </button>
          ))}
        </div>

        <div className="mb-9 flex items-center justify-center">
          <span className="block h-px w-full bg-fb-gray-3"></span>
          <p className="whitespace-nowrap bg-white px-[18px] text-base font-medium text-body-color">
            Or Log in with your email
          </p>
          <span className="block h-px w-full bg-fb-gray-3"></span>
        </div>

        <div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2.5 block font-heading text-base font-medium text-black"
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
              className="mb-2.5 block font-heading text-base font-medium text-black"
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
          <div className="mb-5 items-center justify-between sm:flex">
            <div className="mb-5 sm:mb-0">
              <label
                htmlFor="remember"
                className="inline-flex cursor-pointer select-none items-center text-sm text-black"
              >
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="peer sr-only"
                />
                <span className="mr-2 flex h-[22px] w-[22px] items-center justify-center rounded-md border border-fb-gray-4 peer-checked:border-primary peer-checked:bg-primary">
                  <span className="peer-check:opacity-100 opacity-0">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1881 0.842575L11.179 0.832651L11.1691 0.823459C10.9218 0.592907 10.5363 0.592183 10.2881 0.821287L4.51345 6.0412L1.72796 3.51675C1.47973 3.28745 1.0941 3.28811 0.84666 3.51873C0.584447 3.76312 0.584446 4.16496 0.84666 4.40935L0.846637 4.40937L0.850256 4.41265L3.78923 7.07619C3.9903 7.26254 4.25614 7.35 4.497 7.35C4.75831 7.35 5.00664 7.25985 5.20463 7.07633L11.1273 1.72262C11.4117 1.48343 11.4143 1.08852 11.1881 0.842575Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.7"
                      />
                    </svg>
                  </span>
                </span>
                Remember me
              </label>
            </div>
            <div>
              <button onClick={(e) => router.push("/auth/forgot-password")}>
                <a className="text-sm text-primary transition hover:underline">
                  Forgot Password?
                </a>
              </button>
            </div>
          </div>
          <ButtonWithText
            type="submit"
            disabled={btnLoader}
            text="Log in"
            loading={btnLoader}
            loaderColor="white"
            className="mb-6 h-[52px] w-full rounded-full bg-primary px-4 text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
            onClickCallback={handleSubmit}
          />
          <p className="flex items-center justify-center text-center text-sm font-medium text-body-color">
            Not registered yet?
            <button onClick={(e) => router.push("/auth/register")}>
              <a className="pl-1 font-medium text-black underline underline-offset-2 transition-all hover:text-primary">
                Create an Account
              </a>
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default withAuthProtect(LoginArea);