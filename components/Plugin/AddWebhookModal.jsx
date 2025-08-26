import { isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWebhookPlugins,
  resetFormPluginSuccess,
} from "../../actions/FomPlugins";
import ToggleSwitch from "../Account/ToggleSwitch";
import ButtonWithText from "../Buttons/ButtonWithText";
import ModalCloseIcon from "../Icons/ModalCloseIcon";
import useClickOutside from "../../hooks/useClickOutside";

const AddWebhookModal = (props) => {
  const dispatch = useDispatch();
  const { modalOpen, setModalOpen } = props;

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const currentForm = useSelector((state) => state.forms?.currentForm);
  const formPlugins = useSelector((state) => state.formPlugins);

  const [webhookUrl, setWebhookUrl] = useState("");
  const [
    isRecieveVerifiedSubmissionEnabled,
    setisRecieveVerifiedSubmissionEnabled,
  ] = useState(false);
  const [isRecieveSpamSubmissionEnabled, setisRecieveSpamSubmissionEnabled] =
    useState(false);

  const [err, setErr] = useState({
    receive_spam: undefined,
    receive_verified: undefined,
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
          receive_spam: undefined,
          receive_verified: undefined,
          webhook_url: undefined,
        });
  }, [formPlugins?.validationError]);

  const handelToggoleUpdate = (e, id, value) => {
    if (id === "isRecieveVerifiedSubmissionEnabled") {
      setisRecieveVerifiedSubmissionEnabled(value);
    }
    if (id === "isRecieveSpamSubmissionEnabled") {
      setisRecieveSpamSubmissionEnabled(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      formId: currentForm?.id,
      receive_spam: isRecieveSpamSubmissionEnabled,
      receive_verified: isRecieveVerifiedSubmissionEnabled,
      webhook_url: webhookUrl,
    };
    currentForm && dispatch(addWebhookPlugins(payload));
  };

  const handelClose = () => {
    setModalOpen(false);
  };
  const resetAllFields = () => {
    setWebhookUrl("");
    setisRecieveVerifiedSubmissionEnabled(false);
    setisRecieveSpamSubmissionEnabled(false);
    setErr({
      receive_spam: undefined,
      receive_verified: undefined,
      webhook_url: undefined,
    });
  };
  return (
    <>
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[9999] flex h-full min-h-screen w-full items-center justify-center bg-fb-black/[.85] px-4 py-5">
          <div
            ref={divRef}
            className="relative max-h-full w-full max-w-[520px] overflow-y-auto rounded-xl bg-white px-8 py-12 shadow-fb-seven md:p-12"
          >
            <div>
              <div className="mx-auto mb-6 text-center">
                <h3 className="mb-2 font-heading text-2xl font-bold text-black sm:text-3xl">
                  Add webhook plugin
                </h3>
              </div>

              <div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-2.5 block font-heading text-base font-medium text-black"
                  >
                    URL to be called
                  </label>
                  <input
                    type="url"
                    name="webhookUrl"
                    id="webhookUrl"
                    placeholder="URL to be called"
                    value={webhookUrl}
                    required
                    onChange={(e) => setWebhookUrl(e.target.value)}
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
                    <h5 className="mb-2 font-heading text-base font-medium text-black">
                      Receive verified submissions
                    </h5>
                  </div>
                  <div className="flex w-full max-w-[72px] justify-end">
                    <ToggleSwitch
                      id="isRecieveVerifiedSubmissionEnabled"
                      checked={isRecieveVerifiedSubmissionEnabled}
                      onChangeCallback={(e) =>
                        handelToggoleUpdate(
                          e,
                          "isRecieveVerifiedSubmissionEnabled",
                          e.target.checked
                        )
                      }
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
                    <h5 className="mb-2 font-heading text-base font-medium text-black">
                      Receive spam submissions
                    </h5>
                  </div>
                  <div className="flex w-full max-w-[72px] justify-end">
                    <ToggleSwitch
                      id="isRecieveSpamSubmissionEnabled"
                      checked={isRecieveSpamSubmissionEnabled}
                      onChangeCallback={(e) =>
                        handelToggoleUpdate(
                          e,
                          "isRecieveSpamSubmissionEnabled",
                          e.target.checked
                        )
                      }
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

export default AddWebhookModal;
