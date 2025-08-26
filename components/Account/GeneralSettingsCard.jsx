import { has, isEmpty, omit } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../actions/FormAction";
import ToggleSwitch from "./ToggleSwitch";

const GeneralSettingsCard = () => {
  const dispatch = useDispatch();

  const [formName, setFormName] = useState("");
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  const [isFormSubmissionArchived, setIsFormSubmissionArchived] = useState(false);

  const currentForm = useSelector((state) => state.forms?.currentForm);
  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const pageLoading = useSelector((state) => state.forms?.pageLoading);

  useEffect(() => {
    !isEmpty(currentForm) && handelSetFormData(currentForm);
  }, [currentForm]);

  const handelSetFormData = (form) => {
    setFormName(has(form, "name") ? form.name : "");
    setIsFormSubmissionArchived(has(form, "is_submissions_store_enabled") ? form.is_submissions_store_enabled : false);
    setIsFormEnabled(has(form, "is_active") ? form.is_active : false);
  };

  const handelUpdateForm = (e) => {
    e.preventDefault();
    let payload = {
      ...currentForm,
      name: formName,
      is_active: isFormEnabled,
      is_submissions_store_enabled: isFormSubmissionArchived,
    };
    payload = omit(payload, "recaptcha_private_key");
    dispatch(updateForm(payload));
  };

  const handelToggoleUpdate = (e, id, value) => {
    let payload = {
      ...currentForm,
    };
    if (id === "enabled") {
      setIsFormEnabled(value);
      payload = { ...payload, is_active: value };
    }
    if (id === "archive") {
      setIsFormSubmissionArchived(value);
      payload = { ...payload, is_submissions_store_enabled: value };
    }
    payload = omit(payload, "recaptcha_private_key");
    dispatch(updateForm(payload));
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-8 font-heading text-[22px] font-bold text-black">General Settings</h3>

      <div className="mb-6">
        <label htmlFor="" className="mb-3.5 block font-heading text-base font-medium text-black">
          Form name
        </label>
        <div className="relative mb-3">
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Form Name"
            className="flex h-[50px] w-full items-center rounded-lg border border-fb-gray-3 bg-fb-gray px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
          />

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-transparent bg-white px-3.5 py-1.5 text-sm font-medium text-black shadow-fb-one duration-300 hover:border-primary hover:text-primary"
            onClick={(e) => handelUpdateForm(e)}
          >
            Update
          </button>
        </div>
        <p className="text-sm font-normal text-body-color">The form name won&apos;t be shown to your visitors.</p>
      </div>

      <div className="mb-6 flex justify-between">
        <div>
          <h5 className="mb-2 text-base font-medium text-black">Form Enabled</h5>
          <p className="text-sm font-normal text-body-color">Choose whether to allow new submissions</p>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch id="enabled" checked={isFormEnabled} onChangeCallback={(e) => handelToggoleUpdate(e, "enabled", e.target.checked)} />
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h5 className="mb-2 text-base font-medium text-black">Submission Archive</h5>
          <p className="text-sm font-normal text-body-color">Choose whether to store submissions in FormBold. If disabled, file uploads will not be stored.</p>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch id="archive" checked={isFormSubmissionArchived} onChangeCallback={(e) => handelToggoleUpdate(e, "archive", e.target.checked)} />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsCard;
