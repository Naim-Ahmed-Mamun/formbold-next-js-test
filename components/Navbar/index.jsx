'use client'
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import integrationAppsData from "../../data/integrationAppsData";
import OfferBanner from "../OfferBanner";
import ActionButtons from "./ActionButtons";
import Brands from "./Brands";
import SocialLinks from "./SocialLinks";
import menuData from "./menuData";

const logoImage = (
  <svg
    width="153"
    height="28"
    viewBox="0 0 153 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28 0V28H10.8031V22.3096H22.6864V16.7699H10.8031V11.3055H22.6864V5.84118H5.38896V28H0V0H28Z"
      fill="#5750F1"
    />
    <path
      d="M51.4835 15.6629V12.6489H44.3547V7.43334H52.8463V4.34071H41V23.4993H44.3547V15.6629H51.4835Z"
      fill="#0E0B3D"
    />
    <path
      d="M53.2473 16.9995C53.2473 21.0357 56.1564 23.8138 60.1664 23.8138C64.1763 23.8138 67.0855 21.0357 67.0855 16.9995C67.0855 12.9634 64.1763 10.1853 60.1664 10.1853C56.1564 10.1853 53.2473 12.9634 53.2473 16.9995ZM56.4447 16.9995C56.4447 14.6407 57.9648 13.042 60.1664 13.042C62.3679 13.042 63.888 14.6407 63.888 16.9995C63.888 19.3583 62.3679 20.957 60.1664 20.957C57.9648 20.957 56.4447 19.3583 56.4447 16.9995Z"
      fill="#0E0B3D"
    />
    <path
      d="M77.3515 10.4998C76.8273 10.3687 76.3818 10.3163 75.9362 10.3163C74.2064 10.3163 72.9746 11.1812 72.4242 12.4654L72.2408 10.5784H69.2268V23.4993H72.4242V17.2092C72.4242 14.6932 73.8657 13.4613 76.1721 13.4613H77.3515V10.4998Z"
      fill="#0E0B3D"
    />
    <path
      d="M82.3201 23.4993V16.1608C82.3201 14.0641 83.5519 13.0682 85.072 13.0682C86.5921 13.0682 87.5618 14.0379 87.5618 15.8463V23.4993H90.7593V16.1608C90.7593 14.0379 91.9387 13.042 93.485 13.042C95.0051 13.042 96.001 14.0117 96.001 15.8726V23.4993H99.1723V15.0339C99.1723 12.0461 97.4425 10.159 94.2975 10.159C92.3318 10.159 90.8117 11.1288 90.1565 12.6227C89.4751 11.1288 88.1122 10.159 86.1466 10.159C84.2857 10.159 82.9753 10.9977 82.3201 12.0723L82.058 10.5522H79.1226V23.4993H82.3201Z"
      fill="#0E0B3D"
    />
    <path
      d="M102.39 23.4993H110.148C114.105 23.4993 116.385 21.5861 116.385 18.31C116.385 16.0822 115.363 14.5621 113.345 13.9069C115.153 13.1468 116.097 11.6267 116.097 9.50383C116.097 6.30637 113.791 4.34071 110.017 4.34071H102.39V23.4993ZM109.728 7.3023C111.615 7.3023 112.664 8.19339 112.664 9.84454C112.664 11.5481 111.642 12.5178 109.807 12.5178H105.745V7.3023H109.728ZM110.017 15.3484C111.877 15.3484 112.952 16.2657 112.952 17.8906C112.952 19.6204 111.904 20.5377 110.017 20.5377H105.745V15.3484H110.017Z"
      fill="#0E0B3D"
    />
    <path
      d="M117.836 16.9995C117.836 21.0357 120.746 23.8138 124.755 23.8138C128.765 23.8138 131.675 21.0357 131.675 16.9995C131.675 12.9634 128.765 10.1853 124.755 10.1853C120.746 10.1853 117.836 12.9634 117.836 16.9995ZM121.034 16.9995C121.034 14.6407 122.554 13.042 124.755 13.042C126.957 13.042 128.477 14.6407 128.477 16.9995C128.477 19.3583 126.957 20.957 124.755 20.957C122.554 20.957 121.034 19.3583 121.034 16.9995Z"
      fill="#0E0B3D"
    />
    <path d="M137.04 23.4993V4H133.868V23.4993H137.04Z" fill="#0E0B3D" />
    <path
      d="M145.321 23.84C147.287 23.84 148.964 22.9751 149.75 21.4812L149.96 23.4993H152.895V4H149.724V12.2033C148.912 10.9191 147.313 10.159 145.504 10.159C141.599 10.159 139.241 13.042 139.241 17.0782C139.241 21.0881 141.573 23.84 145.321 23.84ZM146.029 20.9046C143.801 20.9046 142.438 19.2797 142.438 16.9733C142.438 14.6669 143.801 13.0158 146.029 13.0158C148.256 13.0158 149.698 14.6407 149.698 16.9733C149.698 19.3059 148.256 20.9046 146.029 20.9046Z"
      fill="#0E0B3D"
    />
  </svg>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuButtonHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const [sticky, setSticky] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  }, []);

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (pathname.includes("/builder")) {
      setSticky(false);
    }
  },[pathname]);

  return (
    <>
      <OfferBanner showBanner={showBanner} setShowBanner={setShowBanner} />
      <header
        className={`left-0 z-[999] w-full transition-all ${
          showBanner ? "top-0 lg:top-12" : "top-0"
        } ${
          sticky
            ? "fixed bg-white bg-opacity-80 shadow-sticky backdrop-blur-[15px] backdrop-saturate-[150%] lg:py-0"
            : "absolute bg-transparent"
        }`}
      >
        <div
          // className={`w-full px-4 ${
          //   pathname.startsWith("/account") ||
          //   pathname.startsWith("/builder") 
          //     ? "lg:px-5 2xl:px-7"
          //     : "xl:container"
          // }`}
          className={`w-full px-4 ${
            pathname.startsWith("/account") ||
            pathname.startsWith("/builder")
              ? "lg:px-5 2xl:px-7"
              : "xl:container"
          }`}
        >
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative flex items-center justify-between py-3 lg:py-0">
                <div className="mr-5 w-full max-w-[180px] lg:mr-1 2xl:mr-5">
                  <Link href="/" name="FormBold" aria-label="FormBold">
                    {logoImage}
                  </Link>
                </div>
                <div className="flex items-center">
                  <button
                    className="absolute right-0 top-1/2 block -translate-y-1/2 cursor-pointer bg-transparent lg:hidden"
                    onClick={menuButtonHandler}
                    name="mobileMenuButton"
                    aria-label="mobileMenuButton"
                  >
                    <span
                      className={`relative mx-auto my-2 block h-[2px] w-8 bg-gray-900 transition ${
                        isMenuOpen ? "rotate-45" : " "
                      }`}
                    ></span>
                    <span
                      className={`relative mx-auto my-2 block h-[2px] w-8 bg-gray-900 transition ${
                        isMenuOpen ? "hidden" : ""
                      }`}
                    ></span>
                    <span
                      className={`relative mx-auto my-2 block h-[2px] w-8 bg-gray-900 transition ${
                        isMenuOpen ? "top-[-10px] -rotate-45" : ""
                      }`}
                    ></span>
                  </button>
                  <nav
                    className={`header-navbar absolute right-0 top-full z-40 w-full max-w-[270px] rounded bg-white py-2 shadow-md shadow-purple-100 lg:static lg:max-w-full lg:bg-transparent lg:py-0 lg:shadow-none ${
                      isMenuOpen ? "block" : "hidden"
                    } lg:block `}
                  >
                    <ul className="items-center justify-center lg:flex">
                      {menuData.map((item, index) => (
                        <li key={index} className="has-dropdown group relative">
                          {item.dropdown === false ? (
                            <Link href={item.path} onClick={menuButtonHandler}>
                              <span
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className={`${
                                  pathname === item.path && "text-black"
                                } flex cursor-pointer items-center px-4 py-3 font-heading text-base font-medium duration-300 group-hover:text-black hover:text-black lg:px-3 lg:text-sm xl:px-4 xl:text-base`}
                              >
                                {item.title}
                                {item.title === "Form Builder" && (
                                  <span className="-mt-2 ml-1 rounded-2xl bg-primary/5 px-1.5 py-0.5 text-xs text-primary">
                                    Beta
                                  </span>
                                )}
                              </span>
                            </Link>
                          ) : (
                            <>
                              {item.title === "Resources" && (
                                <>
                                  <button
                                    onClick={() =>
                                      setDropdownOpen(!dropdownOpen)
                                    }
                                    className={`${
                                      pathname === item.path &&
                                      "text-black"
                                    } flex cursor-pointer items-center justify-between px-4 py-3 font-heading text-base font-medium duration-300 hover:text-black lg:px-3 lg:py-7 lg:text-sm xl:px-4 xl:text-base`}
                                  >
                                    {item.title}

                                    <span
                                      className={`ml-1 lg:rotate-0 xl:ml-2 ${
                                        dropdownOpen ? "rotate-180" : ""
                                      }`}
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7.41 8.58008L12 13.1701L16.59 8.58008L18 10.0001L12 16.0001L6 10.0001L7.41 8.58008Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                  </button>
                                  <div
                                    className={`${
                                      dropdownOpen ? "block" : "hidden"
                                    } lg:box-shadow-[0px_18px_25px_0px_rgba(113,116,152,0.05)] dropdown w-full p-3 transition-all duration-300 group-hover:visible group-hover:top-full group-hover:opacity-100 lg:invisible lg:absolute lg:left-0 lg:grid lg:w-[480px] lg:grid-cols-2 lg:gap-x-8 lg:rounded-[20px] lg:border lg:border-fb-stroke lg:bg-white lg:px-4 lg:pb-1 lg:pt-4 lg:opacity-0 xl:w-[500px]`}
                                  >
                                    <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-fb-stroke lg:block"></div>

                                    {integrationAppsData.map((app, index) => (
                                      <div key={index}>
                                        <Link href={app.link}
                                          onClick={menuButtonHandler}
                                          target={app.newTab && "_blank"}
                                          rel={
                                            app.newTab &&
                                            "noopener noreferrer"
                                          }
                                          className="mb-2.5 flex cursor-pointer items-center rounded-3xl px-4 py-2.5 duration-300 hover:bg-fb-gray "
                                         >
                                            <div className="mr-3.5">
                                              {app.icon}
                                            </div>
                                            <p className="font-heading text-sm font-medium text-black">
                                              {app.title}
                                            </p>
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                              {item.title === "Solutions" && (
                                <>
                                  <button
                                    onClick={() =>
                                      setProductsDropdownOpen(
                                        !productsDropdownOpen
                                      )
                                    }
                                    className={`${
                                      pathname === item.path &&
                                      "text-black"
                                    } flex cursor-pointer items-center justify-between px-4 py-3 font-heading text-base font-medium duration-300 hover:text-black lg:px-3 lg:py-7 lg:text-sm xl:px-4 xl:text-base`}
                                  >
                                    {item.title}

                                    <span
                                      className={`ml-1 lg:rotate-0 xl:ml-2 ${
                                        productsDropdownOpen ? "rotate-180" : ""
                                      }`}
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7.41 8.58008L12 13.1701L16.59 8.58008L18 10.0001L12 16.0001L6 10.0001L7.41 8.58008Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                  </button>
                                  <div
                                    className={`${
                                      productsDropdownOpen ? "block" : "hidden"
                                    } lg:box-shadow-[0px_18px_25px_0px_rgba(113,116,152,0.05)] dropdown w-full p-3 transition-all duration-300 group-hover:visible group-hover:top-full group-hover:opacity-100 lg:invisible lg:absolute lg:left-0 lg:grid lg:w-[600px] lg:grid-cols-2 lg:gap-x-8 lg:rounded-[20px] lg:border lg:border-fb-stroke lg:bg-white lg:px-4 lg:pb-1 lg:pt-4 lg:opacity-0 xl:w-[795px]`}
                                  >
                                    {item?.submenu.map((submenuItem, index) => (
                                      <div key={index}>
                                        <Link href={submenuItem.link}
                                          onClick={menuButtonHandler}
                                          target={
                                            submenuItem.newTab && "_blank"
                                          }
                                          rel={
                                            submenuItem.newTab &&
                                            "noopener noreferrer"
                                          }
                                          className="group/submenu mb-2.5 flex cursor-pointer rounded-[10px] px-5 py-4 duration-300 hover:bg-fb-gray"
                                        >
                                            <div className="mr-5 pt-1.5 group-hover/submenu:text-primary">
                                              {submenuItem.icon}
                                            </div>
                                            <div>
                                              <h4 className="font-heading text-lg font-bold text-black group-hover/submenu:text-primary">
                                                {submenuItem.title}
                                              </h4>
                                              <p className="text-sm text-body-color">
                                                {submenuItem?.desc}
                                              </p>
                                            </div>
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div className="hidden items-center space-x-3 pr-[60px] font-heading sm:flex lg:pr-0">
                  {/* Our brands */}
                  <Brands />
                  {/* Social Links */}
                  <SocialLinks />

                  {/* Login and Pricing Buttons */}
                  <ActionButtons />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
