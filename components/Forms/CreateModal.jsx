import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { find, isEmpty, isNil } from "lodash";
import {
  createForm,
  resetCreateOrUpdateReuestSuccess,
} from "../../actions/FormAction";
import ButtonWithText from "../../components/Buttons/ButtonWithText";
import { validateFormCreate } from "../../services/forms";

import { useRouter } from 'next/navigation';
import * as icons from "../../lib/builder/icons";
import useClickOutside from "../../hooks/useClickOutside";

const CreateModal = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { show, closeModal, emptyForm } = props;

  const signInData = useSelector((state) => state.auth?.signIn);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const forms = useSelector((state) => state.forms);
  const form = forms?.createOrUpdateForm;
  const currentForm = useSelector((state) => state.forms?.currentForm);

  const [formName, setFormName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState({
    email: [],
    name: [],
  });

  useEffect(() => {
    if (form.requestSucess && forms.currentForm) {
      dispatch(resetCreateOrUpdateReuestSuccess());
      closeModal();
      router.push("/account/forms");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.requestSucess, forms.currentForm]);

  useEffect(() => {
    if (signInData) {
      let email = "";
      if (currentForm && isNil(emptyForm)) {
        email = find(signInData?.userInfo?.email_addresses, {
          id: currentForm?.email_address_id,
        });
        setFormName(currentForm?.name);
      } else {
        email = find(signInData?.userInfo?.email_addresses, {
          email: signInData?.userInfo?.email,
        });
      }
      !isNil(email) && !isEmpty(email) && setEmail(email.id);
    }
  }, [signInData, currentForm, emptyForm]);

  const checkIfLoggedIn = async () => {
    if (!signInData) {
      dispatch({ type: "SHOW_SIGN_IN_MODAL" });
      return false;
    }
    return true;
  };

  const handelFormCreate = async (e) => {
    e.preventDefault();
    if (checkIfLoggedIn()) {
      const payload = { name: formName, email: email };
      const errors = validateFormCreate({
        payload: payload,
        setError: setErr,
      });
      if (isEmpty(errors)) {
        dispatch(createForm(payload));
      }
    }
  };

  const handelEmailOnChange = (e) => {
    e.preventDefault();
    const emailId = e.target.value;
    !isNil(email) && !isEmpty(email) && setEmail(emailId);
  };

  // handle ClickOutside
  const ref = useRef(null);
  useClickOutside(ref, () => closeModal());


  return (
    show && (
      <>
        <div className="fixed left-0 top-0 z-[999] flex h-full min-h-screen w-full items-center justify-center bg-[rgba(34,33,45,.85)] px-4 py-5">
          <div
            ref={ref}
            className="relative max-h-full w-full max-w-[710px] overflow-y-auto rounded-[20px] bg-white px-8 py-12 shadow-fb-seven md:p-12"
          >
            <div className="absolute right-5 top-5">
              <button
                onClick={closeModal}
                type="button"
                className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-body-color duration-300 hover:bg-fb-gray"
              >
                {icons.Cross}
              </button>
            </div>
            <div className="mx-auto w-full max-w-[570px]">
              <h3 className="mb-6 font-heading text-2xl font-bold text-black sm:text-[28px]">
                Form Settings
              </h3>

              <div>
                <div className="mb-5">
                  <label className="mb-2.5 block text-base font-medium text-black">
                    Form Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your form name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="flex h-[52px] w-full items-center rounded-full border border-fb-gray-4 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
                  />
                  {err &&
                    err.name &&
                    err.name.map((err, index) => (
                      <p key={index} style={{ color: "red" }}>
                        {err}
                      </p>
                    ))}
                </div>

                <div className="mb-5">
                  <label className="mb-2.5 block text-base font-medium text-black">
                    Send emails to:
                  </label>
                  <div className="relative">
                    <select
                      onChange={handelEmailOnChange}
                      value={email}
                      className="flex h-[52px] w-full appearance-none items-center rounded-full border border-fb-gray-4 bg-white pl-6 pr-8 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
                    >
                      {signInData?.userInfo?.email_addresses.map(
                        (email, index) => (
                          <option key={index} value={email.id}>
                            {email.email}
                          </option>
                        )
                      )}
                    </select>
                    <span className="absolute right-5 top-1/2 -translate-y-1/2">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.0275 9.29688L13 14.2694L17.9725 9.29688L19.5 10.8352L13 17.3352L6.5 10.8352L8.0275 9.29688Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <p className="mb-6 text-sm leading-[24px] text-body-color">
                  Note: To send to a new email address, please first add it to
                  Linked Emails on the account page.
                </p>

                <ButtonWithText
                  text="Create Form"
                  loading={form.loading}
                  loaderColor={"white"}
                  className="h-[52px] w-full rounded-full bg-primary px-4 text-base font-medium text-white duration-300 hover:bg-fb-primary-hover"
                  onClickCallback={handelFormCreate}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default CreateModal;
