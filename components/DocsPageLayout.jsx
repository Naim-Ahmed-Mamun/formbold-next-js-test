import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React from "react";
import { docsImageUrlBuilder } from "../services/config";
import DocsSubmenu from "./DocsSubmenu";

export default function DocsPageLayout({ children, sidebar }) {
  const pathname = usePathname();
  return (
    <>
      <section className="bg-fb-gray pb-10 pt-28 lg:pb-20 lg:pt-[140px]">
        <div className="3xl:px-14 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12">
          <div>
            <div className="-mx-4 flex flex-wrap lg:flex-nowrap">
              <div className="w-full px-4 lg:w-4/12 xl:w-3/12">
                <div className="sticky top-20 mb-12 lg:mb-0">
                  <div className="overflow-hidden overflow-y-auto rounded-xl bg-white p-4 shadow-fb-one lg:block lg:h-[calc(100vh-100px)]">
                    <ul className="mt-2 pl-1">
                      {sidebar.map((item, i) => (
                        <React.Fragment key={i}>
                          {item.submenus ? (
                            <DocsSubmenu sidebar={item} />
                          ) : (
                            <li>
                              <Link
                                href={
                                  item?.slug?.current === "index"
                                    ? "/docs"
                                    : `/docs/${item?.slug?.current}`
                                }
                                className={`group mb-2 flex items-center rounded-md p-2.5 pl-4 font-heading text-base font-medium capitalize hover:bg-fb-gray hover:text-primary ${
                                  `/docs/${item?.slug?.current}` ===
                                  pathname
                                    ? "bg-fb-gray text-primary"
                                    : "text-body-color"
                                }`}
                              >
                                  {item?.icon && (
                                    <span className="pr-2">
                                      <Image
                                        src={docsImageUrlBuilder
                                          .image(item?.icon)
                                          .url()}
                                        alt={item?.name}
                                        className="h-[20px] w-[20px]"
                                        width={20}
                                        height={20}
                                      />
                                    </span>
                                  )}

                                  <span>{item?.name}</span>
                              </Link>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 lg:w-8/12 xl:w-9/12">
                <div className="overflow-y-auto rounded-xl bg-white p-4 shadow-fb-one sm:px-8 sm:py-12">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
