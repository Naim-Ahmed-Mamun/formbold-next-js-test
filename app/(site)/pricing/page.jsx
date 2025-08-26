import { siteURL } from "../../../services/config"
import PricingMain from "./_components/PricingMain"

export const metadata = {
  title:"Pricing | FormBold",
  description:"FormBold pricing plans for all users. Choose the plan that fits your needs.",
  alternates: {
    canonical: `${siteURL}/pricing`,
  },
  openGraph: {
    type: "website",
    url: `${siteURL}/pricing`,
    title:"Pricing | FormBold",
    description:"FormBold pricing plans for all users. Choose the plan that fits your needs.",
    images: [
      {
        url: "https://cdn.formbold.com/formbold.jpg",
        width: 1200,
        height: 630,
        alt: "FormBold Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: `${siteURL}/pricing`,
    title:"Pricing | FormBold",
    description:"FormBold pricing plans for all users. Choose the plan that fits your needs.",
    images: ["https://cdn.formbold.com/formbold.jpg"],
  },
}

export default function PricingPage() {
  return (
    <PricingMain/>
  )
}
