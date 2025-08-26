import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  resetPasswordRequestSuccess,
  updatePassword,
} from "../../actions/AccountSettings";

import Loader from "../../components/Icons/Loader";

const PasswordSettingCard = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const passwordUpdate = useSelector(
    (state) => state.accountSettings?.passwordUpdate
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [err, setErr] = useState({});

  useEffect(() => {
    if (passwordUpdate?.requestSucess) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(resetPasswordRequestSuccess());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordUpdate?.requestSucess]);

  const handelUpdatePass = (e) => {
    e.preventDefault();
    const valid = validate();
    if (valid) {
      const payload = {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      };

      dispatch(updatePassword(payload));
    }
  };

  const validate = () => {
    if (!currentPassword || (currentPassword && currentPassword === "")) {
      toast.warning("Current password can't be empty");
      return false;
    }
    if (!newPassword || (newPassword && newPassword === "")) {
      toast.warning("New password can't be empty");
      return false;
    }
    if (!confirmPassword || (confirmPassword && confirmPassword === "")) {
      toast.warning("Comfirm password can't be empty");
      return false;
    }
    if (confirmPassword && newPassword && confirmPassword !== newPassword) {
      toast.warning("New password and Confirm password doesn't match");
      return false;
    }
    return true;
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-9 font-heading text-[22px] font-bold text-black">
        Password
      </h3>

      <div className="mb-5">
        <label
          htmlFor="currentPassword"
          className="mb-2.5 block font-heading text-base font-medium text-black"
        >
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="flex h-[52px] w-full items-center rounded-lg border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="newPassword"
          className="mb-2.5 block font-heading text-base font-medium text-black"
        >
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="flex h-[52px] w-full items-center rounded-lg border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="re_newPassword"
          className="mb-2.5 block font-heading text-base font-medium text-black"
        >
          Retype New Password
        </label>
        <input
          type="password"
          name="re_newPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Retype New Password"
          className="flex h-[52px] w-full items-center rounded-lg border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
        />
      </div>

      <button
        onClick={(e) =>
          passwordUpdate?.loading ? e.preventDefault() : handelUpdatePass(e)
        }
        className="flex h-[52px] w-full items-center justify-center rounded-lg bg-black px-5 font-heading text-base font-medium text-white duration-300 hover:bg-black/90"
      >
        {passwordUpdate?.loading ? (
          <Loader show height="25px" size="50px" />
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
};

export default PasswordSettingCard;
