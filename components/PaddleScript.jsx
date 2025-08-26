"use client";
import Script from "next/script";
import config from "../services/config";

export default function PaddleScript() {
 

  return (
    <>
      <Script
        id="paddle-lib"
        src="https://cdn.paddle.com/paddle/paddle.js"
        strategy="afterInteractive"
      />

      <Script id="paddle-init" strategy="afterInteractive">
        {`
    window.addEventListener('load', () => {
        console.log('Paddle loaded');
        Paddle.Setup({ vendor: ${config.paddleVendorId} });
        ${
          config.paddleEnvironmentSandbox === "true"
            ? 'Paddle.Environment.set("sandbox");'
            : ""
        }
    });
  `}
      </Script>
    </>
  );
}
