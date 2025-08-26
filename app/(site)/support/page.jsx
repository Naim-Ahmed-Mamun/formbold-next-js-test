import SupportForm from "../../../components/SupportForm";
import { siteURL } from "../../../services/config";

export const metadata = {
  title:"Support | FormBold",
  description:"Get in touch with our support team for any questions or concerns you may have. We're here to help!",
  alternates: {
    canonical: `${siteURL}/support`,
  },
  openGraph: {
    type: "website",
    url: `${siteURL}/support`,
    title:"Support | FormBold",
    description:"Get in touch with our support team for any questions or concerns you may have. We're here to help!",
    images: [
      {
        url: "https://cdn.formbold.com/formbold.jpg",
        width: 1200,
        height: 630,
        alt: "FormBold Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: `${siteURL}/support`,
    title:"Support | FormBold",
    description:"Get in touch with our support team for any questions or concerns you may have. We're here to help!",
    images: ["https://cdn.formbold.com/formbold.jpg"],
  },
};

export default function SupportPage() {
  return (
    <SupportForm />
  );
}
