import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../Account/ToggleSwitch";

const AutoResponderConfigurationFields = (props) => {
  const { pluginErr, payload, setPayload, modalOpen } = props;

  const [formName, setFormName] = useState(payload?.from_name);
  const [emailSubject, setEmailSubject] = useState(payload?.email_subject);
  const [message, setMessage] = useState(payload?.message);
  const [isSpamFilterEnable, setIsSpamFilterEnable] = useState(payload?.is_spam_filter_enable);
  const [isRecaptchaEnable, setIsRecaptchaEnable] = useState(payload?.is_recaptcha_enable);
  const [isEnable, setIsEnable] = useState(payload?.is_enable);

  const [err, setErr] = useState({
    from_name: null,
    email_subject: null,
    message: null,
    is_recaptcha_enable: false,
    is_spam_filter_enable: false,
  });

  useEffect(() => {
    if (!isEmpty(pluginErr)) {
      setErr({ ...pluginErr });
    }
  }, [pluginErr]);

  useEffect(() => {
    if (!modalOpen) {
      resetAllFields();
    }
  }, [modalOpen]);

  const handelToggoleUpdate = (e, id, value) => {
    if (id === "isSpamFilterEnable") {
      setIsSpamFilterEnable(value);
      setPayload({ ...payload, is_spam_filter_enable: value });
    }
    if (id === "isRecaptchaEnable") {
      setIsRecaptchaEnable(value);
      setPayload({ ...payload, is_recaptcha_enable: value });
    }
    if (id === "isEnable") {
      setIsEnable(value);
      setPayload({ ...payload, is_enable: value });
    }
  };

  const resetAllFields = () => {
    setFormName("");
    setEmailSubject("");
    setMessage("");
    setIsSpamFilterEnable(false);
    setIsRecaptchaEnable(false);
    setIsEnable(false);
  };

  return (
    <div>
      <div className="mb-5">
        <label htmlFor="form_name" className="mb-3 block text-base font-medium text-black">
          From:
        </label>
        <input
          type="text"
          name="form_name"
          id="form_name"
          placeholder="Form name"
          value={formName}
          required
          onChange={(e) => {
            setFormName(e.target.value);
            setPayload({ ...payload, from_name: e.target.value });
          }}
          className="w-full rounded-lg border border-stroke px-6 py-4 text-base font-medium text-black placeholder-body-color outline-none transition-all focus:shadow-input"
        />
        {err &&
          err.from_name &&
          err.from_name.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}
      </div>
      <div className="mb-5">
        <label htmlFor="email_subject" className="mb-3 block text-base font-medium text-black">
          Email Subject:
        </label>
        <input
          type="text"
          name="form_name"
          id="email_subject"
          placeholder="Form name"
          value={emailSubject}
          required
          onChange={(e) => {
            setEmailSubject(e.target.value);
            setPayload({ ...payload, email_subject: e.target.value });
          }}
          className="w-full rounded-lg border border-stroke px-6 py-4 text-base font-medium text-black placeholder-body-color outline-none transition-all focus:shadow-input"
        />
        {err &&
          err.email_subject &&
          err.email_subject.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}
      </div>
      <div className="mb-5">
        <label htmlFor="message" className="mb-3 block text-base font-medium text-black">
          Message:
        </label>
        <textarea
          rows="3"
          onChange={(e) => {
            setMessage(e.target.value);
            setPayload({ ...payload, message: e.target.value });
          }}
          id="message"
          value={message}
          required
          name="message"
          placeholder="Type message that will be delivered to submitter"
          className="placeholder-light w-full rounded-lg border border-stroke px-6.5 py-[18px] font-mono text-base font-medium text-black outline-none focus-within:shadow-none focus:border-primary focus:shadow-input"
        />
        {err &&
          err.message &&
          err.message.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}
      </div>
      <div className="mb-6 rounded-[5px] border border-[#F0A92D] bg-[#F0A92D] bg-opacity-[20%] px-[18px] py-[12px] text-base text-body-color">
        <p>
          <span className="font-bold">Notes:</span> You must have to enable basic spam filter, configure custom reCAPTCHA properly and have an email field on the form to make{" "}
          <span className="font-bold">Auto Responder</span> work.
        </p>
      </div>
      <div className="mb-5 flex justify-between">
        <div>
          <h5 className="mb-2 text-base font-medium text-black">Yes, Spam filter is enabled</h5>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch id="isSpamFilterEnable" checked={isSpamFilterEnable} onChangeCallback={(e) => handelToggoleUpdate(e, "isSpamFilterEnable", e.target.checked)} />
        </div>
      </div>
      {err &&
        err.is_spam_filter_enable &&
        err.is_spam_filter_enable.map((err, index) => (
          <p key={index} style={{ color: "red" }}>
            {err}
          </p>
        ))}
      <div className="mb-5 flex justify-between">
        <div>
          <h5 className="mb-2 text-base font-medium text-black">Yes, reCAPTCHA is configured properly</h5>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch id="isRecaptchaEnable" checked={isRecaptchaEnable} onChangeCallback={(e) => handelToggoleUpdate(e, "isRecaptchaEnable", e.target.checked)} />
        </div>
      </div>
      {err &&
        err.is_recaptcha_enable &&
        err.is_recaptcha_enable.map((err, index) => (
          <p key={index} style={{ color: "red" }}>
            {err}
          </p>
        ))}
      <div className="mb-5 flex justify-between">
        <div>
          <h5 className="mb-2 text-base font-medium text-black">Enabled</h5>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch id="isEnable" checked={isEnable} onChangeCallback={(e) => handelToggoleUpdate(e, "isEnable", e.target.checked)} />
        </div>
      </div>
      {err &&
        err.is_enable &&
        err.is_enable.map((err, index) => (
          <p key={index} style={{ color: "red" }}>
            {err}
          </p>
        ))}
    </div>
  );
};

export default AutoResponderConfigurationFields;
