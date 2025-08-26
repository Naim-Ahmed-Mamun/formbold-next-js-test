import Image from "next/image";
import Link from "next/link";
import MarkdownContainer from "../../../../components/MarkdownContainer";
import {
  getAllPosts,
  getPostBySlug,
  markdownToHtml,
} from "../../../../data/helper";
import { siteURL } from "../../../../services/config";

async function fetchPost(slug) {
  const data = await getPostBySlug(
    slug,
    [
      "title",
      "description",
      "heading",
      "subheading",
      "icon",
      "slug",
      "author",
      "content",
      "ogImage",
      "ctaTitle",
      "ctaDescription",
    ],
    "platforms"
  );
  return data;
}

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"], "platforms");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchPost(slug); // Fetch post data

  const asPath = `/platforms/${slug}`;

  return {
    title: `${post?.title || "Post"} | FormBold`,
    description: `${post?.description?.slice(0, 136) || ""} ...`,
    alternates: {
      canonical: `${siteURL}${asPath}`,
    },
    openGraph: {
      type: "website",
      url: `${siteURL}${asPath}`,
      title: `${post?.title || "Post"} | FormBold`,
      description: `${post?.description?.slice(0, 136) || ""} ...`,
      images: [
        {
          url: post?.ogImage || "https://cdn.formbold.com/formbold.jpg",
          width: 1200,
          height: 630,
          alt: `${post?.title || "Post"} Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      url: `${siteURL}${asPath}`,
      title: `${post?.title || "Post"} | FormBold`,
      description: `${post?.description?.slice(0, 136) || ""} ...`,
      images: [post?.ogImage || "https://cdn.formbold.com/formbold.jpg"],
    },
  };
}

const graphic = (
  <svg
    width="1021"
    height="361"
    viewBox="0 0 1021 361"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full"
  >
    <circle
      opacity="0.23"
      cx="776.377"
      cy="86.3769"
      r="341.769"
      transform="rotate(-45 776.377 86.3769)"
      fill="url(#paint0_linear_1749_4621)"
    />
    <circle
      opacity="0.23"
      cx="792.335"
      cy="29.3359"
      r="341.769"
      transform="rotate(-45 792.335 29.3359)"
      fill="url(#paint1_linear_1749_4621)"
    />
    <g opacity="0.64" filter="url(#filter0_f_1749_4621)">
      <circle cx="838.5" cy="224.5" r="274.5" fill="#FFA70B" />
    </g>
    <g opacity="0.69" filter="url(#filter1_f_1749_4621)">
      <ellipse cx="596" cy="97.5" rx="296" ry="296.5" fill="#6A64F1" />
    </g>
    <defs>
      <filter
        id="filter0_f_1749_4621"
        x="264"
        y="-350"
        width="1149"
        height="1149"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="150"
          result="effect1_foregroundBlur_1749_4621"
        />
      </filter>
      <filter
        id="filter1_f_1749_4621"
        x="0"
        y="-499"
        width="1192"
        height="1193"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="150"
          result="effect1_foregroundBlur_1749_4621"
        />
      </filter>
      <linearGradient
        id="paint0_linear_1749_4621"
        x1="588.951"
        y1="-614.296"
        x2="713.094"
        y2="178.562"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1749_4621"
        x1="604.909"
        y1="-671.337"
        x2="729.052"
        y2="121.521"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const shape1 = (
  <svg
    width="388"
    height="250"
    viewBox="0 0 388 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.05"
      d="M203 -28.5L4.87819e-05 250.5L881.5 250.5L881.5 -28.5002L203 -28.5Z"
      fill="url(#paint0_linear_971_6910)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_971_6910"
        x1="60.5"
        y1="111"
        x2="287"
        y2="111"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.520507" stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const shape2 = (
  <svg
    width="324"
    height="250"
    viewBox="0 0 324 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.05"
      d="M203 -28.5L4.87819e-05 250.5L881.5 250.5L881.5 -28.5002L203 -28.5Z"
      fill="url(#paint0_linear_971_6911)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_971_6911"
        x1="60.5"
        y1="111"
        x2="287"
        y2="111"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.520507" stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default async function ContactDetailsPage({ params }) {
  const { slug } = await params;
  const data = await fetchPost(slug);
  const content = await markdownToHtml(data?.content || "");
  const post = {
    ...data,
    content,
  };

  return (
    <section className="pb-24 pt-24 sm:pt-32 md:pb-28 lg:pt-[140px]">
      <div className="container">
        <div className="border-stroke relative z-10 mb-12 overflow-hidden rounded-[10px] border px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:mb-16 lg:py-[120px]">
          <div className="absolute right-0 top-0 -z-10 h-full">{graphic}</div>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 lg:mb-0">
                <h1 className="mb-3 text-2xl font-bold !leading-tight text-black sm:text-4xl md:text-[44px]">
                  {post?.heading}
                </h1>
                <p className="text-base text-black sm:text-lg">
                  {post?.subheading}
                </p>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="flex items-center justify-center">
                <div className="shadow-box flex aspect-square w-full max-w-[120px] items-center justify-center rounded-lg bg-white">
                  <svg
                    className="h-full w-full scale-[53%]"
                    viewBox="0 0 68 68"
                    fill="none"
                  >
                    <path
                      d="M67.3337 0.666992V67.3337H26.3885V53.785H54.6822V40.5952H26.3885V27.5849H54.6822V14.5746H13.4979V67.3337H0.666992V0.666992H67.3337Z"
                      fill="#6A64F1"
                    />
                  </svg>
                </div>
                <div className="mx-10">
                  <svg
                    width="27"
                    height="28"
                    viewBox="0 0 27 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="10.667"
                      y="0.666016"
                      width="5.33333"
                      height="26.6667"
                      fill="white"
                    />
                    <rect
                      y="16.666"
                      width="5.33333"
                      height="26.6667"
                      transform="rotate(-90 0 16.666)"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="shadow-box relative flex aspect-square w-full max-w-[120px] items-center justify-center rounded-lg bg-white">
                  <Image
                    src={`${post?.icon}`}
                    alt={post.title}
                    fill
                    className="aspect-square scale-[55%] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[970px]">
          <MarkdownContainer content={post?.content} />

          <div className="bg-primary relative z-10 mt-10 overflow-hidden rounded-lg px-5 py-9 sm:px-10">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-1/2">
                <div className="mb-8 text-center lg:mb-0 lg:text-left">
                  <h2 className="mb-3 text-2xl font-bold text-white text-balance">
                    {post.ctaTitle}
                  </h2>

                  <p className="text-white text-balance">{post.ctaDescription}</p>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <div className="text-center lg:text-right">
                  <Link
                    href="/pricing"
                    className="btn mx-auto inline-flex items-center justify-center bg-white px-9 py-4 !text-black hover:opacity-90"
                  >
                    Get Started - It&apos;s Free
                  </Link>
                </div>
              </div>
            </div>

            <span className="absolute right-0 top-0 -z-10">{shape1}</span>
            <span className="absolute right-0 top-0 -z-10">{shape2}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
