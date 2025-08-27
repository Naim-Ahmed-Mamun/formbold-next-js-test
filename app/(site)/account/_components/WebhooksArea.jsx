"use client";
import { isNil } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AccountPageBreadcrumb from "../../../../components/Account/AccountPageBreadcrumb";
import AccountPageLayout from "../../../../components/Account/AccountPageLayout";
import CreateTokenCard from "../../../../components/Account/Webhooks/CreateTokenCard";
import TokenListCard from "../../../../components/Account/Webhooks/TokenListCard";
import ApiGuideCard from "../../../../components/Account/Webhooks/ApiGuideCard";
import WebhooksCreateFormBar from "../../../../components/Account/Webhooks/WebhooksCreateFormBar";
// import withAuth from "../../../../hoc/withAuth";
import ApiTokenGuideCard from "../../../../components/Account/Webhooks/ApiTokenGuideCard";

// const tabs = ["api_tokens", "api_guide", "webhooks_guide"];
const tabs = ["api_tokens", "api_guide"];

const WebhooksArea = ({tokens}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openTab, setOpenTab] = useState("");

  useEffect(() => {
    const tab = searchParams.get("tab");
    tab && tabs.includes(tab) ? setOpenTab(tab) : setOpenTab("api_tokens");
  }, [searchParams]);

  useEffect(() => {
    if (!isNil(openTab)) {
      // Create a new URLSearchParams instance
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", openTab);

      // Use router.push to update the URL with the new search params
      router.push(`?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTab]);

  return (
    <>
      <AccountPageLayout>
        <AccountPageBreadcrumb pageName="API  /  Webhooks" />
        <WebhooksCreateFormBar openTab={openTab} setOpenTab={setOpenTab} />

        {openTab === "api_tokens" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <CreateTokenCard />
              <TokenListCard tokens={tokens} />
            </div>

            <ApiTokenGuideCard />
          </div>
        )}

        {openTab === "api_guide" && (
          <div className="grid grid-cols-1 gap-8">
            <div>
              <ApiGuideCard />
            </div>
          </div>
        )}
      </AccountPageLayout>
    </>
  );
};

export default WebhooksArea;
