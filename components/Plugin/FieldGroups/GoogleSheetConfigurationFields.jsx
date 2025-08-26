import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../Account/ToggleSwitch";
import { toast } from "react-toastify";

const GoogleSheetConfigurationFields = (props) => {
  const { pluginErr, payload, setPayload } = props;

  const [spreadsheetUrl, setSpreadsheetUrl] = useState(payload?.spreadsheet_url);

  useEffect(() => {
    if (!isEmpty(payload)) {
      setSpreadsheetUrl(payload?.spreadsheet_url);
    }
  }, [payload]);

  const [err, setErr] = useState({
    spreadsheet_url: undefined,
  });

  useEffect(() => {
    if (!isEmpty(pluginErr)) {
      setErr({ ...pluginErr });
    }
  }, [pluginErr]);

  const copy = (url) =>
    window.navigator.clipboard.writeText(url).then(
      function () {
        toast.success("Sheet URL Copied! 🥳");
      },
      function () {
        toast.error("There was a problem copying the endpoint. 😞");
      }
    );

  const goToURL = (url) => window.open(url, "_blank");

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <label htmlFor="name" className="mb-3 block text-base font-medium text-body-color">
            Sheet URL:
          </label>
          <span className="mb-5 text-[12px] text-body-color">Note: Do not change Spreadsheet Tab name.</span>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={spreadsheetUrl}
            id="name"
            name="name"
            placeholder="Speardsheet URL"
            className="placeholder-light mr-2 w-[70%] rounded-lg border border-stroke px-4 py-[18px] text-base font-medium text-body-color outline-none focus-within:shadow-none focus:border-primary focus:shadow-input"
          />
          <button className="btn mr-2 bg-black p-4 font-semibold text-white" onClick={() => copy(spreadsheetUrl)}>
            COPY
          </button>
          <button className="gradient-primary btn p-4" onClick={() => goToURL(spreadsheetUrl)}>
            GO
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetConfigurationFields;
