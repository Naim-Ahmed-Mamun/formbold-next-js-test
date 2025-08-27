"use client";
import React, { Suspense } from "react";
import Loader from "../../../components/Icons/Loader";

export default function AccountPageLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader show={true} />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
