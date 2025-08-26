import Link from "next/link";
import React from "react";

const IntegrationBox = ({ integration }) => {
  const { icon, title, subtitle, path, desc } = integration;
  return (
    <div className="flex flex-col justify-between rounded-[22px] bg-white p-6 shadow-fb-one duration-300 hover:shadow-[0px_20px_70px_-32px_rgba(107,110,148,0.06)] sm:p-7.5 md:p-6 xl:p-7.5">
      <div>
        <div className="mb-6 flex items-center border-b border-fb-stroke pb-6">
          <div className="mr-6 flex aspect-square w-[70px] items-center justify-center rounded-full border border-fb-gray-2 bg-fb-gray">
            <span className="scale-50">{icon}</span>
          </div>
          <div>
            <h3 className="mb-1 font-heading text-lg font-bold text-black">
              {title}
            </h3>
            <p className="text-sm text-body-color">{subtitle}</p>
          </div>
        </div>

        <p className="mb-[30px] text-sm leading-[24px] text-body-color">
          {desc}
        </p>
      </div>

      <div>
        <Link href={`/integrations/${path}`} className="inline-flex items-center justify-center rounded-3xl border border-fb-gray-3 bg-white px-7 py-2.5 font-heading text-base font-medium text-black duration-300 hover:border-primary hover:text-primary">
          View integration
        </Link>
      </div>
    </div>
  );
};

export default IntegrationBox;
