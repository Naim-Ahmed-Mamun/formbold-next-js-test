import Link from "next/link";
import React from "react";
import SectionTitle from "../../SectionTitle";
import integrationAppsData from "./integrationAppsData";

export default function IntegrationAppsMain() {
  return (
    <section className="relative z-20 overflow-hidden">
      <div className="container">
        <SectionTitle
          title="All essential integrations you need for a form"
          titleWidth="500"
          paragraph="Connect your forms with different integrations and apps, get notified instantly!"
          paraWidth="600"
          center
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-[-18px] flex flex-wrap justify-center">
              {integrationAppsData.map((integration, id) => (
                <Integration integration={integration} key={id} />
              ))}
            </div>
          </div>

          <div className="mx-auto mb-[22px] mt-10 h-px w-full max-w-[570px] bg-gradient-to-r from-transparent via-fb-gray to-transparent"></div>
          <div className="w-full px-4">
            <div className="mx-auto mb-5 w-full max-w-[390px]">
              <p className="text-center text-sm text-body-color">
                Click the bellow button to see all the essential integrations
                that you will need to for your form
              </p>
            </div>
            <div className="text-center ">
              <Link href="/integrations" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 font-heading text-sm font-medium text-white duration-300 hover:bg-fb-primary-hover">
                  View All Integrations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Integration = ({ integration }) => {
  const { icon, title } = integration;
  return (
    <div className="inline-block w-auto px-4">
      <div className="mx-auto mb-4 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] border border-fb-stroke bg-fb-gray">
        {icon}
      </div>
      <h3 className="text-center text-base font-medium text-black">{title}</h3>
    </div>
  );
};
