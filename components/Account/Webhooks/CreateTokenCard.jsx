import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { addUserApiToken, resetWebhookRequstSuccess } from "../../../actions/Webhooks";
import { isEmpty } from "lodash";

const CreateTokenCard = () => {
  const dispatch = useDispatch();

  const webhooks = useSelector((state) => state.webhooks);
  const validationError = webhooks?.validationError;

  const [tokenName, setTokenName] = useState("");
  const [err, setErr] = useState({
    name: [],
  });

  const resetAll = () => {
    setTokenName("");
    setErr({
      name: [],
    });
  };
  const handelTokenSubmit = (e) => {
    e.preventDefault();
    if (!tokenName || tokenName === "") {
      toast.warn("Name can not be empty");
    } else {
      const payLoad = {
        name: tokenName,
      };
      dispatch(addUserApiToken(payLoad));
    }
  };
  useEffect(() => {
    if (validationError && !isEmpty(validationError)) {
      setErr(validationError);
    } else {
      setErr({ name: [] });
    }
  }, [validationError]);

  useEffect(() => {
    if (webhooks?.requestSuccess) {
      resetAll();
      dispatch(resetWebhookRequstSuccess());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webhooks?.requestSuccess]);

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-2 font-heading text-[22px] font-bold text-black">Want to use the API?</h3>
      <p className="mb-7.5 text-sm text-body-color">Create a new token to get the access.</p>

      <div className="mb-5">
        <label htmlFor="TokenName" className="mb-2.5 block font-heading text-base font-medium text-black">
          Token name
        </label>
        <input
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          name="TokenName"
          placeholder="Enter your token name"
          className="flex h-[50px] w-full items-center rounded-lg border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
        />
        {err &&
          err.name &&
          err.name.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}
      </div>

      <button
        className="flex h-[50px] w-full items-center justify-center rounded-lg bg-black px-5 font-heading text-base font-medium text-white duration-300 hover:bg-black/90"
        onClick={(e) => handelTokenSubmit(e)}
      >
        Create
      </button>
    </div>
  );
};

export default CreateTokenCard;
