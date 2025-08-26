import { has, isEmpty, omit } from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateForm } from "../../actions/FormAction";
import FeatureItem from "./FeatureItem";
import ToggleSwitch from "./ToggleSwitch";

const SpamProtectionCard = () => {
  const dispatch = useDispatch();

  const [isSpamFilterEnabled, setIsSpamFilterEnabled] = useState(false);
  const [isDefaultRecaptchaEnabled, setIsDefaultRecaptchaEnabled] =
    useState(false);
  const [isCustomRecaptchaEnabled, setIsCustomRecaptchaEnabled] =
    useState(false);
  const [isCustomRecaptchaReady, setIsCustomRecaptchaReady] = useState(false);
  const [reacapchaPublickKey, setReacapchaPublickKey] = useState("");
  const [reacapchaPrivatekKey, setReacapchaPrivatekKey] = useState("");

  const currentForm = useSelector((state) => state.forms?.currentForm);
  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const pageLoading = useSelector((state) => state.forms?.pageLoading);
  const features = userInfo?.plan?.features;

  useEffect(() => {
    !isEmpty(currentForm) && handelSetFormData(currentForm);
  }, [currentForm]);

  const handelToggoleUpdate = (e, id, value, updateRecaptchaSecret = false) => {
    let payload = {
      ...currentForm,
    };
    if (id === "basic-filter") {
      setIsSpamFilterEnabled(value);
      payload = { ...payload, is_spam_filter_enabled: value };
    }
    if (id === "auto-reCAPTCHA") {
      if (checkRecaptchaFeatureAvailable(e)) {
        setIsCustomRecaptchaEnabled(false);
        setIsCustomRecaptchaReady(false);
        setIsDefaultRecaptchaEnabled(value);
        payload = {
          ...payload,
          is_default_recaptcha_enabled: value,
          is_recaptcha_enabled: false,
          is_custom_recaptcha_ready: false,
        };
      }
    }
    if (id === "custom-reCAPTCHA") {
      if (checkRecaptchaFeatureAvailable(e)) {
        setIsCustomRecaptchaEnabled(value);
        setIsCustomRecaptchaReady(value);
        setIsDefaultRecaptchaEnabled(false);
        payload = {
          ...payload,
          is_recaptcha_enabled: value,
          is_custom_recaptcha_ready: value,
          is_default_recaptcha_enabled: false,
        };
      }
    }
    payload = updateRecaptchaSecret
      ? payload
      : omit(payload, "recaptcha_private_key");
    dispatch(updateForm(payload));
  };

  const handelSetFormData = (form) => {
    setIsSpamFilterEnabled(
      has(form, "is_spam_filter_enabled") ? form.is_spam_filter_enabled : false
    );
    setIsDefaultRecaptchaEnabled(
      has(form, "is_default_recaptcha_enabled")
        ? form.is_default_recaptcha_enabled
        : false
    );
    setIsCustomRecaptchaEnabled(
      has(form, "is_recaptcha_enabled") ? form.is_recaptcha_enabled : false
    );
    setIsCustomRecaptchaReady(
      has(form, "is_custom_recaptcha_enabled")
        ? form.is_custom_recaptcha_ready
        : false
    );
    setReacapchaPublickKey(
      has(form, "recaptcha_public_key") ? form.recaptcha_public_key : false
    );
    setReacapchaPrivatekKey(
      has(form, "recaptcha_private_key") ? form.recaptcha_private_key : false
    );
  };

  const checkRecaptchaFeatureAvailable = (e) => {
    if (!features.recaptcha) {
      toast.warning("Your current plan does not support custom reCAPTCHA");
      setIsCustomRecaptchaEnabled(false);
      setIsCustomRecaptchaReady(false);
      e.preventDefault();
      return false;
    }
    return true;
  };

  const handelRecaptchaUpdate = (e) => {
    e.preventDefault();
    setIsCustomRecaptchaEnabled(true);
    setIsCustomRecaptchaReady(true);
    setIsDefaultRecaptchaEnabled(false);
    let payload = {
      ...currentForm,
      is_custom_recaptcha_enabled: true,
      is_recaptcha_enabled: true,
      is_default_recaptcha_enabled: false,
      recaptcha_public_key: reacapchaPublickKey,
      recaptcha_private_key: reacapchaPrivatekKey,
    };
    dispatch(updateForm(payload));
  };

  const recaptchaMessage = () => {
    if (!isCustomRecaptchaEnabled) {
      return "Add your custom reCAPTCHA keys and make it compatible with Ajax ";
    } else if (isCustomRecaptchaReady) {
      return "reCAPTCHA successfully activated! ";
    } else {
      return "reCAPTCHA is not working, Please fill site key, private key and click Update.";
    }
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-8 font-heading text-[22px] font-bold text-black">
        Spam Protection
      </h3>

      <div className="mb-6 flex justify-between">
        <div>
          <h5 className="mb-2 font-heading text-base font-medium text-black">
            Basic Spam Filter
          </h5>
          <p className="text-sm font-normal text-body-color">
            Automatic internal spam filtering
          </p>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch
            id="basic-filter"
            checked={isSpamFilterEnabled}
            onChangeCallback={(e) =>
              handelToggoleUpdate(e, "basic-filter", e.target.checked)
            }
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h5 className="font-heading text-base font-medium text-black">
            Automatic reCAPTCHA
          </h5>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch
            id="auto-reCAPTCHA"
            checked={isDefaultRecaptchaEnabled}
            onChangeCallback={(e) =>
              handelToggoleUpdate(e, "auto-reCAPTCHA", e.target.checked)
            }
          />
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <FeatureItem active label="Handles reCAPTCHA for you" />
        <FeatureItem active label="Easiest spam and bot protection" />
        <FeatureItem active label="Adds one more step for verification" />
        <FeatureItem label="AJAX requests won't work if enabled" />
        <FeatureItem label="File attachment won't work if enabled" />
      </div>

      <div className="mb-6 flex justify-between">
        <div>
          <h5 className="mb-2 font-heading text-base font-medium text-black">
            Custom reCAPTCHA (Recommended)
          </h5>

          <p className="text-sm font-normal text-body-color">
            {recaptchaMessage()}
            <Link href="https://formbold.com/docs/spam#custom-recaptcha" passHref target="_blank" className="font-medium text-primary">
              → Learn How
            </Link>
          </p>
        </div>
        <div className="flex w-full max-w-[72px] justify-end">
          <ToggleSwitch
            id="custom-reCAPTCHA"
            checked={isCustomRecaptchaEnabled}
            onChangeCallback={(e) =>
              handelToggoleUpdate(e, "custom-reCAPTCHA", e.target.checked)
            }
          />
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <FeatureItem active label="Works with both AJAX and HTTP requests" />
        <FeatureItem active label="Use your own reCAPTCHA keys" />
        <FeatureItem
          active
          label="No additional steps required for verification"
        />
        <FeatureItem label="Must Add reCAPTCHA div before submit button" />
      </div>

      {features.recaptcha && isCustomRecaptchaEnabled && (
        <>
          <div className="mb-5">
            <label
              htmlFor="reCAPTCHASiteKey"
              className="mb-2.5 block font-heading text-base font-medium text-black"
            >
              reCAPTCHA Site Key
            </label>
            <input
              type="text"
              disabled={!features.recaptcha}
              value={reacapchaPublickKey}
              onChange={(e) => setReacapchaPublickKey(e.target.value)}
              name="reCAPTCHASiteKey"
              placeholder="reCAPTCHA Site Key"
              className="flex h-[50px] w-full items-center rounded-lg border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="reCAPTCHASecretKey"
              className="mb-2.5 block font-heading text-base font-medium text-black"
            >
              reCAPTCHA Secret Key
            </label>
            <input
              type="text"
              disabled={!features.recaptcha}
              value={reacapchaPrivatekKey}
              onChange={(e) => setReacapchaPrivatekKey(e.target.value)}
              name="reCAPTCHASecretKey"
              placeholder="reCAPTCHA Secret Key"
              className="flex h-[50px] w-full items-center rounded-lg border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
            />
          </div>
        </>
      )}

      <button
        disabled={!features.recaptcha || !isCustomRecaptchaEnabled}
        className="flex h-[50px] w-full items-center justify-center rounded-lg bg-black px-5 font-heading text-base font-medium text-white duration-300 hover:bg-black/90"
        onClick={(e) => handelRecaptchaUpdate(e)}
      >
        Update
      </button>
    </div>
  );
};

export default SpamProtectionCard;