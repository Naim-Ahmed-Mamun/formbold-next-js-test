import { isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFormPluginSuccess,
  addZendeskPlugins,
} from "../../actions/FomPlugins";
import ButtonWithText from "../Buttons/ButtonWithText";
import ModalCloseIcon from "../Icons/ModalCloseIcon";
import useClickOutside from "../../hooks/useClickOutside";

const AddZendeskModal = (props) => {
  const dispatch = useDispatch();
  const { modalOpen, setModalOpen } = props;

  const currentForm = useSelector((state) => state.forms?.currentForm);
  const formPlugins = useSelector((state) => state.formPlugins);
  const [formState, setFormState] = useState({
    subdomain: "",
    email: "",
    token: "",
  });

  const [err, setErr] = useState({
    subdomain: undefined,
    email: undefined,
    token: undefined,
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
          subdomain: undefined,
          email: undefined,
          token: undefined,
        });
  }, [formPlugins?.validationError]);

  //   check if the webhook url is valid
  const isValidEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(formState?.subdomain)) {
      setErr({
        subdomain: "Subdomain is required",
      });
      return;
    }
    if (isEmpty(formState?.email) || !isValidEmail(formState?.email)) {
      setErr({
        email: "Email is required and must be a valid email",
      });
      return;
    }
    if (isEmpty(formState?.token)) {
      setErr({
        token: "Api Token is required",
      });
      return;
    }
    const payload = {
      formId: currentForm?.id,
      subdomain: formState?.subdomain,
      email: formState?.email,
      api_token: formState?.token,
    };
    currentForm && dispatch(addZendeskPlugins(payload));
  };

  const handelClose = () => {
    setModalOpen(false);
  };
  const resetAllFields = () => {
    setFormState({
      subdomain: "",
      email: "",
      token: "",
    });
    setErr({
      subdomain: undefined,
      email: undefined,
      token: undefined,
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
                  Add Zendesk Plugin
                </h3>
              </div>

              <div>
                {/* subdomain */}
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="font-heading mb-2.5 block text-base font-medium text-black"
                  >
                    Subdomain
                  </label>
                  <div className="flex w-full items-center overflow-hidden rounded-lg">
                    <span className="rounded-l-lg bg-gray-100 px-4 py-3 text-black">
                      https://
                    </span>
                    <input
                      type="text"
                      name="subdomain"
                      id="subdomain"
                      placeholder="my_zendesk_subdomain"
                      value={formState?.subdomain}
                      required
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          subdomain: e.target.value,
                        })
                      }
                      className="focus:shadow-input w-full px-4 py-3 text-base font-medium text-black outline-none border-t border-b border-gray-100" 
                    />
                    <span className="rounded-r-lg bg-gray-100 px-4 py-3 text-black">
                      .zendesk.com
                    </span>
                  </div>
                  {err?.subdomain &&
                    (Array.isArray(err.subdomain) ? (
                      err.subdomain.map((error, index) => (
                        <p key={index} style={{ color: "red" }}>
                          {error}
                        </p>
                      ))
                    ) : (
                      <p style={{ color: "red" }}>{err.subdomain}</p>
                    ))}
                </div>
                {/* email */}
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="font-heading mb-2.5 block text-base font-medium text-black"
                  >
                    Zendesk Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formState?.email}
                    required
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        email: e.target.value,
                      })
                    }
                    className="border-stroke placeholder-body-color focus:shadow-input w-full rounded-lg border px-6 py-4 text-base font-medium text-black outline-none transition-all"
                  />
                  {err?.email &&
                    (Array.isArray(err.email) ? (
                      err.email.map((error, index) => (
                        <p key={index} style={{ color: "red" }}>
                          {error}
                        </p>
                      ))
                    ) : (
                      <p style={{ color: "red" }}>{err.email}</p>
                    ))}
                </div>
                {/* api token */}
                <div className="mb-5">
                  <label
                    htmlFor="token"
                    className="font-heading mb-2.5 block text-base font-medium text-black"
                  >
                    API Token
                  </label>
                  <input
                    type="text"
                    name="token"
                    id="token"
                    placeholder="Token"
                    value={formState?.token}
                    required
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        token: e.target.value,
                      })
                    }
                    className="border-stroke placeholder-body-color focus:shadow-input w-full rounded-lg border px-6 py-4 text-base font-medium text-black outline-none transition-all"
                  />
                  {err?.token &&
                    (Array.isArray(err.token) ? (
                      err.token.map((error, index) => (
                        <p key={index} style={{ color: "red" }}>
                          {error}
                        </p>
                      ))
                    ) : (
                      <p style={{ color: "red" }}>{err.token}</p>
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

export default AddZendeskModal;
