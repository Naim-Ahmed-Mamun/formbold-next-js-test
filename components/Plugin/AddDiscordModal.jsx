import { isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFormPluginSuccess,
  addDiscordPlugins,
} from "../../actions/FomPlugins";
import ButtonWithText from "../Buttons/ButtonWithText";
import ModalCloseIcon from "../Icons/ModalCloseIcon";
import useClickOutside from "../../hooks/useClickOutside";

const AddDiscordModal = (props) => {
  const dispatch = useDispatch();
  const { modalOpen, setModalOpen } = props;

  const currentForm = useSelector((state) => state.forms?.currentForm);
  const formPlugins = useSelector((state) => state.formPlugins);

  const [webhookUrl, setWebhookUrl] = useState("");

  const [err, setErr] = useState({
    webhook_url: undefined,
  });

  // click outside delete popup
  const divRef = useRef(null);
  useClickOutside(divRef, () => setModalOpen(false));

  useEffect(() => {
    if (!modalOpen) {
      resetAllFields();
    }
  }, [modalOpen]);

  useEffect(() => {
    if (formPlugins?.requestSucess === true) {
      dispatch(resetFormPluginSuccess());
      handelClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formPlugins?.requestSucess]);

  useEffect(() => {
    !isEmpty(formPlugins?.validationError)
      ? setErr(formPlugins?.validationError)
      : setErr({
          webhook_url: undefined,
        });
  }, [formPlugins?.validationError]);

//   check if the webhook url is valid
  const isValidDiscordWebhook = (url) => {
    const discordWebhookRegex = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/;
    return discordWebhookRegex.test(url);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isEmpty(webhookUrl)){
      setErr({
        webhook_url: "Webhook url is required",
      });
      return;
    }
    if (!isValidDiscordWebhook(webhookUrl)) {
      setErr({
        webhook_url: "Invalid webhook url",
      });
      return;
    }
    const payload = {
      formId: currentForm?.id,
      webhook_url: webhookUrl,
    };
    currentForm && dispatch(addDiscordPlugins(payload));
  };

  const handelClose = () => {
    setModalOpen(false);
  };
  const resetAllFields = () => {
    setWebhookUrl("");
    setErr({
      webhook_url: undefined,
    });
  };
  return (
    <>
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[9999] flex h-full min-h-screen w-full items-center justify-center bg-fb-black/[.85] px-4 py-5">
          <div
            ref={divRef}
            className="relative max-h-full w-full max-w-[700px] overflow-y-auto rounded-xl bg-white px-8 py-12 shadow-fb-seven md:p-12"
          >
            <div>
              <div className="mx-auto mb-6 text-center">
                <h3 className="mb-2 font-heading text-2xl font-bold text-black sm:text-3xl">
                  Add Discord Plugin
                </h3>
              </div>

              <div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-2.5 block font-heading text-base font-medium text-black"
                  >
                    Add Webhook URL
                  </label>
                  <input
                    type="url"
                    name="webhookUrl"
                    id="webhookUrl"
                    placeholder="https://discord.com/api/webhooks/..."
                    value={webhookUrl}
                    required
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full rounded-lg border border-stroke px-6 py-4 text-base font-medium text-black placeholder-body-color outline-none transition-all focus:shadow-input"
                  />
                    {err?.webhook_url &&
                    (Array.isArray(err.webhook_url) ? (
                        err.webhook_url.map((error, index) => (
                        <p key={index} style={{ color: "red" }}>
                            {error}
                        </p>
                        ))
                    ) : (
                        <p style={{ color: "red" }}>{err.webhook_url}</p>
                    ))}
                </div>
                <ButtonWithText
                  text="Add Plugin"
                  loading={formPlugins?.loader}
                  className="inline-flex h-[50px] items-center justify-center rounded-lg bg-primary px-5 font-heading text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
                  onClickCallback={(e) => handleSubmit(e)}
                />
              </div>
              <div className="absolute right-5 top-5">
                <button
                  onClick={handelClose}
                  type="button"
                  className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-body-color duration-300 hover:bg-fb-gray"
                >
                  <ModalCloseIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDiscordModal;
