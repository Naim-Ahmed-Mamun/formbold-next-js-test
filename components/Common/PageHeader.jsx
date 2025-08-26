import Head from "next/head";
import React from "react";

const PageHeader = ({
  title = "Free Online Form Builder for Website | FormBold",
  metaDescription = "Free Drag and Drop Form Builder by FormBold. Build unlimited forms for your website, share or embed them anywhere for free. Perfect for all your data collection needs.",
  noindex,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription}></meta>
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  );
};

export default PageHeader;
