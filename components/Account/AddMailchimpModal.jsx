import { isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFormPluginSuccess,
  addMailchimpPlugin,
} from "../../actions/FomPlugins";
import ButtonWithText from "../Buttons/ButtonWithText";
import ModalCloseIcon from "../Icons/ModalCloseIcon";
import useClickOutside from "../../hooks/useClickOutside";

const AddMailchimpModal = (props) => {
  const dispatch = useDispatch();
  const { modalOpen, setModalOpen } = props;

  const currentForm = useSelector((state) => state.forms?.currentForm);
  const formPlugins = useSelector((state) => state.formPlugins);

  const [apiKey, setApiKey] = useState("");

  const [err, setErr] = useState({
    api_key: undefined,
  });

  // click outside delete popup
  const divRef = useRef(null);
  useClickOutside(divRef, () => setModalOpen(false));

  useEffect(() => {
    if (!modalOpen) {
      resetAllFields();
    }
  }, [modalOpen]);

  // check only last -us4
  const isValidApiKey = (apiKey) => {
    const apiKeyRegex = /^[a-zA-Z0-9]{20,40}-us4$/;
    return apiKeyRegex.test(apiKey);
  };

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
          api_key: undefined,
        });
  }, [formPlugins?.validationError]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(apiKey)) {
      setErr({
        api_key: "API key is required and must be a valid API key",
      });
      return;
    }
    // if (!isValidApiKey(apiKey)) {
    //   setErr({
    //     api_key: "API key is invalid. It must be a valid API key",
    //   });
    //   return;
    // }
    const payload = {
      formId: currentForm?.id,
      api_key: apiKey,
    };
    currentForm && dispatch(addMailchimpPlugin(payload));
  };

  const handelClose = () => {
    setModalOpen(false);
  };
  const resetAllFields = () => {
    setApiKey("");
    setErr({
      api_key: undefined,
    });
  };
  return (
    <>
      {modalOpen && (
        <div className="bg-fb-black/[.85] fixed left-0 top-0 z-[9999] flex h-full min-h-screen w-full items-center justify-center px-4 py-5">
          <div
            ref={divRef}
            className="shadow-fb-seven relative max-h-full w-full max-w-[700px] overflow-y-auto rounded-xl bg-white px-8 py-12 md:p-12"
          >
            <div>
              <div className="mx-auto mb-6 text-center">
                <h3 className="font-heading mb-2 text-2xl font-bold text-black sm:text-3xl">
                  Add Mailchimp plugin
                </h3>
              </div>

              <div>
                <div className="mb-5">
                  <label
                    htmlFor="apiKey"
                    className="font-heading mb-2.5 block text-base font-medium text-black"
                  >
                    Add API Key
                  </label>
                  <input
                    type="text"
                    name="apiKey"
                    id="apiKey"
                    placeholder="cbf9****************************-us"
                    value={apiKey}
                    required
                    onChange={(e) => setApiKey(e.target.value)}
                    className="border-stroke placeholder-body-color focus:shadow-input w-full rounded-lg border px-6 py-4 text-base font-medium text-black outline-none transition-all"
                  />
                  {err?.api_key &&
                    (Array.isArray(err.api_key) ? (
                      err.api_key.map((error, index) => (
                        <p key={index} style={{ color: "red" }}>
                          {error}
                        </p>
                      ))
                    ) : (
                      <p style={{ color: "red" }}>{err.api_key}</p>
                    ))}
                </div>
                <ButtonWithText
                  text="Add Plugin"
                  loading={formPlugins?.loader}
                  className="bg-primary font-heading hover:bg-fb-primary-hover inline-flex h-[50px] items-center justify-center rounded-lg px-5 text-base font-medium text-white duration-300"
                  onClickCallback={(e) => handleSubmit(e)}
                />
              </div>
              <div className="absolute right-5 top-5">
                <button
                  onClick={handelClose}
                  type="button"
                  className="h-7.5 w-7.5 text-body-color hover:bg-fb-gray flex items-center justify-center rounded-full duration-300"
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

export default AddMailchimpModal;
