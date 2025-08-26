import { isNil } from "lodash";
import Prism from "prismjs";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEmbeddedContentVisibility,
  getFormContentForPublishModal,
} from "../../actions/FormAction";
import Loader from "../Icons/Loader";
import CopyButton from "./CopyButton";
import useClickOutside from "../../hooks/useClickOutside";

const PublishUrlModal = (props) => {
  const dispatch = useDispatch();
  const { modalOpen, closeModal, publishModalData } = props;

  const [formAction, setFormAction] = useState("share");
  const [isPublic, setIsPublic] = useState(false);

  const embeddedCode = useSelector((state) => state.forms?.currentFormEmbedded);
  const currentForm = useSelector((state) => state.forms?.currentForm);
  const loading = useSelector((state) => state.forms?.loading);

  useEffect(() => {
    if (currentForm) {
      setIsPublic(currentForm?.form_embedded_code_Visibility);
    }
  }, [currentForm]);

  useEffect(() => {
    if (!isNil(publishModalData)) {
      dispatch(getFormContentForPublishModal(publishModalData?.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishModalData]);

  const handelChangeVisiblity = (visibility) => {
    if (currentForm) {
      dispatch(
        changeEmbeddedContentVisibility({
          id: currentForm?.id,
          visibility: visibility,
        })
      );
    }
  };

  useEffect(() => {
    if (formAction === "code") {
      Prism.highlightAll();
    }
  }, [embeddedCode, formAction]);

  // click outside delete popup
  const divRef = useRef(null);
  useClickOutside(divRef, () => closeModal());

  return (
    <>
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[9999] flex h-full min-h-screen w-full items-center justify-center bg-fb-black/[.85] px-4 py-5">
          <div
            ref={divRef}
            className="relative max-h-full w-full max-w-[745px] overflow-y-auto rounded-3xl bg-white px-8 py-10 shadow-fb-seven md:p-10"
          >
            {loading ? (
              <Loader show />
            ) : (
              <div>
                <div className="flex items-center space-x-3 rounded-[10px] bg-fb-gray p-2.5">
                  <button
                    className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium ${
                      formAction === "share"
                        ? "bg-black text-white shadow-none"
                        : "bg-white text-body-color shadow-fb-one"
                    }`}
                    onClick={() => setFormAction("share")}
                  >
                    {" "}
                    <span className="pr-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.5029 4.44477C11.5029 2.91065 12.7522 1.66699 14.2933 1.66699C15.8344 1.66699 17.0837 2.91065 17.0837 4.44477C17.0837 5.9789 15.8344 7.22255 14.2933 7.22255C13.5151 7.22255 12.8118 6.90529 12.3062 6.39489L8.44338 9.02495C8.4791 9.2024 8.4978 9.3857 8.4978 9.57298C8.4978 9.94383 8.42452 10.2983 8.29165 10.6223L12.5273 13.4052C13.008 13.0137 13.6231 12.7781 14.2933 12.7781C15.8344 12.7781 17.0837 14.0218 17.0837 15.5559C17.0837 17.09 15.8344 18.3337 14.2933 18.3337C12.7522 18.3337 11.5029 17.09 11.5029 15.5559C11.5029 15.1541 11.5889 14.7716 11.7434 14.4263L7.54205 11.6659C7.05196 12.0919 6.40999 12.3508 5.7074 12.3508C4.1663 12.3508 2.91699 11.1071 2.91699 9.57298C2.91699 8.03885 4.1663 6.7952 5.7074 6.7952C6.59358 6.7952 7.38243 7.20637 7.8932 7.84631L11.6369 5.29735C11.5498 5.02832 11.5029 4.74166 11.5029 4.44477Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    Share Form
                  </button>
                  <button
                    className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium ${
                      formAction === "code"
                        ? "bg-black text-white shadow-none"
                        : "bg-white text-body-color shadow-fb-one"
                    }`}
                    onClick={() => setFormAction("code")}
                  >
                    <span className="pr-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.88738 2.88738C1.66699 4.10777 1.66699 6.07195 1.66699 10.0003C1.66699 13.9287 1.66699 15.8929 2.88738 17.1133C4.10777 18.3337 6.07195 18.3337 10.0003 18.3337C13.9287 18.3337 15.8929 18.3337 17.1133 17.1133C18.3337 15.8929 18.3337 13.9287 18.3337 10.0003C18.3337 6.07195 18.3337 4.10777 17.1133 2.88738C15.8929 1.66699 13.9287 1.66699 10.0003 1.66699C6.07195 1.66699 4.10777 1.66699 2.88738 2.88738ZM11.2404 5.37192C11.5738 5.46125 11.7717 5.80396 11.6823 6.13738L9.52549 14.1868C9.43615 14.5202 9.09344 14.718 8.76003 14.6287C8.42661 14.5394 8.22875 14.1967 8.31808 13.8632L10.4749 5.81386C10.5642 5.48044 10.907 5.28258 11.2404 5.37192ZM12.4751 7.05839C12.7191 6.81431 13.1149 6.81431 13.3589 7.05839L13.5326 7.232C14.062 7.76141 14.5035 8.20289 14.8069 8.60049C15.1271 9.02015 15.3516 9.46355 15.3516 10.0003C15.3516 10.5371 15.1271 10.9805 14.8069 11.4002C14.5035 11.7978 14.062 12.2392 13.5326 12.7686L13.3589 12.9423C13.1149 13.1863 12.7191 13.1863 12.4751 12.9423C12.231 12.6982 12.231 12.3025 12.4751 12.0584L12.618 11.9154C13.1861 11.3474 13.5667 10.9648 13.8131 10.6419C14.0484 10.3335 14.1016 10.1539 14.1016 10.0003C14.1016 9.84675 14.0484 9.66719 13.8131 9.35871C13.5667 9.03581 13.1861 8.6533 12.618 8.08525L12.4751 7.94227C12.231 7.69819 12.231 7.30246 12.4751 7.05839ZM6.64187 7.05839C6.88595 6.81431 7.28168 6.81431 7.52576 7.05839C7.76983 7.30246 7.76983 7.69819 7.52576 7.94227L7.38278 8.08525C6.81473 8.6533 6.43409 9.03581 6.18773 9.35871C5.95237 9.66719 5.89917 9.84675 5.89917 10.0003C5.89917 10.1539 5.95237 10.3335 6.18773 10.6419C6.43409 10.9648 6.81473 11.3474 7.38278 11.9154L7.52576 12.0584C7.76983 12.3025 7.76983 12.6982 7.52576 12.9423C7.28168 13.1863 6.88595 13.1863 6.64187 12.9423L6.46825 12.7687C5.9388 12.2392 5.49731 11.7978 5.19395 11.4002C4.87375 10.9805 4.64917 10.5371 4.64917 10.0003C4.64917 9.46355 4.87375 9.02015 5.19395 8.60049C5.49731 8.20289 5.9388 7.76142 6.46825 7.232L6.64187 7.05839Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>{" "}
                    Embed Code
                  </button>
                </div>
                {formAction === "code" ? (
                  <div className="pt-9">
                    <h3 className="mb-1.5 text-2xl font-bold text-black">
                      HTML Code
                    </h3>
                    <p className="text-sm font-normal text-body-color">
                      Copy and paste this onto your website to embed it.
                    </p>

                    <div className="relative rounded-[10px]">
                      <pre className="language-html max-h-[400px] rounded-[10px]">
                        <code className="language-html">{embeddedCode}</code>
                      </pre>
                      <div className="absolute right-4.5 top-4.5 z-10">
                        <CopyButton code={embeddedCode} />
                      </div>
                    </div>
                  </div>
                ) : null}

                {formAction === "share" ? (
                  <>
                    <div className="pt-9">
                      <div className="items-center justify-between pb-8 sm:flex">
                        <div>
                          <h3 className="mb-1.5 text-2xl font-bold text-black">
                            Share your form
                          </h3>
                          <p className="text-sm font-normal text-body-color">
                            Share the form link to gather responses.
                          </p>
                        </div>
                        <div>
                          <button
                            onClick={() => handelChangeVisiblity(!isPublic)}
                            className="flex items-center text-sm font-normal text-black"
                          >
                            Make it public to share
                            <div
                              className={`slider relative ml-3 h-7 w-[50px] rounded-3xl duration-300 ${
                                isPublic ? "bg-primary" : "bg-[#D9D9D9]"
                              }`}
                            >
                              <span
                                className={`dot absolute left-[3px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white duration-300 ${
                                  isPublic && "translate-x-[23px]"
                                }`}
                              ></span>
                            </div>
                          </button>
                        </div>
                      </div>
                      {isPublic && (
                        <div className="border-t border-fb-stroke pb-8 pt-6">
                          <div className="mb-5">
                            <div className="relative">
                              <input
                                type="text"
                                value={currentForm?.form_embedded_code_link}
                                readOnly
                                placeholder="https://formbold.com/f/63353a64ebdd950001ff4cb9"
                                className="w-full rounded-[10px] border border-fb-stroke bg-fb-gray py-4 pl-5 pr-[120px] text-black outline-none"
                              />

                              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                <CopyButton
                                  code={currentForm?.form_embedded_code_link}
                                />
                              </div>
                            </div>
                          </div>

                      {/* <div className="flex items-center">
                        <p className="mr-4 text-base text-body-color">
                          Share via
                        </p>

                        <div className="flex items-center">
                          <a className="mr-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-fb-stroke text-body-color text-opacity-60 hover:text-opacity-100">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1990_9710)">
                                <path
                                  d="M12.8307 12.3737H15.1224L16.0391 8.70703H12.8307V6.8737C12.8307 5.92953 12.8307 5.04036 14.6641 5.04036H16.0391V1.96036C15.7402 1.92095 14.6118 1.83203 13.4201 1.83203C10.9314 1.83203 9.16406 3.35095 9.16406 6.14036V8.70703H6.41406V12.3737H9.16406V20.1654H12.8307V12.3737Z"
                                  fill="currentColor"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1990_9710">
                                  <rect width="22" height="22" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                          <a className="mr-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-fb-stroke text-body-color text-opacity-60 hover:text-opacity-100">
                            <svg
                              width="23"
                              height="22"
                              viewBox="0 0 23 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                opacity="0.6"
                                clipPath="url(#clip0_1990_9713)"
                              >
                                <path
                                  d="M7.15885 4.58425C7.15861 5.07048 6.96522 5.5367 6.62124 5.88034C6.27725 6.22399 5.81083 6.41691 5.3246 6.41667C4.83837 6.41642 4.37216 6.22304 4.02851 5.87905C3.68487 5.53506 3.49194 5.06865 3.49219 4.58242C3.49243 4.09619 3.68582 3.62997 4.02981 3.28632C4.3738 2.94268 4.84021 2.74976 5.32644 2.75C5.81267 2.75024 6.27889 2.94363 6.62253 3.28762C6.96618 3.63161 7.1591 4.09802 7.15885 4.58425ZM7.21385 7.77425H3.54719V19.2509H7.21385V7.77425ZM13.0072 7.77425H9.35885V19.2509H12.9705V13.2284C12.9705 9.87342 17.343 9.56175 17.343 13.2284V19.2509H20.9639V11.9818C20.9639 6.32592 14.4922 6.53675 12.9705 9.31425L13.0072 7.77425Z"
                                  fill="currentColor"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1990_9713">
                                  <rect
                                    width="22"
                                    height="22"
                                    fill="white"
                                    transform="translate(0.796875)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                          <a className="mr-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-fb-stroke text-body-color text-opacity-60 hover:text-opacity-100">
                            <svg
                              width="23"
                              height="22"
                              viewBox="0 0 23 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                opacity="0.6"
                                clipPath="url(#clip0_1990_9716)"
                              >
                                <path
                                  d="M20.8797 5.18631C20.1799 5.49586 19.4378 5.69916 18.6779 5.78948C19.4788 5.31046 20.0783 4.55657 20.3646 3.66831C19.6129 4.11564 18.7888 4.42914 17.9299 4.59872C17.353 3.98142 16.5882 3.57202 15.7546 3.43418C14.921 3.29633 14.0652 3.43776 13.3202 3.83647C12.5753 4.23519 11.9829 4.86885 11.6353 5.63895C11.2876 6.40905 11.2041 7.27244 11.3977 8.09489C9.87341 8.01849 8.3822 7.62237 7.02091 6.93225C5.65962 6.24213 4.45868 5.27344 3.49606 4.08906C3.15533 4.6743 2.97627 5.3396 2.97723 6.01681C2.97723 7.34597 3.65373 8.52023 4.68223 9.20773C4.07357 9.18856 3.47831 9.02419 2.94606 8.72831V8.77597C2.94625 9.6612 3.25257 10.5191 3.81309 11.2043C4.37361 11.8894 5.15384 12.3597 6.02148 12.5352C5.45646 12.6883 4.86401 12.7109 4.28898 12.6012C4.53361 13.3632 5.0104 14.0296 5.6526 14.5071C6.29481 14.9846 7.07026 15.2493 7.8704 15.2641C7.07517 15.8887 6.16464 16.3504 5.19087 16.6228C4.2171 16.8952 3.19918 16.973 2.19531 16.8518C3.9477 17.9788 5.98765 18.5771 8.07115 18.5751C15.1231 18.5751 18.9795 12.7332 18.9795 7.66681C18.9795 7.50181 18.9749 7.33498 18.9676 7.17181C19.7182 6.6293 20.366 5.95724 20.8806 5.18723L20.8797 5.18631Z"
                                  fill="currentColor"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1990_9716">
                                  <rect
                                    width="22"
                                    height="22"
                                    fill="white"
                                    transform="translate(0.5625)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                          <a className="mr-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-fb-stroke text-body-color text-opacity-60 hover:text-opacity-100">
                            <svg
                              width="23"
                              height="22"
                              viewBox="0 0 23 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                opacity="0.6"
                                clipPath="url(#clip0_1990_9719)"
                              >
                                <path
                                  d="M3.1276 2.75H19.6276C19.8707 2.75 20.1039 2.84658 20.2758 3.01849C20.4477 3.19039 20.5443 3.42355 20.5443 3.66667V18.3333C20.5443 18.5764 20.4477 18.8096 20.2758 18.9815C20.1039 19.1534 19.8707 19.25 19.6276 19.25H3.1276C2.88449 19.25 2.65133 19.1534 2.47942 18.9815C2.30751 18.8096 2.21094 18.5764 2.21094 18.3333V3.66667C2.21094 3.42355 2.30751 3.19039 2.47942 3.01849C2.65133 2.84658 2.88449 2.75 3.1276 2.75ZM18.7109 6.63483L11.4436 13.1432L4.04427 6.61467V17.4167H18.7109V6.63483ZM4.51269 4.58333L11.4335 10.6902L18.2544 4.58333H4.51269Z"
                                  fill="currentColor"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1990_9719">
                                  <rect
                                    width="22"
                                    height="22"
                                    fill="white"
                                    transform="translate(0.375)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </div>
                      </div> */}
                        </div>
                      )}
                    </div>
                  </>
                ) : null}

                <div className="absolute right-2.5 top-2.5">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-body-color duration-300 hover:bg-fb-gray"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.3111 13.0003L19.2294 8.08197C19.5869 7.72447 19.5869 7.12864 19.2294 6.77114C19.0545 6.59925 18.8192 6.50293 18.574 6.50293C18.3288 6.50293 18.0934 6.59925 17.9186 6.77114L13.0002 11.6895L8.08189 6.77114C7.90704 6.59925 7.67166 6.50293 7.42647 6.50293C7.18128 6.50293 6.9459 6.59925 6.77105 6.77114C6.41355 7.12864 6.41355 7.72447 6.77105 8.08197L11.6894 13.0003L6.77105 17.9186C6.41355 18.2761 6.41355 18.872 6.77105 19.2295C7.12855 19.587 7.72439 19.587 8.08189 19.2295L13.0002 14.3111L17.9186 19.2295C18.2761 19.587 18.8719 19.587 19.2294 19.2295C19.5869 18.872 19.5869 18.2761 19.2294 17.9186L14.3111 13.0003Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PublishUrlModal;
