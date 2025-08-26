import {
  getAllTemplates,
  getAllTemplateTags,
} from "../../../adapter/templetes";
import { siteURL } from "../../../services/config";
import TemplatesMain from "./_components/TemplateMain";

export const metadata = {
  title:
    "30+ Free HTML Form Templates - Based on HTML/CSS and Tailwind | FormBold",
  description:
    "Ready to use free HTML form templates that you can copy-paste and start using immediately all you need to add FormBold to make them fully working, we crafted almost all essential coded forms you may need for different purposes and available in HTML and Tailwind CSS version.",
    alternates: {
      canonical: `${siteURL}/templates`,
    },
  openGraph: {
    type: "website",
    url: `${siteURL}/templates`,
    title:
      "30+ Free HTML Form Templates - Based on HTML/CSS and Tailwind | FormBold",
    description:
      "Ready to use free HTML form templates that you can copy-paste and start using immediately all you need to add FormBold to make them fully working, we crafted almost all essential coded forms you may need for different purposes and available in HTML and Tailwind CSS version.",
    images: [
      {
        url: "https://cdn.formbold.com/formbold-templates.jpg",
        width: 1200,
        height: 630,
        alt: "FormBold HTML Form Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: `${siteURL}/templates`,
    title:
      "30+ Free HTML Form Templates - Based on HTML/CSS and Tailwind | FormBold",
    description:
      "Ready to use free HTML form templates that you can copy-paste and start using immediately all you need to add FormBold to make them fully working, we crafted almost all essential coded forms you may need for different purposes and available in HTML and Tailwind CSS version.",
    images: ["https://cdn.formbold.com/formbold-templates.jpg"],
  },
};

export default async function TemplatePage() {
  const res = await getAllTemplates();
  const allTags = await getAllTemplateTags();
  const all_templates = res?.isError
    ? []
    : res.result.sort((p1, p2) => {
        return new Date(p2._createdAt) - new Date(p1._createdAt);
      });
  const all_tags = allTags?.isError ? [] : allTags?.result;

  return <TemplatesMain allTemplates={all_templates} allTags={all_tags} />;
}
