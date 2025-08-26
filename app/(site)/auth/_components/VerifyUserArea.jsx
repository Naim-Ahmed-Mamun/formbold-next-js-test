"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { makeUserLoggedIn } from "../../../../actions/SigninActions";
import Loader from "../../../../components/Icons/Loader";

const VerifyUserArea = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const signInState = useSelector((state) => state.signIn);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const user = signInState;

  const timerRef = useRef(null);
  const intent_page = searchParams.get("intent_page");
  const provider = searchParams.get('provider');

  useEffect(() => {
    if (!(status === "loading") && !session) {
      toast.warning("Authentication failed!, Please try again");
    }
    if (session && provider) {
      timerRef.current = setTimeout(() => {
        let { user: newUser } = session;
        newUser.accessCode = "formbold_auth_frontend";
        newUser.provider = provider;
        newUser.user_sub = session.user?.id;
        newUser && dispatch(makeUserLoggedIn(newUser));
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status, router.query]);

  const redirectToPath = (path) => {
    if (pathname !== path) {
      const url = `${path}?${searchParams.toString()}`;
      router.push(url);
    }
  };

  useEffect(() => {
    if (user && signInState?.requestSuccess && provider) {
      if (intent_page) {
        redirectToPath(intent_page);
      } else {
        !emailVeryfied && redirectToPath("/auth/verify-email");
        emailVeryfied && redirectToPath("/account/dashboard");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, signInState?.requestSuccess]);

  return (
    <>
      <div className="mx-auto w-full max-w-[420px] pb-14 pt-[200px] md:pb-[120px]">
        <div className="mx-auto mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
            Verifying user
          </h1>
          <p className="mb-9 text-sm text-body-color">Please wait ..</p>
          <Loader show size={100} />
        </div>
      </div>
    </>
  );
};

export default VerifyUserArea;
