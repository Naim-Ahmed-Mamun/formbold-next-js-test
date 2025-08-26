import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addTelegramPlugin,
  getFormPluginsData,
  resetFormPluginSuccess,
} from "../../actions/FomPlugins";
import config from "../../services/config";
import ModalCloseIcon from "../Icons/ModalCloseIcon";
import TelegramLogin from "./TelegramLogin";
import useClickOutside from "../../hooks/useClickOutside";

const AddTelegramPluginModal = (props) => {
  const dispatch = useDispatch();
  const { modalOpen, setModalOpen } = props;

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const currentForm = useSelector((state) => state.forms?.currentForm);
  const formPlugins = useSelector((state) => state.formPlugins);
  const loading = formPlugins?.loading;
  const requestSuccess = formPlugins?.requestSucess;

  const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/forms/${currentForm?.id}/plugins/telegram/callback`;

  const handelClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!loading && requestSuccess) {
      dispatch(resetFormPluginSuccess());
      handelClose();
      currentForm && dispatch(getFormPluginsData(currentForm?.id));
      // window.location.reload();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestSuccess, loading]);

  const handleTelegramResponse = (response) => {
    console.log(response,'response in telegram');
    try {
      const payload = {
        formId: currentForm?.id,
        userInfo: response,
      };
      dispatch(addTelegramPlugin(payload));
    } catch (error) {
      toast.error("Could'nt add Telegram plugin");
    }
  };

  // ===== click outside of dropdown =====
  const divRef = useRef(null);
  useClickOutside(divRef, () => setModalOpen(false));


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
                <h3 className="mb-4 font-heading text-2xl font-medium text-black lg:mb-8">
                  Add telegram plugin
                </h3>
              </div>
              {loading && (
                <span className="py-2 text-xl font-semibold text-black">
                  please wait...
                </span>
              )}
              <div>
                <TelegramLogin botName={config?.telegramBotName} onAuth={handleTelegramResponse} />
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

export default AddTelegramPluginModal;
