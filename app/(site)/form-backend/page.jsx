import Image from "next/image";
import CallToActionSmall from "../../../components/SingleSolution/CallToActionSmall";
import ExploreProducts from "../../../components/SingleSolution/ExploreProducts";
import SolutionHeader from "../../../components/SingleSolution/SolutionHeader";
import SolutionStep from "../../../components/SingleSolution/SolutionStep";
import { siteURL } from "../../../services/config";

export const metadata = {
  title: "Free and Powerful Form Backend | Formbold",
  description: 'Get website form submissions straight to your inbox, Slack, Sheet, Notion, Telegram, and more. This streamlined process eliminates the need for a backend server.',
  alternates: {
    canonical: `${siteURL}/form-backend`,
  },
  openGraph: {
    type: "website",
    url: `${siteURL}/form-backend`,
    title: "Free and Powerful Form Backend | Formbold",
    description: 'Get website form submissions straight to your inbox, Slack, Sheet, Notion, Telegram, and more. This streamlined process eliminates the need for a backend server.',
    images: [
      {
        url: "https://cdn.formbold.com/formbold.jpg",
        width: 1200,
        height: 630,
        alt: "FormBold Form Backend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: `${siteURL}/form-backend`,
    title: "Free and Powerful Form Backend | Formbold",
    description: 'Get website form submissions straight to your inbox, Slack, Sheet, Notion, Telegram, and more. This streamlined process eliminates the need for a backend server.',
    images: ["https://cdn.formbold.com/formbold.jpg"],
  },
};

export default function FormBackendPage() {
  return (
    <>
      <SolutionHeader
        subtitle="Form Backend"
        title="Receive submissions to your static forms without backend server"
        desc="Get website form submissions straight to your inbox, Slack, Sheet, Notion, Telegram, and more. This streamlined process eliminates the need for a backend server."
        link="/auth/register"
      />

      <div className="mx-auto w-full max-w-[770px]">
        <div className="px-4">
          <div className="relative mb-7.5 aspect-[77/39] w-full overflow-hidden rounded-xl">
            <Image
              src="/products-feature/form-backend.png"
              alt="Form Backend"
              fill
              quality={100}
              className="object-cover object-center"
            />
          </div>

          <p className="mb-4.5 text-base text-body-color">
            A form backend solution is a streamlined, user-friendly tool that
            effortlessly manages and processes submissions from your website
            forms, eliminating the need for a backend server or any coding
            expertise.{" "}
          </p>
          <p className="mb-4.5 text-base text-body-color">
            It facilitates the direct receipt of these submissions to various
            platforms like email, Slack, Google Sheets, Notion, Telegram and
            more apps.
          </p>
        </div>

        <div className="mb-[60px] space-y-12">
          <SolutionStep
            image="/products-feature/backend1.png"
            title="Connect Apps with Form"
            desc="create a form, go to settings and click on the apps, integrations, and channels you would like to connect."
          />
          <SolutionStep
            image="/products-feature/backend2.png"
            title="Authorize and Recieve Submissions"
            right
            desc="Authorize your form to start receiving submissions through your desired apps and integrations. You can connect multiple integrations to a single form."
          />
        </div>

        <ExploreProducts />

        <CallToActionSmall />
      </div>
    </>
  );
}
