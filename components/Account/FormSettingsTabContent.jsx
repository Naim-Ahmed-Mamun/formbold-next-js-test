import React from "react";
import DomainsCard from "./DomainsCard";
import GeneralSettingsCard from "./GeneralSettingsCard";
import SpamProtectionCard from "./SpamProtectionCard";
import SubmissionProcessingCard from "./SubmissionProcessingCard";
import FormDangerZoneCard from "../Forms/FormDangerZoneCard";

const FormSettingsTabContent = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-8">
            <GeneralSettingsCard />
          </div>
          <div className="mb-8">
            <SpamProtectionCard />
          </div>
          <FormDangerZoneCard />
        </div>

        <div>
          <div className="mb-8">
            <SubmissionProcessingCard />
          </div>
          <DomainsCard />
        </div>
      </div>
    </>
  );
};

export default FormSettingsTabContent;
