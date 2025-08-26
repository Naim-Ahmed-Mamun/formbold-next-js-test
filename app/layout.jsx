import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "nextra-theme-docs/style.css";
import "prismjs/themes/prism-tomorrow.css";
import config, { siteURL } from "../services/config";
import "../styles/globals.css";
import "../styles/prism-vsc-dark-plus.css";
import { inter, satoshi } from "./fonts";
import Provider from "./Provider";
import PaddleScript from "../components/PaddleScript";

export const metadata = {
  alternates: {
    canonical: `${siteURL}`,
  },
};

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning={true}
      className={`${satoshi.variable} ${inter.variable}`}
    >
      <head>
        <PaddleScript/>
      </head>
      <GoogleTagManager gtmId="GTM-ND9N78ZN" />
      <body suppressHydrationWarning={true}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
