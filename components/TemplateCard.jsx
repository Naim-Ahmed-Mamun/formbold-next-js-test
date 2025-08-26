import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TemplateCard({ template }) {
  return (
    <>
      <article className="relative flex flex-col rounded-[22px] border border-fb-gray bg-white">
        <div className="border-b border-fb-gray p-7">
          <div className="relative h-[400px] md:h-[350px] xl:h-[400px]">
            <Link href={`/templates/${template?.slug?.current}`}>
              {template?.PreviewImage?.length > 0 && (
                <Image
                  src={template?.PreviewImage}
                  fill
                  alt={template?.title}
                  className="object-contain"
                />
              )}
            </Link>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-7">
          <div>
            <h3 className="mb-4 font-heading text-xl font-bold !leading-tight text-black hover:text-primary sm:text-2xl md:text-2xl lg:text-2xl">
              <Link
                href={`/templates/${template?.slug?.current}`}
                className="block"
              >
                {template.title}
              </Link>
            </h3>
            <p className="mb-5 text-sm leading-[24px] text-body-color">
              {template?.description?.slice(0, 100)}...
            </p>
          </div>
          <Link
            href={`/templates/${template?.slug?.current}`}
            className="flex h-12 items-center justify-center rounded-3xl border border-fb-gray-3 bg-white px-6 py-3 font-heading text-base font-medium text-black transition hover:border-primary hover:text-primary"
          >
            Get the code
            <span className="pl-2 pt-0.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8174 3.56296C12.1509 3.65229 12.3487 3.995 12.2594 4.32842L8.94804 16.6865C8.8587 17.0199 8.51599 17.2178 8.18258 17.1285C7.84916 17.0391 7.6513 16.6964 7.74064 16.363L11.052 4.0049C11.1413 3.67148 11.484 3.47362 11.8174 3.56296Z"
                  fill="currentColor"
                />
                <path
                  d="M13.7021 6.10655C13.933 5.84998 14.3282 5.82918 14.5848 6.06009L16.0327 7.36321C16.6463 7.91543 17.1553 8.3735 17.5048 8.78898C17.8723 9.22586 18.1336 9.69523 18.1336 10.2747C18.1336 10.8541 17.8723 11.3234 17.5048 11.7603C17.1553 12.1758 16.6463 12.6339 16.0327 13.1861L14.5848 14.4892C14.3282 14.7201 13.933 14.6993 13.7021 14.4428C13.4712 14.1862 13.492 13.791 13.7486 13.5601L15.1623 12.2877C15.8188 11.6968 16.2615 11.2965 16.5483 10.9556C16.8235 10.6285 16.8836 10.4375 16.8836 10.2747C16.8836 10.1118 16.8235 9.92081 16.5483 9.59366C16.2615 9.2528 15.8188 8.85247 15.1623 8.26156L13.7486 6.98921C13.492 6.7583 13.4712 6.36312 13.7021 6.10655Z"
                  fill="currentColor"
                />
                <path
                  d="M6.25148 6.98921C6.50805 6.7583 6.52885 6.36312 6.29794 6.10655C6.06702 5.84998 5.67184 5.82918 5.41527 6.06009L3.96737 7.36321C3.35375 7.91543 2.84475 8.3735 2.49523 8.78898C2.12771 9.22586 1.86646 9.69523 1.86646 10.2747C1.86646 10.8541 2.12771 11.3234 2.49523 11.7603C2.84474 12.1758 3.35374 12.6339 3.96735 13.1861L5.41527 14.4892C5.67184 14.7201 6.06702 14.6993 6.29794 14.4428C6.52885 14.1862 6.50805 13.791 6.25148 13.5601L4.83775 12.2877C4.18119 11.6968 3.73852 11.2965 3.45178 10.9556C3.17657 10.6285 3.11646 10.4375 3.11646 10.2747C3.11646 10.1118 3.17657 9.92081 3.45178 9.59366C3.73853 9.2528 4.18119 8.85247 4.83776 8.26156L6.25148 6.98921Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </Link>
        </div>
      </article>
    </>
  );
}
