import { isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAutoResponderPlugin,
  resetFormPluginSuccess,
} from "../../actions/FomPlugins";
import ModalCloseIcon from "../Icons/ModalCloseIcon";
import AutoResponderConfigurationFields from "./FieldGroups/AutoResponderConfigurationFields";
import useClickOutside from "../../hooks/useClickOutside";

const AddAutoResponderModal = (props) => {
  const dispatch = useDispatch();
  const { modalOpen, setModalOpen } = props;

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const currentForm = useSelector((state) => state.forms?.currentForm);
  const formPlugins = useSelector((state) => state.formPlugins);

  // click outside delete popup
  const divRef = useRef(null);
  useClickOutside(divRef, () => setModalOpen(false));

  const [payload, setPayload] = useState({
    from_name: "",
    email_subject: "",
    message: "",
    is_recaptcha_enable: false,
    is_spam_filter_enable: false,
  });
  const [err, setErr] = useState({});


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
      : setErr();
  }, [formPlugins?.validationError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payloadData = {
      ...payload,
      formId: currentForm?.id,
    };
    currentForm && dispatch(addAutoResponderPlugin(payloadData));
  };

  const handelClose = () => {
    setModalOpen(false);
  };

  const resetAllFields = () => {
    setPayload({
      from_name: "",
      email_subject: "",
      message: "",
      is_recaptcha_enable: false,
      is_spam_filter_enable: false,
    });
    setErr({});
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[9999] flex h-full min-h-screen w-full items-center justify-center bg-fb-black/[.85] px-4 py-5">
          <div
            ref={divRef}
            className="relative max-h-full w-full max-w-[850px] overflow-y-auto rounded-xl bg-white px-8 py-12 shadow-fb-seven md:p-12"
          >
            <div>
              <div className="mx-auto mb-6 text-center">
                <h3 className="mb-4 font-heading text-2xl font-bold text-black lg:mb-8">
                  Auto Responder Settings
                </h3>
                <p className="mb-4 text-base text-body-color lg:mb-8">
                  <span className="font-bold">Auto Responder</span> allows you to
                  send an email response to visitor who submit this form.
                  <a
                    href="javascript:void(0)"
                    className="inline-flex items-center text-primary"
                  >
                    Learn more →
                  </a>
                </p>
              </div>

              <AutoResponderConfigurationFields
                payload={payload}
                setPayload={setPayload}
                pluginErr={err}
                modalOpen={modalOpen}
              />
              <button
                onClick={(e) => handleSubmit(e)}
                className="inline-flex h-[50px] cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-center font-heading text-base font-medium text-white shadow-sm duration-300 hover:bg-fb-primary-hover hover:text-white"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                <span className="relative">Connect</span>
              </button>
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

export default AddAutoResponderModal;
