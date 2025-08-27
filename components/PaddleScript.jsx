"use client";
import Script from "next/script";
import config from "../services/config";

export default function PaddleScript() {

  return (
    <Script
    src="https://cdn.paddle.com/paddle/paddle.js"
    onLoad={() => {
      Paddle.Setup({
        vendor: Number(config.paddleVendorId),
      });
    }}
  />
  );
}
