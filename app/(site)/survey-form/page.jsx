import Image from "next/image";
import CallToActionSmall from "../../../components/SingleSolution/CallToActionSmall";
import ExploreProducts from "../../../components/SingleSolution/ExploreProducts";
import SolutionHeader from "../../../components/SingleSolution/SolutionHeader";
import SolutionStep from "../../../components/SingleSolution/SolutionStep";
import { siteURL } from "../../../services/config";

export const metadata = {
  title: "Create Shareable Online Survey Form | Formbold",
  description:
    "Create and share Shareable survey forms online to effortlessly collect data. Share the form's URL or embed it on websites, allowing respondents to easily provide data.",
  alternates: {
    canonical: `${siteURL}/survey-form`,
  },
};

export default function SurveryFormPage() {
  return (
    <>
      <SolutionHeader
        subtitle="Shareable Survey Form"
        title="Shareable web forms to simplify data collection, analysis, and reporting"
        desc="Create and share Shareable survey forms online to effortlessly collect data. Share the form's URL or embed it on websites, allowing respondents to easily provide data."
        link="/auth/register"
      />

      <div className="mx-auto w-full max-w-[770px]">
        <div className="px-4">
          <div className="relative mb-7.5 aspect-[77/39] w-full overflow-hidden rounded-xl">
            <Image
              src="/products-feature/shareable-form.jpg"
              alt="Shareable Form"
              fill
              quality={100}
              className="object-cover object-center"
            />
          </div>
          <p className="mb-4.5 text-base text-body-color">
            Create and share Shareable survey forms online to effortlessly
            collect data. Share the form&apos;s URL or embed it on websites,
            allowing respondents to easily provide data.
          </p>
          <p className="mb-4.5 text-base text-body-color">
            You will get an unique URL with your audience to collect data
            easily. Allow respondents to submit all sort of form fields,
            attachments, including file uploads, which can be used for multiple
            purposes. This streamlined approach simplifies data collection and
            provides flexibility in utilizing the collected information
            effectively.
          </p>
        </div>

        <div className="mb-[60px] space-y-12">
          <SolutionStep
            image="/products-feature/share1.png"
            title="Create and Publish Form"
            desc="Open the form builder, drag and drop the components you need, then click the publish button on the top right."
          />
          <SolutionStep
            image="/products-feature/share2.png"
            title="Share URL for Data Collection"
            right
            desc="Congratulations! Your form is ready to be shared or embedded. You will receive a unique form URL and can start receiving submissions immediately!"
          />
        </div>

        <ExploreProducts />

        <CallToActionSmall />
      </div>
    </>
  );
}
