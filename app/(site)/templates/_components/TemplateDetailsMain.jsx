"use client";
import Image from "next/image";
import Prism from "prismjs";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CodeTab from "../../../../components/CodeTab";
import { imageUrlBuilder } from "../../../../services/config";
const TemplateCode = dynamic(() => import("./TemplateCode"), { ssr: false });

export default function TemplateDetailsMain({ post }) {
  const [copyText, setCopyText] = useState("Copy");
  const [codeShow, setCodeShow] = useState("HTML");
  const handleCodeShow = (show) => {
    setCodeShow(show);
  };
  const notify = async () => {
    try {
      const codeToCopy =
        codeShow === "HTML" ? post?.htmlCode : post?.tailwindCode;

      await navigator.clipboard.writeText(codeToCopy);
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 3000);
    } catch (err) {
      console.error("Copy failed:", err);
      setCopyText("Failed!");
      setTimeout(() => setCopyText("Copy"), 3000);
    }
  };
  useEffect(() => {
    Prism.highlightAll();
  }, [post]);

  return (
    <>
      <section className="pb-10 pt-28 lg:pb-20 lg:pt-[140px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[690px] text-center">
                <h1 className="mb-4 text-center text-3xl font-bold !leading-tight text-black md:text-4xl md:leading-tight xl:text-[40px] xl:leading-tight">
                  {post?.title}
                </h1>
                <p className="text-center text-body-color ">
                  {post?.description}
                </p>
              </div>

              <div className="rounded-[22px] bg-white drop-shadow-[0px_60px_100px_rgba(107,110,148,0.13)] lg:flex">
                <div className="w-full border-fb-gray-3 lg:w-5/12 lg:border-r">
                  <div className="p-9">
                    <a
                      target={post?.previewLink ? "_blank" : "_self"}
                      href={post?.previewLink || "#"}
                      rel="noopener noreferrer"
                    >
                      <div className="group mb-5 flex h-14 cursor-pointer items-center justify-center rounded-3xl bg-fb-gray px-5 shadow-fb-one duration-300 hover:bg-white">
                        <span className="mr-2 text-primary">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            className="fill-current"
                          >
                            <path d="M11.0001 8.25C10.2707 8.25 9.57126 8.53973 9.05554 9.05546C8.53981 9.57118 8.25008 10.2707 8.25008 11C8.25008 11.7293 8.53981 12.4288 9.05554 12.9445C9.57126 13.4603 10.2707 13.75 11.0001 13.75C11.7294 13.75 12.4289 13.4603 12.9446 12.9445C13.4604 12.4288 13.7501 11.7293 13.7501 11C13.7501 10.2707 13.4604 9.57118 12.9446 9.05546C12.4289 8.53973 11.7294 8.25 11.0001 8.25ZM11.0001 15.5833C9.78451 15.5833 8.61872 15.1004 7.75917 14.2409C6.89963 13.3814 6.41675 12.2156 6.41675 11C6.41675 9.78442 6.89963 8.61864 7.75917 7.75909C8.61872 6.89955 9.78451 6.41667 11.0001 6.41667C12.2157 6.41667 13.3814 6.89955 14.241 7.75909C15.1005 8.61864 15.5834 9.78442 15.5834 11C15.5834 12.2156 15.1005 13.3814 14.241 14.2409C13.3814 15.1004 12.2157 15.5833 11.0001 15.5833ZM11.0001 4.125C6.41675 4.125 2.50258 6.97583 0.916748 11C2.50258 15.0242 6.41675 17.875 11.0001 17.875C15.5834 17.875 19.4976 15.0242 21.0834 11C19.4976 6.97583 15.5834 4.125 11.0001 4.125Z" />
                          </svg>
                        </span>
                        <span className="text-base font-medium text-black duration-300 group-hover:text-primary">
                          Live Preview ↗
                        </span>
                      </div>
                    </a>
                    <div className="flex items-center justify-center rounded-lg bg-white ">
                      <div className="w-full p-10 lg:p-8 xl:p-10">
                        {post?.PreviewImage && (
                          <div className="relative h-[400px] md:h-[350px] xl:h-[400px]">
                            <a
                              target={post?.previewLink ? "_blank" : "_self"}
                              href={post?.previewLink || "#"}
                              rel="noopener noreferrer"
                            >
                              <Image
                                src={imageUrlBuilder
                                  ?.image(post?.PreviewImage)
                                  .url()}
                                fill
                                className="object-contain"
                                alt={post?.title}
                              />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-7/12">
                  <div className="p-9">
                    <div className="mb-5 flex h-14 items-center rounded-[30px] bg-fb-gray px-2.5 shadow-fb-one">
                      <CodeTab
                        handleCodeShow={handleCodeShow}
                        codeShow={codeShow}
                        code="HTML"
                      />
                      <CodeTab
                        handleCodeShow={handleCodeShow}
                        codeShow={codeShow}
                        code="Tailwind"
                      />
                    </div>

                    <div className="relative">
                      <button
                        onClick={notify}
                        className="absolute right-4 top-4 z-50 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white duration-300 hover:bg-primary"
                      >
                        {copyText}
                      </button>

                      {codeShow === "HTML" && (
                        <TemplateCode code={post?.htmlCode} />
                      )}
                      {codeShow === "Tailwind" && (
                        <TemplateCode code={post?.tailwindCode} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

