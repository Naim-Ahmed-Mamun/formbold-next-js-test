import AlternativeBox from '../../../components/Alternatives/AlternativeBox';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import SectionTitleH1 from '../../../components/SectionTitleH1';
import { siteURL } from '../../../services/config';
import { ALTERNATIVES_DATA } from './data';

export const metadata = {
  title: "Alternatives | FormBold",
  description: "Detailed Comparison and Similar Form Solutions like FormBold",
  alternates: {
    canonical: `${siteURL}/alternatives`,
  },
  openGraph: {
    type: "website",
    url: `${siteURL}/alternatives`,
    title: "Alternatives | FormBold",
    description: "Detailed Comparison and Similar Form Solutions like FormBold",
    images: [
      {
        url: "https://cdn.formbold.com/formbold-integrations.png",
        width: 1200,
        height: 630,
        alt: "FormBold Alternatives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: `${siteURL}/alternatives`,
    title: "Alternatives | FormBold",
    description: "Detailed Comparison and Similar Form Solutions like FormBold",
    images: ["https://cdn.formbold.com/formbold-integrations.png"],
  },
};

export default function AlternativePage() {
  return (
    <section className="pt-24 lg:pt-[96px]">
      <div className="bg-fb-gray pb-14 pt-11 md:pb-[100px]">
        <Breadcrumb pageTitle="Alternatives" />

        <div className="container">
          <SectionTitleH1
            title="FormBold vs the Rest — Best Form Backend Alternatives in 2025"
            paragraph="Explore how FormBold compares to other popular form backends in features, pricing, ease of use, and developer experience."
            center
            titleWidth="700"
            paraWidth="700"
          />

          <div className="grid grid-cols-1 gap-x-7.5 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
            {ALTERNATIVES_DATA.map((alternative) => {
              return (
                <AlternativeBox
                  key={alternative.path}
                  alternative={alternative}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
