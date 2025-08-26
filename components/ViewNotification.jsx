import Image from "next/image";
import React from "react";
import image from "./../public/view-notification.svg";

export default function ViewNotification() {
  return (
    <section id="view" className="pt-28">
      <div className="container">
        <div className="border-b border-[#D7D7D7] pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[550px] lg:mb-0">
                <h2 className="mb-6 text-3xl font-bold !leading-tight text-black sm:text-4xl md:text-[40px] lg:text-4xl xl:text-[40px]">
                  Connect apps and get notified immediately.
                </h2>
                <p className="max-w-[500px] text-base font-medium text-body-color">
                  When a new submission is received, get notified immediately
                  with submission data. Connect your form with apps and
                  integrations you like and never miss a submission again.
                  Currently, we have - Slack, Telegram, Zapier, and Webhook
                  integrations and more integrations are coming soon!
                </p>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div>
                <Image src={image} alt="Illustration" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
