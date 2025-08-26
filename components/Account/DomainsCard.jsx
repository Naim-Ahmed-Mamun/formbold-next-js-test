import { has, isEmpty, omit } from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../actions/FormAction";
import ToggleSwitch from "./ToggleSwitch";
import UpgradeButton from "./UpgradeButton";
import UpgradeModal from "./UpgradeModal";
import AllowedDomainForm from "./AllowedDomainForm";

const DomainsCard = () => {
  const dispatch = useDispatch();

  const [isAllowedDomainEnabled, setIsAllowedDomainEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const currentForm = useSelector((state) => state.forms?.currentForm);
  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const pageLoading = useSelector((state) => state.forms?.pageLoading);
  const features = userInfo?.plan?.features;

  useEffect(() => {
    !isEmpty(currentForm) && handelSetFormData(currentForm);
  }, [currentForm]);

  const handelSetFormData = (form) => {
    setIsAllowedDomainEnabled(has(form, "is_allowed_domain_enabled") ? form.is_allowed_domain_enabled : false);
  };

  const handelToggoleUpdate = (e, id, value, updateRecaptchaSecret = false) => {
    let payload = {
      ...currentForm,
    };
    if (id === "allowedDomains") {
      setIsAllowedDomainEnabled(value);
      payload = { ...payload, is_allowed_domain_enabled: value };
    }
    payload = updateRecaptchaSecret ? payload : omit(payload, "recaptcha_private_key");
    dispatch(updateForm(payload));
  };

  return (
    <>
      <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
        <div className="flex justify-between">
          <div>
            <h5 className="mb-2 font-heading text-base font-medium text-black">Allowed Domains</h5>
            <p className="mb-3 text-sm font-normal leading-[24px] text-body-color">
              Allowed Domains Insert specific domains to be allowed for form submissions, all other referrers will be blocked.{" "}
              <Link href="https://formbold.com/docs/settings#allowed-domains" passHref target="_blank" className="font-medium text-primary">
                  Learn more →
              </Link>
            </p>
            {!features.allowed_domains ? <UpgradeButton /> : <>{isAllowedDomainEnabled && <AllowedDomainForm />}</>}
          </div>
          <div className="flex w-full max-w-[72px] justify-end" onClick={(e) => (!features.allowed_domains ? setModalOpen(true) : undefined)}>
            <ToggleSwitch
              id="allowedDomains"
              checked={isAllowedDomainEnabled}
              onChangeCallback={(e) => handelToggoleUpdate(e, "allowedDomains", e.target.checked)}
              isDisabled={!features.allowed_domains}
            />
          </div>
        </div>
      </div>
      <UpgradeModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default DomainsCard;
