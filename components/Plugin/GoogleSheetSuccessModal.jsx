import React, { useRef } from "react";
import { toast } from "react-toastify";
import ModalCloseIcon from "../Icons/ModalCloseIcon";
import useClickOutside from "../../hooks/useClickOutside";

const GoogleSheetSuccessModal = (props) => {
  const { modalOpen, setModalOpen, url } = props;

  const handelClose = () => {
    setModalOpen(false);
  };

  const copy = () =>
    window.navigator.clipboard.writeText(url).then(
      function () {
        toast.success("Sheet URL Copied! 🥳");
      },
      function () {
        toast.error("There was a problem copying the endpoint. 😞");
      }
    );

  const goToURL = () => window.open(url, "_blank");

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
                <h1 className="mb-4 font-heading text-2xl font-bold text-black lg:mb-8">
                  Google Sheet Settings
                </h1>
              </div>

              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="name"
                      className="mb-2.5 block font-heading text-base font-medium text-black"
                    >
                      Sheet URL:
                    </label>
                    <span className="mb-5 text-[12px] text-body-color">
                      Note: Do not change Spreadsheet Tab name.
                    </span>
                  </div>
                  <input
                    type="text"
                    value={url}
                    readOnly
                    id="name"
                    name="name"
                    placeholder="Speardsheet URL"
                    className="placeholder-light w-full rounded-lg border border-stroke px-4 py-[18px] text-base font-medium text-body-color outline-none focus-within:shadow-none focus:border-primary focus:shadow-input"
                  />
                </div>
                <div className="item-center mb-6 flex justify-between">
                  <button
                    className="mr-4 inline-flex items-center justify-center rounded-lg bg-black px-5 py-4 font-heading text-base font-medium text-white duration-300 hover:bg-black/90"
                    onClick={copy}
                  >
                    COPY
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-4 font-heading text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
                    onClick={goToURL}
                  >
                    GO
                  </button>
                </div>
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

export default GoogleSheetSuccessModal;
