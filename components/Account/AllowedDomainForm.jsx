import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFormAllowedDomain,
  deleteFormAllowedDomain,
  getFormAllowedDomains,
  resetAllowedDomainRequestSuccess,
} from "../../actions/FormAction";
import { find, isEmpty, isNil } from "lodash";
import Loader from "../Icons/Loader";

const AllowedDomainForm = () => {
  const dispatch = useDispatch();

  const forms = useSelector((state) => state.forms);
  const currentForm = forms.currentForm;
  const formDomains = forms.allowedDomains;
  const validationError = formDomains?.validationError;

  const [currentFormDomains, setCurrentFormDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const [err, setErr] = useState({
    domain: [],
  });

  const resetAll = () => {
    setNewDomain("");
    setErr({
      domain: [],
    });
  };

  useEffect(() => {
    !isNil(currentForm) && dispatch(getFormAllowedDomains(currentForm.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (formDomains?.requestSuccess) {
      resetAll();
      dispatch(resetAllowedDomainRequestSuccess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDomains?.requestSuccess]);

  useEffect(() => {
    if (!isNil(currentForm) && !isEmpty(formDomains?.data)) {
      let domains = find(formDomains?.data, { formId: currentForm.id });
      !isNil(domains) && setCurrentFormDomains(domains?.domains);
    }
  }, [currentForm, formDomains?.data]);

  useEffect(() => {
    if (validationError && !isEmpty(validationError)) {
      setErr(validationError);
    } else {
      setErr({ domain: [] });
    }
  }, [validationError]);

  const handelSaveNewDomain = (e) => {
    e.preventDefault();
    if (!isNil(currentForm)) {
      // if (validateDomain()) {
      const payload = {
        domain: newDomain,
        formId: currentForm.id,
      };
      dispatch(addFormAllowedDomain(payload));
      // }
    }
  };

  const handelDeleteDomain = (e, domainId) => {
    if (confirm("Are you sure you want to delete this domain?")) {
      if (!isNil(currentForm)) {
        const payload = {
          formId: currentForm.id,
          domainId: domainId,
        };
        dispatch(deleteFormAllowedDomain(payload));
      }
    }
  };

  return (
    <>
      <div className="mb-5">
        <input
          type="text"
          name="allowed_domain"
          placeholder="Allowed domain (example: https://uideck.com)"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          className="border-fb-gray-3 placeholder-fb-dark-5 focus:bg-fb-gray focus:shadow-inputHover focus:ring-primary/20 hover:bg-fb-gray hover:shadow-inputHover flex h-[52px] w-full items-center rounded-lg border bg-white px-6 text-black outline-none duration-300 hover:border-transparent focus:border-transparent focus:ring-2"
        />
        {err &&
          err.domain &&
          err.domain.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}
      </div>

      {/* <ButtonWithText
              text="Add New Domain"
              loading={formDomains?.loading}
              loaderColor={"white"}
              className="flex h-[52px] w-full items-center justify-center rounded-lg bg-black px-5 font-heading text-base font-medium text-white duration-300 disabled:cursor-not-allowed disabled:opacity-60 hover:bg-black/90"
              onClickCallback={handelSaveNewDomain}
            /> */}
      <button
        disabled={!newDomain || !newDomain.length > 0}
        onClick={(e) => handelSaveNewDomain(e)}
        className="font-heading flex h-[52px] w-full items-center justify-center rounded-lg bg-black px-5 text-base font-medium text-white duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Add New Domain
        {formDomains?.loading && (
          <Loader show color="white" height="25px" size="50px" />
        )}
      </button>

      <div className="space-y-4 pt-6">
        {currentFormDomains &&
          !isEmpty(currentFormDomains) &&
          currentFormDomains.map((domain, index) => (
            <div
              key={index}
              className="border-stroke flex items-center justify-between rounded-lg border p-2 pl-4"
            >
              <div className="flex items-center">
                <p className="text-sm text-black">{domain.domain}</p>
              </div>
              <button
                onClick={(e) => handelDeleteDomain(e, domain.id)}
                className="inline-flex items-center justify-center rounded-md bg-red-100 px-2.5 py-1 text-sm font-medium text-red-600"
              >
                <span className="pr-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipPath="evenodd"
                      d="M7.73202 1.68751H10.2681C10.4304 1.68741 10.5718 1.68732 10.7053 1.70864C11.2328 1.79287 11.6892 2.12186 11.9359 2.59563C11.9984 2.71555 12.043 2.84971 12.0942 3.00371L12.1779 3.25488C12.1921 3.2974 12.1962 3.30943 12.1996 3.31891C12.3309 3.682 12.6715 3.92745 13.0575 3.93723C13.0676 3.93748 13.08 3.93753 13.1251 3.93753H15.3751C15.6857 3.93753 15.9376 4.18937 15.9376 4.50003C15.9376 4.81069 15.6857 5.06253 15.3751 5.06253H2.625C2.31434 5.06253 2.0625 4.81069 2.0625 4.50003C2.0625 4.18937 2.31434 3.93753 2.625 3.93753H4.87506C4.9201 3.93753 4.93253 3.93749 4.94267 3.93723C5.32866 3.92745 5.66918 3.68202 5.80052 3.31893C5.80397 3.30938 5.80794 3.29761 5.82218 3.25488L5.90589 3.00372C5.95711 2.84973 6.00174 2.71555 6.06419 2.59563C6.3109 2.12186 6.76735 1.79287 7.29482 1.70864C7.42834 1.68732 7.56973 1.68741 7.73202 1.68751ZM6.75611 3.93753C6.79475 3.86176 6.82898 3.78303 6.85843 3.70161C6.86737 3.67689 6.87615 3.65057 6.88742 3.61675L6.96227 3.39219C7.03065 3.18706 7.04639 3.14522 7.06201 3.11523C7.14424 2.95731 7.29639 2.84764 7.47222 2.81957C7.50561 2.81423 7.55027 2.81253 7.76651 2.81253H10.2336C10.4499 2.81253 10.4945 2.81423 10.5279 2.81957C10.7037 2.84764 10.8559 2.95731 10.9381 3.11523C10.9537 3.14522 10.9695 3.18705 11.0379 3.39219L11.1127 3.61662L11.1417 3.70163C11.1712 3.78304 11.2054 3.86177 11.244 3.93753H6.75611Z"
                      fill="currentColor"
                    />
                    <path
                      d="M4.43632 6.33761C4.41565 6.02764 4.14762 5.79311 3.83765 5.81377C3.52767 5.83444 3.29314 6.10247 3.31381 6.41245L3.6614 11.6262C3.72552 12.5883 3.77731 13.3654 3.89879 13.9752C4.02509 14.6092 4.23991 15.1387 4.6836 15.5538C5.1273 15.9689 5.66996 16.1481 6.31095 16.2319C6.92747 16.3126 7.70628 16.3125 8.67045 16.3125H9.32963C10.2938 16.3125 11.0727 16.3126 11.6892 16.2319C12.3302 16.1481 12.8728 15.9689 13.3165 15.5538C13.7602 15.1387 13.975 14.6092 14.1013 13.9752C14.2228 13.3654 14.2746 12.5883 14.3387 11.6263L14.6863 6.41245C14.707 6.10247 14.4725 5.83444 14.1625 5.81377C13.8525 5.79311 13.5845 6.02764 13.5638 6.33761L13.2189 11.5119C13.1515 12.5228 13.1034 13.2262 12.998 13.7554C12.8958 14.2688 12.753 14.5405 12.5479 14.7323C12.3429 14.9242 12.0623 15.0485 11.5433 15.1164C11.0082 15.1864 10.3032 15.1875 9.29007 15.1875H8.71005C7.69692 15.1875 6.99192 15.1864 6.45686 15.1164C5.93786 15.0485 5.65724 14.9242 5.45218 14.7323C5.24712 14.5405 5.10437 14.2687 5.00211 13.7554C4.89669 13.2262 4.84867 12.5228 4.78127 11.5119L4.43632 6.33761Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.0691 7.69032C7.37822 7.65941 7.65386 7.88494 7.68478 8.19406L8.05978 11.9441C8.09069 12.2532 7.86516 12.5288 7.55604 12.5597C7.24692 12.5906 6.97127 12.3651 6.94036 12.056L6.56536 8.306C6.53445 7.99688 6.75998 7.72123 7.0691 7.69032Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10.931 7.69032C11.2402 7.72123 11.4657 7.99688 11.4348 8.306L11.0598 12.056C11.0289 12.3651 10.7532 12.5906 10.4441 12.5597C10.135 12.5288 9.90945 12.2532 9.94036 11.9441L10.3154 8.19406C10.3463 7.88494 10.6219 7.65941 10.931 7.69032Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllowedDomainForm;
