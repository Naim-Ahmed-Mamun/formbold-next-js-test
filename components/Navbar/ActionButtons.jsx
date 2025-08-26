import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../hooks/useClickOutside";

const ActionButtons = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth?.signIn);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async () => {
    dispatch({ type: "SHOW_SIGN_IN_MODAL" });
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Clear Redux state first
      dispatch({ type: "SIGN_OUT" });

      // Clear storage
      localStorage.clear();
      sessionStorage.clear();

      // Clear cookies
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      // Next-auth logout - this will handle session cleanup
      await signOut({
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [showAccountMenu, setShowAccountMenu] = useState(false);

  // handle ClickOutside
  const ref = useRef(null);
  useClickOutside(ref, () => setShowAccountMenu(false));

  return (
    <>
      <ul className="flex items-center justify-end">
        {mounted && user ? (
          <li ref={ref} className="group relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center justify-center rounded-3xl border border-fb-stroke bg-fb-gray p-2 pr-4 font-heading text-sm font-medium text-body-color duration-300 hover:bg-fb-stroke"
            >
              {user?.userInfo?.image_url ? (
                <div className="relative mr-3.5 h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={user?.userInfo?.image_url}
                    alt={user?.userInfo?.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <div className="mr-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 font-heading text-base font-medium capitalize text-primary">
                  {user?.userInfo?.name.slice(0, 1)}
                </div>
              )}
              Account
              <span className="pl-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`${showAccountMenu ? "rotate-180" : ""}`}
                >
                  <path
                    d="M8.24759 10.5564L12.5341 6.13612C12.8015 5.8603 12.6394 5.33301 12.2871 5.33301H3.71419C3.36191 5.33301 3.19978 5.8603 3.46725 6.13612L7.75371 10.5564C7.89581 10.703 8.10549 10.703 8.24759 10.5564Z"
                    fill="currentCOlor"
                  />
                </svg>
              </span>
            </button>

            <div
              className={`absolute right-0 w-[240px] rounded-2xl border border-fb-stroke bg-white shadow-fb-seven transition-all duration-300 ${
                showAccountMenu
                  ? "visible top-[calc(100%+8px)] opacity-100"
                  : "invisible top-[calc(100%+12px)] opacity-0"
              }`}
            >
              <div className="p-5 text-center">
                {user?.userInfo?.image_url ? (
                  <div className="relative mx-auto mb-2.5 aspect-square w-[42px] overflow-hidden rounded-full border-[1.5px] border-fb-stroke">
                    <Image
                      src={user?.userInfo?.image_url}
                      alt={user?.userInfo?.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                ) : (
                  <div className="text-xxl mx-auto mb-2.5 flex aspect-square w-[42px] items-center justify-center rounded-full border-[1.5px] border-fb-stroke bg-primary/10 font-heading font-bold capitalize text-primary">
                    {user?.userInfo?.name.slice(0, 1)}
                  </div>
                )}
                <h3 className="truncate font-heading text-sm font-medium text-black">
                  {user?.userInfo?.name}
                </h3>
              </div>

              <div className="border-y border-fb-stroke px-5 py-4">
                <Link
                  href="/pricing"
                  className="mb-1.5 font-heading text-base font-medium text-primary"
                >
                  Upgrade Plan
                </Link>
                <p className="font-heading text-xs font-medium text-body-color">
                  Current Plan: {user?.userInfo?.plan?.name}
                </p>
                <p className="font-heading text-xs font-medium text-body-color">
                  {user?.userInfo?.plan?.usage?.submissions} /{" "}
                  {user?.userInfo?.plan?.usage?.submissions_limit} Submissions
                </p>
              </div>

              <div className="px-5 py-4">
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/account/dashboard">
                      <span
                        onClick={() => setShowAccountMenu(false)}
                        className="flex w-full items-center rounded-[5px] px-3.5 py-2 font-heading text-sm font-medium text-body-color duration-300 hover:bg-fb-gray hover:text-black"
                      >
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/account-settings"
                      onClick={() => setShowAccountMenu(false)}
                      className="flex w-full items-center rounded-[5px] px-3.5 py-2 font-heading text-sm font-medium text-body-color duration-300 hover:bg-fb-gray hover:text-black"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="border-t border-fb-stroke px-5 py-4">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center rounded-[5px] px-3.5 py-2 font-heading text-sm font-medium text-body-color duration-300 hover:bg-fb-gray hover:text-black"
                >
                  Sign Out
                </button>
              </div>

              <div className="absolute right-2.5 top-2.5">
                <button
                  onClick={() => setShowAccountMenu(false)}
                  className="flex aspect-square w-7.5 items-center justify-center rounded-full text-body-color duration-300 hover:bg-fb-gray"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.90758 9.00014L13.3126 5.59514C13.5601 5.34764 13.5601 4.93514 13.3126 4.68764C13.1915 4.56864 13.0286 4.50195 12.8588 4.50195C12.6891 4.50195 12.5261 4.56864 12.4051 4.68764L9.00008 8.09264L5.59508 4.68764C5.47403 4.56864 5.31108 4.50195 5.14133 4.50195C4.97158 4.50195 4.80863 4.56864 4.68758 4.68764C4.44008 4.93514 4.44008 5.34764 4.68758 5.59514L8.09258 9.00014L4.68758 12.4051C4.44008 12.6526 4.44008 13.0651 4.68758 13.3126C4.93508 13.5601 5.34758 13.5601 5.59508 13.3126L9.00008 9.90764L12.4051 13.3126C12.6526 13.5601 13.0651 13.5601 13.3126 13.3126C13.5601 13.0651 13.5601 12.6526 13.3126 12.4051L9.90758 9.00014Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ) : (
          <>
            <li>
              <button
                rel="nofollow noreferrer noopener"
                name="Login"
                aria-label="Login"
                className="inline-flex items-center justify-center px-6 py-3 font-heading text-base font-medium text-body-color duration-300 hover:text-black"
                onClick={handleLogin}
              >
                Login
              </button>
            </li>

            {/* <li>
              <Link href="https://app.formbold.com">
                <a
                  name="get-started"
                  aria-label="get-started"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium duration-300 font-heading text-body-color hover:text-black"
                >
                  Login
                </a>
              </Link>
            </li> */}
            <li>
              <Link
                href="/auth/register"
                name="get-started"
                aria-label="get-started"
                className="inline-flex items-center justify-center rounded-full border-2 border-transparent bg-primary px-[22px] py-2 text-sm font-medium text-white duration-300 hover:bg-fb-primary-hover"
              >
                Get Started <span className="max-[600px]:hidden"> — It&apos;s Free!</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default ActionButtons;
