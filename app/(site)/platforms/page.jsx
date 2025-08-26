import FormBox from "../../../components/Forms/FormBox";
import { siteURL } from "../../../services/config";
import { PLATFORMS_DATA } from "./data";

const metaTitle =
  "Create Contact Forms with Free API for HTML, React, Hugo, and More";
const metaDescription =
  "Explore a collection of fully functional contact forms for HTML, React, Webflow, Jekyll, Gatsby, and more. Use FormBold’s free API to collect submissions instantly.";

export const metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: {
    canonical: `${siteURL}/platforms`,
  },
  openGraph: {
    type: "website",
    url: `${siteURL}/platforms`,
    title: metaTitle,
    description: metaDescription,
    images: [
      {
        url: "https://ucarecdn.com/111391b1-aee1-43d9-ac9b-7088664dcf51/contactforms.png",
        width: 1200,
        height: 630,
        alt: "FormBold Contact Forms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: `${siteURL}/platforms`,
    title: metaTitle,
    description: metaDescription,
    images: [
      "https://ucarecdn.com/111391b1-aee1-43d9-ac9b-7088664dcf51/contactforms.png",
    ],
  },
};

export default function ContactFormPage() {
  return (
    <section className="pb-24 pt-24 sm:pt-32 md:pb-28 lg:pt-[140px]">
      <div className="[&_strong]:text-black/85 container">
        <h1
          className={`mb-5 mt-0 text-3xl font-black leading-tight text-black sm:text-4xl sm:leading-tight md:text-[40px] md:leading-tight`}
        >
          Ready-to-Use & Fully Functional Contact Forms
        </h1>

        <p className="mb-3 leading-relaxed">
          Explore a collection of ready-to-use contact form examples for popular
          platforms and frameworks like{" "}
          <strong>HTML, React, Vue, Next.js, Webflow, Astro, Hugo</strong>, and
          more. Each form comes with copy-paste code that connects to FormBold’s{" "}
          <strong>free backend API</strong>—so you can start collecting
          submissions without writing a single line of backend code.
        </p>

        <p className="mb-12 leading-relaxed">
          All forms are designed to work seamlessly with{" "}
          <strong>static sites, JavaScript frameworks</strong>, and{" "}
          <strong>site builders</strong>—making it easy to create contact forms
          for any website.
        </p>

        <div className="grid gap-x-8 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS_DATA.map((platform) => {
            return <FormBox key={platform.path} data={platform} />;
          })}
        </div>
      </div>
    </section>
  );
}
