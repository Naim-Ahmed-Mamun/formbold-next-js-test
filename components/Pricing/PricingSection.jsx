import Image from "next/image";
import paddleImage from "../../public/pricing/paddle.svg";
import PaymentMethods from "../../public/pricing/payment-methods.svg";

import SecureIcon from "../Icons/SecureIcon";
import SectionTitleH1 from "../SectionTitleH1";
import Faq from "./Faq";
import PricingPlan from "./PricingPlan";
import PricingTable from "./PricingTable";

export default function PricingSection() {
  return (
    <section className="pb-12 pt-24 sm:pt-32 md:pb-16 lg:pt-[140px]">
      <div className="container">
        <SectionTitleH1
          title="Pricing Plan Comparison"
          paragraph="Simple transparent pricing plans and free to get started."
          paraWidth="690"
          center
        />
      </div>

      <PricingPlan />

      {/* <FreePlanCard /> */}

      <div className="container">
        <PricingTable />

        <div>
          <p className="mx-auto mb-10 mt-10 flex max-w-[724px] rounded-xl border border-fb-gray-3 bg-fb-gray px-6 py-8 text-base text-body-color">
            <span className="mx-auto pr-5">
              <SecureIcon />
            </span>
            We do not store any credit card information in server, payments are
            processed by gateways and site is secured by 128 bit SSL encryption.
          </p>
        </div>

        <div className="pb-14 md:pb-[100px]">
          <div className="mx-auto mb-4 text-center flex justify-center">
            <Image src={paddleImage} alt="payment" />
          </div>
          <p className="mx-auto mb-6 w-full max-w-[250px] text-center font-heading text-sm font-medium">
            A VAT receipt will be provided via email after making purchase
          </p>

          <div className="mx-auto text-center flex justify-center">
            <Image src={PaymentMethods} alt="payment" />
          </div>
        </div>

        <Faq />
      </div>
    </section>
  );
}
