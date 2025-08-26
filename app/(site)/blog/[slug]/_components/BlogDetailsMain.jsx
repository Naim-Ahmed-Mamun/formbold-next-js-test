"use client";
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import Link from "next/link";
import Prism from "prismjs";
import { useEffect } from "react";
import Code from "../../../../../components/Code";
import { imageUrlBuilder, sanityProjectId } from "../../../../../services/config";

export default function BlogPage({ post }) {
  const { author } = post;
  const serializers = {
    types: {
      Code: (props) => {
        if (props?.node?.code) {
          return (
            <div>
              <Code code={props?.node} />
            </div>
          );
        }
      },
      image: (props) => {

        if (!props?.node?.asset) {
          return null;
        }

        return (
          <div>
            <Image
              width={1200}
              height={650}
              src={imageUrlBuilder.image(props.node.asset)?.url()}
              alt={post.title}
              className="lg:min-h-auto min-h-[250px] w-full object-cover object-center"
            />
          </div>
        );
      },
      table: (props) => {
        //design the table here

        return (
          <>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                {props?.node?.rows?.map((row,ri) => {
                  return (
                    <tr key={ri} className="border-stroke text-body-color odd:bg-primary/[.08] odd:text-black first-of-type:border-t">
                      {row?.cells?.map((cell,ci) => (
                        <td key={ci} className="max-w-[160px] border-b border-l border-stroke px-2 py-5 text-center text-base font-medium first-of-type:bg-yellow-50 first-of-type:text-black last-of-type:border-r">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </table>
            </div>
          </>
        );
      },
    },
    marks: {
      link: ({ mark, children }) => {
        if (mark?.blank === true) {
          return (
            <a
              href={mark?.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {children}
            </a>
          );
        }
        return (
          <Link
            href={
              mark?.href?.toString()?.startsWith("/")
                ? `${mark?.href}`
                : `/${mark?.href}`
            }
          >
            {children}
          </Link>
        );
      },
    },
  };

  const desc = post?.metaDescription || post?.description.split('"').join("'");
  const metaDescription = desc?.slice(0, 136);
  const title = `${post?.title} | FromBold`;
  const ogTitle = `${post?.ogTitle || post?.title} | FromBold`;
  const ogImage = post?.mainImage
    ? imageUrlBuilder.image(post?.mainImage)?.url()
    : "";
  const ogUrl = `https://formbold.com/blog/${post?.slug?.current}`;

  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "http://schema.org",
        "@type": "Article",
        "headline": "${post.title}",
        "description": "${`${metaDescription.slice(0, 136)}...`}",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${`https://formbold.com/blog/${post?.slug?.current}`}"
          },
        "image": {
          "@type": "ImageObject",
          "url": "${ogImage}",
          "width": 1700,
          "height": 860
        },
        "author": {
          "@type": "Person",
          "name": "${author?.name}",
          "url": "https://formbold.com"
        },
        "datePublished": "${post?.publishedAt}",
        "dateModified": "${post?._updatedAt}",
        "publisher": {
          "@type": "Organization",
          "name": "FormBold",
          "url": "https://formbold.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://formbold.com/",
            "width": 600,
            "height": 60
          }
        }
      }`,
    };
  }

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(addProductJsonLd()); // important to stringify!
    script.key = "product-jsonld"; // optional, if you need to manage it later
    script.async = true; 
    document.head.appendChild(script); // or document.body.appendChild(script) if needed

    return () => {
      // Clean up if component unmounts
      document.head.removeChild(script);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>

      <section className="pb-10 pt-28 lg:pb-20 lg:pt-[140px]">
        <div className="px-4 lg:container">
          <div className="mx-auto w-full max-w-[970px]">
            <div className="mx-auto w-full max-w-[770px]">
              <h1 className="mb-9 font-heading text-xl font-black !leading-tight text-black sm:text-2xl md:text-4xl lg:text-3xl xl:text-[40px]">
                {post?.title}
              </h1>

              <div className="flex flex-wrap items-center">
                <div className="my-3 mr-11 flex items-center">
                  <div className="relative mr-5 flex aspect-square w-12 items-center justify-center rounded-full bg-primary/10">
                    {author?.image ? (
                      <Image
                        src={imageUrlBuilder.image(author?.image).url()}
                        alt={author?.name}
                        fill
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-xl font-bold text-primary">
                        {author?.name.slice(0, 1)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-black">
                      {author?.name}
                    </h3>

                    <p className="text-sm text-body-color">
                      {author?.bio &&
                        `${author?.bio[0]?.children[0]?.text}
                      ${author?.bio[0]?.children[1]?.text}`}
                    </p>
                  </div>
                </div>

                <div className="my-3 mr-8 flex items-center">
                  <span className="pr-2.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_198_11754)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.42873 2.09916C7.96819 2.16002 7.39952 2.29065 6.59055 2.47733L5.66941 2.6899C4.98615 2.84758 4.51561 2.95689 4.15621 3.08024C3.80925 3.19932 3.61295 3.31671 3.46483 3.46483C3.31671 3.61295 3.19932 3.80925 3.08024 4.15621C2.95689 4.51561 2.84758 4.98615 2.6899 5.66941L2.47733 6.59055C2.29065 7.39952 2.16002 7.96819 2.09916 8.42873C2.03987 8.87738 2.05354 9.18095 2.13268 9.45691C2.21183 9.73288 2.36112 9.99754 2.64919 10.3466C2.94489 10.7049 3.35705 11.1179 3.94411 11.7049L5.31634 13.0771C6.33595 14.0968 7.0615 14.8206 7.68526 15.2965C8.29604 15.7625 8.74266 15.9375 9.19674 15.9375C9.65082 15.9375 10.0975 15.7625 10.7082 15.2965C11.332 14.8206 12.0575 14.0968 13.0771 13.0771C14.0968 12.0575 14.8206 11.332 15.2965 10.7082C15.7625 10.0975 15.9375 9.65082 15.9375 9.19674C15.9375 8.74266 15.7625 8.29604 15.2965 7.68526C14.8206 7.0615 14.0968 6.33595 13.0771 5.31634L11.7049 3.94411C11.1179 3.35705 10.7049 2.94489 10.3466 2.64919C9.99754 2.36112 9.73288 2.21183 9.45691 2.13268C9.18095 2.05354 8.87738 2.03987 8.42873 2.09916ZM8.28133 0.983857C8.81932 0.912759 9.29106 0.914766 9.76706 1.05128C10.243 1.18779 10.6441 1.43611 11.0627 1.78154C11.4673 2.11546 11.9179 2.56605 12.4808 3.12898L13.9026 4.55081C14.8856 5.53376 15.6638 6.31199 16.1909 7.00285C16.7333 7.7137 17.0625 8.39778 17.0625 9.19674C17.0625 9.9957 16.7333 10.6798 16.1909 11.3906C15.6638 12.0815 14.8856 12.8597 13.9026 13.8427L13.8427 13.9026C12.8597 14.8856 12.0815 15.6638 11.3906 16.1909C10.6798 16.7333 9.9957 17.0625 9.19674 17.0625C8.39778 17.0625 7.7137 16.7333 7.00285 16.1909C6.31198 15.6638 5.53375 14.8856 4.55078 13.9026L3.12897 12.4808C2.56605 11.9179 2.11546 11.4673 1.78154 11.0627C1.43611 10.6441 1.18779 10.243 1.05128 9.76706C0.914766 9.29106 0.912759 8.81932 0.983857 8.28133C1.05259 7.76126 1.19588 7.14036 1.37489 6.36467L1.60039 5.38751C1.74976 4.74017 1.87157 4.2123 2.01616 3.79102C2.16716 3.35104 2.35735 2.98133 2.66934 2.66934C2.98133 2.35735 3.35104 2.16716 3.79101 2.01616C4.2123 1.87157 4.74017 1.74976 5.38751 1.60039L6.36466 1.37489C7.14036 1.19588 7.76126 1.05259 8.28133 0.983857ZM7.1182 5.99636C6.75209 5.63024 6.1585 5.63024 5.79238 5.99636C5.42626 6.36247 5.42626 6.95607 5.79238 7.32218C6.1585 7.6883 6.75209 7.6883 7.1182 7.32218C7.48432 6.95607 7.48432 6.36247 7.1182 5.99636ZM4.99688 5.20086C5.80234 4.39541 7.10824 4.39541 7.9137 5.20086C8.71916 6.00632 8.71916 7.31222 7.9137 8.11768C7.10824 8.92313 5.80234 8.92313 4.99688 8.11768C4.19143 7.31222 4.19143 6.00632 4.99688 5.20086ZM14.2883 8.24263C14.508 8.46229 14.508 8.81845 14.2883 9.03812L9.05407 14.2726C8.8344 14.4922 8.47825 14.4922 8.25857 14.2726C8.0389 14.0529 8.03889 13.6968 8.25856 13.4771L13.4928 8.24264C13.7125 8.02297 14.0686 8.02296 14.2883 8.24263Z"
                          fill="#6C6F93"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_198_11754">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  {post?.tags?.length > 0 &&
                    post?.tags?.map((tag) => (
                      <Link
                        key={tag?._id}
                        href={`/blog/tag/${tag?.slug?.current}`}
                        className="mr-2 text-sm text-body-color after:content-[','] last:after:hidden hover:text-primary"
                      >
                        {tag?.title}
                      </Link>
                    ))}
                </div>

                <p className="my-3 mr-8 flex items-center text-sm text-body-color">
                  <span className="pr-2.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.75 10.5C13.1642 10.5 13.5 10.1642 13.5 9.75C13.5 9.33579 13.1642 9 12.75 9C12.3358 9 12 9.33579 12 9.75C12 10.1642 12.3358 10.5 12.75 10.5Z"
                        fill="#6C6F93"
                      />
                      <path
                        d="M12.75 13.5C13.1642 13.5 13.5 13.1642 13.5 12.75C13.5 12.3358 13.1642 12 12.75 12C12.3358 12 12 12.3358 12 12.75C12 13.1642 12.3358 13.5 12.75 13.5Z"
                        fill="#6C6F93"
                      />
                      <path
                        d="M9.75 9.75C9.75 10.1642 9.41421 10.5 9 10.5C8.58579 10.5 8.25 10.1642 8.25 9.75C8.25 9.33579 8.58579 9 9 9C9.41421 9 9.75 9.33579 9.75 9.75Z"
                        fill="#6C6F93"
                      />
                      <path
                        d="M9.75 12.75C9.75 13.1642 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.1642 8.25 12.75C8.25 12.3358 8.58579 12 9 12C9.41421 12 9.75 12.3358 9.75 12.75Z"
                        fill="#6C6F93"
                      />
                      <path
                        d="M5.25 10.5C5.66421 10.5 6 10.1642 6 9.75C6 9.33579 5.66421 9 5.25 9C4.83579 9 4.5 9.33579 4.5 9.75C4.5 10.1642 4.83579 10.5 5.25 10.5Z"
                        fill="#6C6F93"
                      />
                      <path
                        d="M5.25 13.5C5.66421 13.5 6 13.1642 6 12.75C6 12.3358 5.66421 12 5.25 12C4.83579 12 4.5 12.3358 4.5 12.75C4.5 13.1642 4.83579 13.5 5.25 13.5Z"
                        fill="#6C6F93"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.25 1.3125C5.56066 1.3125 5.8125 1.56434 5.8125 1.875V2.44704C6.309 2.43749 6.856 2.43749 7.45759 2.4375H10.5423C11.1439 2.43749 11.691 2.43749 12.1875 2.44704V1.875C12.1875 1.56434 12.4393 1.3125 12.75 1.3125C13.0607 1.3125 13.3125 1.56434 13.3125 1.875V2.49532C13.5075 2.51018 13.6921 2.52886 13.8668 2.55235C14.7461 2.67057 15.4578 2.91966 16.0191 3.48093C16.5803 4.0422 16.8294 4.75392 16.9476 5.63323C17.0625 6.48764 17.0625 7.57935 17.0625 8.95766V10.5423C17.0625 11.9206 17.0625 13.0124 16.9476 13.8668C16.8294 14.7461 16.5803 15.4578 16.0191 16.0191C15.4578 16.5803 14.7461 16.8294 13.8668 16.9476C13.0124 17.0625 11.9206 17.0625 10.5423 17.0625H7.45769C6.07939 17.0625 4.98764 17.0625 4.13323 16.9476C3.25392 16.8294 2.5422 16.5803 1.98093 16.0191C1.41966 15.4578 1.17057 14.7461 1.05235 13.8668C0.937479 13.0124 0.937488 11.9206 0.9375 10.5423V8.95769C0.937488 7.57937 0.937479 6.48764 1.05235 5.63323C1.17057 4.75392 1.41966 4.0422 1.98093 3.48093C2.5422 2.91966 3.25392 2.67057 4.13323 2.55235C4.30793 2.52886 4.49254 2.51018 4.6875 2.49532V1.875C4.6875 1.56434 4.93934 1.3125 5.25 1.3125ZM4.28314 3.66732C3.52857 3.76877 3.09383 3.95902 2.77643 4.27643C2.45902 4.59383 2.26877 5.02857 2.16732 5.78314C2.15014 5.91093 2.13577 6.04546 2.12376 6.1875H15.8762C15.8642 6.04546 15.8499 5.91093 15.8327 5.78314C15.7312 5.02857 15.541 4.59383 15.2236 4.27643C14.9062 3.95902 14.4714 3.76877 13.7169 3.66732C12.9461 3.56369 11.9301 3.5625 10.5 3.5625H7.5C6.06989 3.5625 5.05388 3.56369 4.28314 3.66732ZM2.0625 9C2.0625 8.35949 2.06274 7.80205 2.07231 7.3125H15.9277C15.9373 7.80205 15.9375 8.35949 15.9375 9V10.5C15.9375 11.9301 15.9363 12.9461 15.8327 13.7169C15.7312 14.4714 15.541 14.9062 15.2236 15.2236C14.9062 15.541 14.4714 15.7312 13.7169 15.8327C12.9461 15.9363 11.9301 15.9375 10.5 15.9375H7.5C6.06989 15.9375 5.05388 15.9363 4.28314 15.8327C3.52857 15.7312 3.09383 15.541 2.77643 15.2236C2.45902 14.9062 2.26877 14.4714 2.16732 13.7169C2.06369 12.9461 2.0625 11.9301 2.0625 10.5V9Z"
                        fill="#6C6F93"
                      />
                    </svg>
                  </span>
                  <span>
                    {new Date(post?.publishedAt).toLocaleDateString("en")}{" "}
                  </span>
                </p>
              </div>
            </div>

            <div className="py-10">
              <div className="relative overflow-hidden rounded-xl border border-fb-stroke leading-[0]">
                {post?.mainImage && (
                  <Image
                    src={imageUrlBuilder.image(post?.mainImage).url()}
                    alt={post?.title}
                    width={1200}
                    height={650}
                    className="lg:min-h-auto min-h-[250px] w-full object-cover"
                  />
                )}
              </div>
            </div>

            <div className="mx-auto w-full max-w-[770px]">
              <BlockContent
                className="blogDetailBody prose max-w-none prose-a:text-primary prose-a:no-underline"
                blocks={post.body}
                serializers={serializers}
                projectId={sanityProjectId}
                dataset={"production"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
