"use client";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserRequiredData } from "../../../../actions/SigninActions";
import Loader from "../../../../components/Icons/Loader";

const AdminArea = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const signInState = useSelector((state) => state.signIn);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const user = signInState;

  const [saveAccessToken, setSaveAccessToken] = useState(false);

  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      return;
    }

    signIn("impersonate", {
      token,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error);
      } else {
        setSaveAccessToken(true);
      }
    });
  }, [token]);

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

export default AdminArea;
