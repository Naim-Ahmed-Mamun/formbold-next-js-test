import Image from "next/image";
import CallToActionSmall from "../../../components/SingleSolution/CallToActionSmall";
import ExploreProducts from "../../../components/SingleSolution/ExploreProducts";
import SolutionHeader from "../../../components/SingleSolution/SolutionHeader";
import SolutionStep from "../../../components/SingleSolution/SolutionStep";
import { siteURL } from "../../../services/config";

export const metadata = {
  title: "Free and Easy to Use Form API | Formbold",
  description:
    "FormBold Free Form API – your one-stop solution for creating dynamic and fully functional web forms. Designed to be simple, easy to use and user-friendly.",
  alternates: {
    canonical: `${siteURL}/form-api`,
  },
  openGraph: {
    type: "website",
    url: `${siteURL}/form-api`,
    title: "Free and Easy to Use Form API | Formbold",
    description:
      "FormBold Free Form API – your one-stop solution for creating dynamic and fully functional web forms. Designed to be simple, easy to use and user-friendly.",
    images: [
      {
        url: "https://cdn.formbold.com/formbold.jpg",
        width: 1200,
        height: 630,
        alt: "FormBold Form API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: `${siteURL}/form-api`,
    title: "Free and Easy to Use Form API | Formbold",
    description:
      "FormBold Free Form API – your one-stop solution for creating dynamic and fully functional web forms. Designed to be simple, easy to use and user-friendly.",
    images: ["https://cdn.formbold.com/formbold.jpg"],
  },
};

export default function FormApiPage() {
  return (
    <>
      <SolutionHeader
        subtitle="Form API"
        title="Free Form API you can seamlessly integrate it into any platform"
        desc="Make any web form into a dynamic and fully functional one with our simple, user-friendly Form API, works with all popular tech-stacks, frameworks, and libraries."
        link="/auth/register"
      />

      <div className="mx-auto w-full max-w-[770px]">
        <div className="px-4">
          <div className="relative mb-7.5 aspect-[77/39] w-full overflow-hidden rounded-xl">
            <Image
              src="/products-feature/form-api.png"
              alt="Form API"
              fill
              className="object-cover object-center"
              quality={100}
            />
          </div>
          <p className="mb-4.5 text-base text-body-color">
            FormBold Free Form API – your one-stop solution for creating dynamic
            and fully functional web forms. Designed to be simple, easy to use
            and user-friendly.
          </p>
          <p className="mb-4.5 text-base text-body-color">
            Our form API seamlessly integrates with all popular tech stacks,
            frameworks, and libraries, empowering you to transform any static
            web form into an interactive user experience.
          </p>
        </div>

        <div className="mb-[60px] space-y-12">
          <SolutionStep
            image="/products-feature/api1.png"
            title="Get API End-point"
            desc="Start by creating a form from your user dashboard. Upon creation, you'll instantly receive a unique form endpoint URL"
          />
          <SolutionStep
            image="/products-feature/api2.png"
            title="Paste and Ready to Go!"
            right
            desc="Simply copy and paste this API endpoint URL into the 'action' field on your form. That's it! Your form is ready to go."
          />
        </div>

        <ExploreProducts />

        <CallToActionSmall />
      </div>
    </>
  );
}
