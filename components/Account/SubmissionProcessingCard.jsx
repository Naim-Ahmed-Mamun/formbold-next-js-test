import Image from "next/image";
import { find, has, isEmpty, isNil, omit } from "lodash";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { updateForm, updateFormEmailLogo } from "../../actions/FormAction";
import BusinessOnlyPaywallModal from "../Plugin/BusinessOnlyPaywallModal";
import ToggleSwitch from "./ToggleSwitch";
import UpgradeButton from "./UpgradeButton";
import UpgradeModal from "./UpgradeModal";


const SubmissionProcessingCard = () => {
  const dispatch = useDispatch();
  const photoInput = useRef(null);
  const router = useRouter();

  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(false);
  const [emailAddressId, setEmailAddressId] = useState(undefined);
  const [additionalEmails, setAdditionalEmails] = useState([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [photoPreview, setPhotoPreview] = useState(undefined);
  const [isHttpApiEnabled, setIsHttpApiEnabled] = useState(false);
  const [isRemoveBranding, setIsRemoveBranding] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [showBusinessOnlyPaywallModal, setShowBusinessOnlyPaywallModal] = useState(false);

  const formPage = useSelector((state) => state.forms);
  const currentForm = useSelector((state) => state.forms?.currentForm);
  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const features = userInfo?.plan?.features;

  //additional Email
  const additionalEmailsArray = userInfo?.email_addresses.filter((email) => email.verified_at).map((email) => ({ label: email.email, value: email.id }));

  useEffect(() => {
    !isEmpty(currentForm) && handelSetFormData(currentForm);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentForm]);

  const handelSetFormData = (form) => {
    const email = find(userInfo?.email_addresses, {
      id: currentForm?.email_address_id,
    });
    !isNil(email) && !isEmpty(email) && setEmailAddressId(email.id);
    setIsEmailNotificationEnabled(has(form, "is_email_notifications_enabled") ? form.is_email_notifications_enabled : false);
    setEmailSubject(has(form, "email_subject") ? form.email_subject : "");
    setRedirectUrl(has(form, "redirect_url") ? (isNil(form.redirect_url) ? "" : form.redirect_url) : "");
    setIsRemoveBranding(has(form, "show_custom_email_logo") ? form.show_custom_email_logo : false);
    setIsHttpApiEnabled(has(form, "is_api_access_enabled") ? form.is_api_access_enabled : false);
    setPhotoPreview(has(form, "email_logo_url") ? form.email_logo_url : undefined);
    if (has(form, "additional_emails") && !isNil(form.additional_emails)) {
      handelSetEmailCC(form.additional_emails);
    }
  };

  const handelSetEmailCC = (emails) => {
    const newEmails = additionalEmailsArray.filter((email) => emails.includes(email.value));
    setAdditionalEmails(newEmails);
  };

  const handelSubmissionProcessingUpdate = (e) => {
    e.preventDefault();
    let payload = {
      ...currentForm,
      email_address_id: emailAddressId,
      additional_emails: !isNil(additionalEmails) ? (additionalEmails.length > 0 ? additionalEmails.map((email) => email.value) : null) : null,
      email_subject: emailSubject,
      redirect_url: redirectUrl,
      // email_logo // will do later
    };
    dispatch(updateForm(payload));
  };

  const handelToggoleUpdate = (e, id, value, updateRecaptchaSecret = false) => {
    let payload = {
      ...currentForm,
    };
    if (id === "emailNotifications") {
      setIsEmailNotificationEnabled(value);
      payload = { ...payload, is_email_notifications_enabled: value };
    }
    if (id === "email-branding") {
      setIsRemoveBranding(value);
      payload = { ...payload, show_custom_email_logo: value };
    }
    if (id === "HTTP_API") {
      payload = { ...payload, is_api_access_enabled: value };
      setIsHttpApiEnabled(value);
    }

    payload = updateRecaptchaSecret ? payload : omit(payload, "recaptcha_private_key");
    dispatch(updateForm(payload));
  };

  const handelEmailOnChange = (e) => {
    e.preventDefault();
    const emailId = e.target.value;
    !isNil(emailId) && !isEmpty(emailId) && setEmailAddressId(emailId);
  };
  const handelAdditionalEmailOnChange = (emails) => {
    setAdditionalEmails(emails);
  };

  const updatePhotoPreview = (e) => {
    const photo = e.target.files[0];

    if (!photo) return;

    if (photo.size / 1024 > 2048) {
      toast.warning("Logo size must not greater than 2MB");
      clearPhotoFileInput();
      return;
    }
    // Allowing file type
    let allowedExtensions = /(image\/jpg|image\/jpeg|image\/png)$/i;
    if (!allowedExtensions.exec(photo.type)) {
      toast.warning("Only PNG and JPG types are allowed");
      clearPhotoFileInput();
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(photo);
  };

  const clearPhotoFileInput = () => {
    if (photoPreview) {
      setPhotoPreview(undefined);
    }
  };
  const convertValues = (payload) => {
    var formData = new FormData();

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const value = payload[key];
        formData.append(key, value);
      }
    }
    photoPreview && formData.append("email_logo", photoInput.current?.files[0]);

    return formData;
  };
  const handelCustomEmailLogoUpdate = (e) => {
    e.preventDefault();

    const payload = {
      ...currentForm,
    };

    omit(payload, "recaptcha_private_key");
    omit(payload, "email_logo");

    const formData = convertValues(payload);

    if (!isNil(currentForm)) {
      dispatch(updateFormEmailLogo(currentForm.id, formData));
    }
  };
  return (
    <>
      <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
        <h3 className="fon-heading mb-8 text-[22px] font-bold text-black">Submission Processing</h3>

        <div className="mb-6 flex justify-between">
          <div>
            <h5 className="mb-2 font-heading text-base font-medium text-black">Email Notifications</h5>
            <p className="text-sm font-normal leading-[24px] text-body-color">
              Enable or disable sending notification emails. Submissions will still be Updated to the archive and dispatched to apps.
            </p>
          </div>
          <div className="flex w-full max-w-[72px] justify-end">
            <ToggleSwitch id="emailNotifications" checked={isEmailNotificationEnabled} onChangeCallback={(e) => handelToggoleUpdate(e, "emailNotifications", e.target.checked)} />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="targetEmail" className="mb-3.5 block font-heading text-base font-medium text-black">
            Target Email
          </label>
          <div className="relative mb-3">
            <div className="relative">
              <select
                onChange={handelEmailOnChange}
                value={emailAddressId}
                className="flex h-[50px] w-full appearance-none items-center rounded-lg border border-fb-gray-3 bg-fb-gray pl-6 pr-[85px] text-sm text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
              >
                {userInfo?.email_addresses.map((email, index) => (
                  <option key={index} value={email.id}>
                    {email.email}
                  </option>
                ))}
              </select>
              <span className="absolute right-[95px] top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.2778 11.8764L14.1001 6.9035C14.401 6.5932 14.2186 6 13.8223 6L4.17773 6C3.78142 6 3.59902 6.5932 3.89992 6.9035L8.72219 11.8764C8.88205 12.0412 9.11795 12.0412 9.2778 11.8764Z"
                    fill="#6C6F93"
                  />
                </svg>
              </span>
            </div>

            <button
              onClick={(e) => handelSubmissionProcessingUpdate(e)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-transparent bg-white px-3.5 py-1.5 font-heading text-sm font-medium text-black shadow-fb-one duration-300 hover:border-primary hover:text-primary"
            >
              Update
            </button>
          </div>
          <p className="text-sm font-normal text-body-color">
            Where to send submissions. To add a new email address, visit the{" "}
            <Link href="/account/account-settings" passHref target="_blank" className="font-medium text-primary">
                account page
            </Link>
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="emailCC" className="mb-2 block font-heading text-base font-medium text-black">
            Email CC
          </label>
          <p className="mb-3.5 text-sm font-normal text-body-color">Send carbon copy of submission emails to multiple target email address</p>
          <div className="relative mb-3">
            <div className="relative" onClick={(e) => (!features.form_multiple_emails_support ? setShowBusinessOnlyPaywallModal(true) : undefined)}>
              <Select
                classNamePrefix="select"
                // defaultValue={additionalEmailsArray[0]}
                isMulti={true}
                isClearable={true}
                isSearchable={true}
                name="additional-email"
                options={additionalEmailsArray}
                value={additionalEmails}
                onChange={(val) => handelAdditionalEmailOnChange(val)}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    height: "50px",
                    borderRadius: "8px",
                  }),
                }}
                // classNames={{
                //   control: () =>
                //     "flex h-[50px] w-full appearance-none items-center rounded-lg border border-fb-gray-3 bg-fb-gray pl-4 pr-[85px] text-sm text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover",
                // }}
                classNames="flex h-[50px] w-full appearance-none items-center rounded-lg border border-fb-gray-3 bg-fb-gray pl-4 pr-[85px] text-sm text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
              />

              <span className="absolute right-[95px] top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.2778 11.8764L14.1001 6.9035C14.401 6.5932 14.2186 6 13.8223 6L4.17773 6C3.78142 6 3.59902 6.5932 3.89992 6.9035L8.72219 11.8764C8.88205 12.0412 9.11795 12.0412 9.2778 11.8764Z"
                    fill="#6C6F93"
                  />
                </svg>
              </span>
            </div>

            <button
              onClick={(e) => (features.form_multiple_emails_support ? handelSubmissionProcessingUpdate(e) : undefined)}
              disabled={!features.form_multiple_emails_support}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-transparent bg-white px-3.5 py-1.5 font-heading text-sm font-medium text-black shadow-fb-one duration-300 hover:border-primary hover:text-primary"
            >
              Update
            </button>
          </div>
          <p className="text-sm font-normal leading-[24px] text-body-color">
            Make sure the email is already verified and added to account, you can add new verified email from {" "}
            <Link href="/account/account-settings" passHref target="_blank" className="font-medium text-primary">
                 account page
            </Link>
          </p>
        </div>

        <div className="mb-6" onClick={(e) => (!features.email_subject ? setModalOpen(true) : undefined)}>
          <label htmlFor="emailSubject" className="mb-3.5 block font-heading text-base font-medium text-black">
            Email Subject
          </label>
          <div className="relative mb-3">
            <input
              type="email"
              disabled={!features.email_subject}
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              name="emailSubject"
              // defaultValue="New submission for test form"
              placeholder="Email Subject"
              className="w-full rounded-md border border-transparent bg-fb-gray py-3.5 pl-6 pr-[85px] text-sm text-black outline-none duration-300 focus:border-primary"
            />

            <button
              onClick={(e) => (features.email_subject ? handelSubmissionProcessingUpdate(e) : undefined)}
              disabled={!features.email_subject}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-transparent bg-white px-3.5 py-1.5 font-heading text-sm font-medium text-black shadow-fb-one duration-300 disabled:text-body-color hover:border-primary hover:text-primary disabled:hover:border-transparent disabled:hover:text-body-color"
            >
              Update
            </button>
          </div>
          <p className="mb-3 text-sm font-normal text-body-color">After successful submission, notification email subject</p>
          {!features.email_subject && <UpgradeButton />}
        </div>

        <div className="mb-6" onClick={(e) => (!features.redirect ? setModalOpen(true) : undefined)}>
          <label htmlFor="redirectURL" className="mb-3.5 block font-heading text-base font-medium text-black">
            Redirect URL
          </label>
          <div className="relative mb-3">
            <input
              type="url"
              disabled={!features.redirect}
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              name="redirectURL"
              // defaultValue="https://example.com/thank-you"
              placeholder="https://example.com/thank-you"
              className="w-full rounded-md border border-transparent bg-fb-gray py-3.5 pl-6 pr-[85px] text-sm text-black outline-none duration-300 focus:border-primary"
            />

            <button
              onClick={(e) => (features.redirect ? handelSubmissionProcessingUpdate(e) : undefined)}
              disabled={!features.redirect}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-transparent bg-white px-3.5 py-1.5 font-heading text-sm font-medium text-black shadow-fb-one duration-300 disabled:text-body-color hover:border-primary hover:text-primary disabled:hover:border-transparent disabled:hover:text-body-color"
            >
              Update
            </button>
          </div>
          <p className="mb-3 text-sm font-normal text-body-color">After successful submission, where should the user be redirected?</p>
          {!features.redirect && <UpgradeButton />}
        </div>
        <div onClick={(e) => (!features.remove_branding ? setModalOpen(true) : undefined)}>
          <div className="mb-4 flex justify-between">
            <div>
              <h5 className="mb-2 font-heading text-base font-medium text-black">Email Branding - White label</h5>
            </div>
            <div className="flex w-full max-w-[72px] justify-end">
              <ToggleSwitch
                id="email-branding"
                checked={isRemoveBranding}
                onChangeCallback={(e) => handelToggoleUpdate(e, "email-branding", e.target.checked)}
                isDisabled={!features.remove_branding}
              />
            </div>
          </div>

          <div className="mb-6" onClick={(e) => (!features.remove_branding ? setModalOpen(true) : undefined)}>
            <div className="relative mb-3">
              <div className="flex">
                {photoPreview && <Image src={photoPreview} alt="Logo" className="h-[56px] w-[300px]" width={300} height={56} />}
                <input
                  type="file"
                  ref={photoInput}
                  disabled={!features.remove_branding}
                  onChange={(e) => updatePhotoPreview(e)}
                  name="chooseFile"
                  placeholder="Choose file"
                  className="w-full rounded-md border border-transparent bg-fb-gray py-3.5 pl-6 pr-[85px] text-sm text-black outline-none duration-300 focus:border-primary"
                />
              </div>

              <button
                disabled={!features.remove_branding}
                onClick={(e) => (features.remove_branding ? handelCustomEmailLogoUpdate(e) : undefined)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-transparent bg-white px-3.5 py-1.5 font-heading text-sm font-medium text-black shadow-fb-one duration-300 disabled:text-body-color hover:border-primary hover:text-primary disabled:hover:border-transparent disabled:hover:text-body-color"
              >
                Update
              </button>
            </div>
            <p className="mb-3 text-xs font-normal text-body-color">
              <span className="font-medium text-black">Recommended size:</span> 300px X 56px (PNG or JPG) and not more than 2MB
            </p>
            <p className="mb-3 text-sm font-normal leading-[24px] text-body-color">Upload your brand logo, this will be visible on submission emails and status pages</p>

            {!features.remove_branding && <UpgradeButton />}
          </div>
        </div>

        <div className="flex justify-between" onClick={(e) => (!features.api ? setModalOpen(true) : undefined)}>
          <div>
            <h5 className="mb-2 font-heading text-base font-medium text-black">HTTP API</h5>
            <p className="mb-3 text-sm font-normal text-body-color">Allow programmatic access to this form&apos;s submissions.</p>
            {!features.api && <UpgradeButton />}
          </div>
          <div className="flex w-full max-w-[72px] justify-end">
            <ToggleSwitch id="HTTP_API" checked={isHttpApiEnabled} onChangeCallback={(e) => handelToggoleUpdate(e, "HTTP_API", e.target.checked)} isDisabled={!features.api} />
          </div>
        </div>
      </div>
      <UpgradeModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <BusinessOnlyPaywallModal modalOpen={showBusinessOnlyPaywallModal} form={currentForm} setModalOpen={setShowBusinessOnlyPaywallModal} />
    </>
  );
};

export default SubmissionProcessingCard;
