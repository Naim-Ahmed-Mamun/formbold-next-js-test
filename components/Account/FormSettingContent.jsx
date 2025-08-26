'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { isNil } from "lodash";
import AppTabContent from "./AppTabContent";
import FormSettingTabBar from "./FormSettingTabBar";
import FormSettingsTabContent from "./FormSettingsTabContent";
import IntegrationTabContent from "./IntegrationTabContent";
import SubmissionsTabContent from "./SubmissionsTabContent";

const tabs = ["integration", "submissions", "settings", "apps"];

const FormSettingContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formId, setFormId] = useState(undefined);
  const [openTab, setOpenTab] = useState(undefined);

    // Read query parameters and set initial state
    useEffect(() => {
      const queryTab = searchParams.get('tab');
      const id = searchParams.get('id');
      setOpenTab(queryTab && tabs.includes(queryTab) ? queryTab : 'settings');
      id && setFormId(id);
    }, [searchParams]);
  
    // Update URL query parameters when openTab or formId changes
    useEffect(() => {
      if (!isNil(openTab)) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('tab', openTab);
  
        router.push(`?${newSearchParams.toString()}`, { scroll: false });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openTab, formId]);

  return (
    <>
      <FormSettingTabBar openTab={openTab} setOpenTab={setOpenTab} />

      <div>
        {openTab === "integration" && <IntegrationTabContent />}
        {openTab === "submissions" && <SubmissionsTabContent />}
        {openTab === "settings" && <FormSettingsTabContent />}
        {openTab === "apps" && <AppTabContent />}
      </div>
    </>
  );
};

export default FormSettingContent;
