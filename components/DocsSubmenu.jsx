import Link from "next/link";
import { usePathname } from 'next/navigation';
import React, { useState } from "react";
import { docsImageUrlBuilder } from "../services/config";
import Image from "next/image";

const DocsSubmenu = ({ sidebar }) => {
  const pathname = usePathname();
  const [toggleSubmenu, setToggleSubmenu] = useState(true);

  const handler = () => {
    setToggleSubmenu(!toggleSubmenu);
  };

  // useEffect(() => {
  //   if (sidebar?.slug?.current === router?.query?.slug) {
  //     setToggleSubmenu(true);
  //   }
  // }, []);

  return (
    <>
      <li
        className={`group flex items-center justify-between ${
          `/docs/${sidebar?.slug?.current}` === pathname ||
          pathname.includes(sidebar?.slug?.current)
            ? "bg-fb-gray text-primary"
            : "text-body-color hover:bg-fb-gray hover:text-primary"
        }`}
      >
        <Link
          href={
            sidebar?.slug?.current === "index"
              ? "/docs"
              : `/docs/${sidebar?.slug?.current}`
          }
          className={`group flex w-[90%] items-center rounded-md p-2.5 pl-4 font-heading text-base font-medium capitalize ${
            `/docs/${sidebar?.slug?.current}` === pathname ||
            pathname.includes(sidebar?.slug?.current)
              ? "bg-fb-gray text-primary"
              : "text-body-color"
          }`}
        >
            {sidebar?.icon && (
              <span className="pr-2">
                <Image
                  src={docsImageUrlBuilder.image(sidebar?.icon).url()}
                  alt={sidebar?.name}
                  className="h-[20px] w-[20px]"
                  width={20}
                  height={20}
                />
              </span>
            )}

            <span>{sidebar?.name}</span>
        </Link>
        <span
          className={`ml-auto cursor-pointer p-2 duration-300 ${
            toggleSubmenu
              ? "rotate-180 text-primary"
              : "text-body-color group-hover:text-primary"
          }`}
          onClick={handler}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </li>
      <ul className={`pt-2 ${toggleSubmenu ? "block" : "hidden"}`}>
        {sidebar?.submenus?.map((subitem, i) => (
          <li key={i} className="mb-[6px] ml-10">
            <Link
              href={`/docs/${sidebar?.slug?.current}#${subitem?.slug?.current}`}
              className={`group flex items-center rounded-md p-2.5 pl-4 font-heading text-base font-medium capitalize hover:bg-fb-gray hover:text-primary ${
                pathname ===
                `/docs/${sidebar?.slug?.current}#${subitem?.slug?.current}`
                  ? "bg-fb-gray text-primary"
                  : "text-body-color"
              }`}
            >
                {subitem?.icon && (
                  <span className="relative mr-5 flex aspect-square w-[64px] items-center justify-center rounded-full">
                    <img
                      src={docsImageUrlBuilder.image(subitem?.icon).url()}
                      alt={subitem?.name}
                    />
                  </span>
                )}

                {subitem?.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DocsSubmenu;
