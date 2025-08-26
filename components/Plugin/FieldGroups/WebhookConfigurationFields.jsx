import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../Account/ToggleSwitch";

const WebhookConfigurationFields = (props) => {
  const { pluginErr, payload, setPayload } = props;

  const [webhookUrl, setWebhookUrl] = useState(payload?.webhook_url);
  const [isRecieveVerifiedSubmissionEnabled, setisRecieveVerifiedSubmissionEnabled] = useState(payload?.receive_verified_submissions);
  const [isRecieveSpamSubmissionEnabled, setisRecieveSpamSubmissionEnabled] = useState(payload?.receive_spam_submissions);

  useEffect(() => {
    if (!isEmpty(payload)) {
      setWebhookUrl(payload?.webhook_url);
      setisRecieveVerifiedSubmissionEnabled(payload?.receive_verified_submissions);
      setisRecieveSpamSubmissionEnabled(payload?.receive_spam_submissions);
    }
  }, [payload]);

  const [err, setErr] = useState({
    receive_spam: undefined,
    receive_verified: undefined,
    webhook_url: undefined,
  });

  useEffect(() => {
    if (!isEmpty(pluginErr)) {
      setErr({ ...pluginErr });
    }
  }, [pluginErr]);

  const handelToggoleUpdate = (e, id, value) => {
    if (id === "isRecieveVerifiedSubmissionEnabled") {
      setisRecieveVerifiedSubmissionEnabled(value);
      setPayload({ ...payload, receive_verified_submissions: value });
    }
    if (id === "isRecieveSpamSubmissionEnabled") {
      setisRecieveSpamSubmissionEnabled(value);
      setPayload({ ...payload, receive_spam_submissions: value });
    }
  };

  return (
    <div>
      <div className="mb-5">
        <label htmlFor="email" className="mb-3 block text-base font-medium text-black">
          URL to be called
        </label>
        <input
          type="url"
          name="webhookUrl"
          id="webhookUrl"
          placeholder="URL to be called"
          value={webhookUrl}
          required
          onChange={(e) => {
            setWebhookUrl(e.target.value);
            setPayload({ ...payload, webhook_url: e.target.value });
          }}
          className="w-full rounded-lg border border-stroke px-6 py-4 text-base font-medium text-black placeholder-body-color outline-none transition-all focus:shadow-input"
        />
        {err &&
          err.webhook_url &&
          err.webhook_url.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}
      </div>
      <div className="mb-5 flex justify-between">
        <div>
          <h5 className="mb-2 text-base font-medium text-black">Receive verified submissions</h5>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch
            id="isRecieveVerifiedSubmissionEnabled"
            checked={isRecieveVerifiedSubmissionEnabled}
            onChangeCallback={(e) => handelToggoleUpdate(e, "isRecieveVerifiedSubmissionEnabled", e.target.checked)}
          />
          {err &&
            err.receive_verified &&
            err.receive_verified.map((err, index) => (
              <p key={index} style={{ color: "red" }}>
                {err}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-5 flex justify-between">
        <div>
          <h5 className="mb-2 text-base font-medium text-black">Receive spam submissions</h5>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch
            id="isRecieveSpamSubmissionEnabled"
            checked={isRecieveSpamSubmissionEnabled}
            onChangeCallback={(e) => handelToggoleUpdate(e, "isRecieveSpamSubmissionEnabled", e.target.checked)}
          />
          {err &&
            err.receive_spam &&
            err.receive_spam.map((err, index) => (
              <p key={index} style={{ color: "red" }}>
                {err}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WebhookConfigurationFields;
