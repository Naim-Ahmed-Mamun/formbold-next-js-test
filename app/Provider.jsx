'use client';
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import Layout from "../components/Layout";
import ReduxProvider from "../config/providers";

function Provider({ children}) {
  return (
    <SessionProvider>
      <ReduxProvider>
      <NextTopLoader
        color="#725CFF"
        crawlSpeed={300}
        showSpinner={false}
        shadow="none"
        zIndex={9999999}
      />
        <Layout>
          {children}
        </Layout>
      </ReduxProvider>
    </SessionProvider>
  );
}

export default Provider;
