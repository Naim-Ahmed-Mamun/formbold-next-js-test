"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
const MarkdownContainer = dynamic(() => import("../../../../../components/MarkdownContainer",{ssr: false}));


export default function IntegrationDetailMain({ post }) {
  return (
    <>
      <section className="pb-20 pt-24 sm:pt-32 md:pb-28 lg:pt-[140px]">
        <div className="container">
          <div className="mx-auto w-full max-w-[770px]">
            <div className="mx-auto w-full max-w-[570px]">
              <div className="mx-auto mb-10 flex w-full max-w-[280px] items-center justify-between rounded-[80px] border border-fb-gray-2 bg-fb-gray p-4">
                <div className="flex aspect-square w-[90px] items-center justify-center rounded-full bg-white shadow-fb-one">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34 0V34H13.118V27.0902H27.5478V20.3634H13.118V13.7281H27.5478V7.09287H6.54374V34H0V0H34Z"
                      fill="#5750F1"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                      fill="#6C6F93"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                      fill="#6C6F93"
                    />
                  </svg>
                </div>
                <div className="relative flex aspect-square w-[90px] items-center justify-center rounded-full bg-white shadow-fb-one">
                  <Image
                    src={`${post?.icon}`}
                    alt="icon"
                    fill
                    className="aspect-square scale-[55%]"
                  />
                  {/* <img src={post?.icon} alt="icon" /> */}
                </div>
              </div>

              <div className="mb-12 text-center">
                <h1 className="mb-4 font-heading text-2xl font-black text-black sm:text-4xl md:text-[40px]/[48px]">
                  {post?.title}
                </h1>
                <p className="text-base text-body-color">{post?.description}</p>
              </div>
            </div>

            <MarkdownContainer content={post?.content} />

            <div className="relative z-10 mt-[60px] overflow-hidden rounded-[22px] bg-black px-6 py-9 sm:px-6 md:px-9">
              <div className="-mx-3 flex flex-wrap items-center justify-between lg:flex-nowrap">
                <div className="w-full px-3 lg:max-w-[312px]">
                  <div className="mb-8 lg:mb-0">
                    <h2 className="font-heading text-2xl font-bold text-white">
                      Start building automated serverless forms
                    </h2>
                  </div>
                </div>
                <div className="w-full px-3">
                  <div className="items-center sm:flex lg:justify-end">
                    <p className="mb-6 font-heading text-base font-medium text-white sm:mb-0 sm:pr-5">
                      It’s Free - Try Now
                    </p>

                    <Link href="/pricing" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 font-heading text-base font-medium text-white duration-300 hover:bg-fb-primary-hover">
                        Create Your First Form
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[url('/cta/bg.svg')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

