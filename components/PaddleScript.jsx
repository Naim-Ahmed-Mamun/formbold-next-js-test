"use client";
import Script from "next/script";
import config from "../services/config";

export default function PaddleScript() {
 

  return (
    <>
      <Script src="https://cdn.paddle.com/paddle/paddle.js" strategy="afterInteractive" />
      <Script
        id="paddle-setup"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            Paddle.Setup({ vendor: ${config.paddleVendorId} });
          `,
        }}
      />
    </>
  );
}
