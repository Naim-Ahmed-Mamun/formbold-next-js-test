import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty } from "lodash";
import { deletePlugins, updatePlugin } from "../../actions/FomPlugins";
import ButtonWithText from "../Buttons/ButtonWithText";
import ModalCloseIcon from "../Icons/ModalCloseIcon";
import AutoResponderConfigurationFields from "./FieldGroups/AutoResponderConfigurationFields";
import GoogleSheetConfigurationFields from "./FieldGroups/GoogleSheetConfigurationFields";
import NotionConfigurationFields from "./FieldGroups/NotionConfigurationFields";
import WebhookConfigurationFields from "./FieldGroups/WebhookConfigurationFields";
import useClickOutside from "../../hooks/useClickOutside";

const hasUpdateButton = ["auto-response", "webhook", "notion"];

const PluginEditModal = (props) => {
  const dispatch = useDispatch();
  const { modalOpen, setModalOpen, plugin } = props;
  // click outside delete popup
  const divRef = useRef(null);

  const currentForm = useSelector((state) => state.forms?.currentForm);
  const formPlugins = useSelector((state) => state.formPlugins);

  const [err, setErr] = useState({});
  const [payload, setPayload] = useState({});

  const getModalTitle = () =>
    plugin.configuration_type === "auto-response"
      ? "Auto Responder Settings"
      : props.plugin.title + " Settings";

  const handelClose = () => {
    setErr({});
    setModalOpen(false);
    setPayload({});
  };

  useEffect(() => {
    if (!isEmpty(plugin)) {
      setPayload({ ...plugin.configuration });
    }
  }, [plugin]);

  useEffect(() => {
    if (formPlugins?.requestSucess) {
      handelClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formPlugins?.requestSucess]);

  // click outside delete popup
  useClickOutside(divRef, () => setModalOpen(false));

  const handleSubmit = (e) => {
    e.preventDefault();
    const pluginPayload = {
      ...payload,
      formId: currentForm?.id,
      pluginId: plugin?.route_key,
    };
    currentForm && dispatch(updatePlugin(pluginPayload));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this plugin?")) {
      const pluginPayload = {
        ...payload,
        formId: currentForm?.id,
        pluginId: plugin?.route_key,
      };
      currentForm && dispatch(deletePlugins(pluginPayload));
    }
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[999] flex h-full min-h-screen w-full items-center justify-center bg-fb-black/[85%] px-4 py-5">
          <div
            ref={divRef}
            className={`relative max-h-full w-full shadow-fb-seven ${
              plugin.configuration_type === "auto-response"
                ? "max-w-[850px]"
                : "max-w-[520px]"
            } overflow-y-auto rounded-[20px] bg-white px-8 py-12 md:p-12`}
          >
            <div>
              <div className="mx-auto mb-6 text-center">
                <h3 className="mb-2 font-heading text-2xl font-black text-black sm:text-3xl">
                  {getModalTitle()}
                </h3>
              </div>

              <div>
                {plugin.configuration_type === "webhook" && (
                  <WebhookConfigurationFields
                    payload={payload}
                    setPayload={setPayload}
                    pluginErr={err}
                  />
                )}
                {plugin.configuration_type === "auto-response" && (
                  <AutoResponderConfigurationFields
                    payload={payload}
                    setPayload={setPayload}
                    pluginErr={err}
                  />
                )}
                {plugin.configuration_type === "notion" && (
                  <NotionConfigurationFields
                    payload={payload}
                    setPayload={setPayload}
                    pluginErr={err}
                    pluginId={plugin?.route_key}
                  />
                )}
                {plugin.configuration_type === "google-sheet" && (
                  <GoogleSheetConfigurationFields
                    payload={payload}
                    setPayload={setPayload}
                    pluginErr={err}
                  />
                )}
              </div>
              <div className="flex items-center justify-between">
                {hasUpdateButton.includes(plugin.configuration_type) && (
                  <ButtonWithText
                    text="Update"
                    loading={formPlugins?.loader}
                    className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-5 py-3 text-center font-heading text-base font-medium text-white hover:bg-fb-primary-hover hover:text-white"
                    onClickCallback={(e) => handleSubmit(e)}
                  />
                )}

                <ButtonWithText
                  text="Delete"
                  loading={formPlugins?.loader}
                  className="btn inline-flex cursor-pointer items-center justify-center rounded-lg bg-fb-red-dark px-5 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-fb-red-dark/90 hover:text-white"
                  onClickCallback={(e) => handleDelete(e)}
                />

                {/* <Link
                as="button"
                :href="route('plugins.destroy', plugin.route_key)"
                method="delete"
                :onBefore="() => confirmDeletion()"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-red-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-red-500 via-red-500 to-red-600"
            >
                <TrashIcon className="w-5 h-5 mr-2"/>
                <span className="relative"> Delete </span>
            </Link> */}
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

export default PluginEditModal;
