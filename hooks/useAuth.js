import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
  const signInData = useSelector((state) => state.auth?.signIn);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);

  const isLoggedIn = () => {
    return signInData ? true : false;
  };

  const user = () => {
    return signInData ? signInData?.userInfo : null;
  };

  const token = () => {
    return signInData ? signInData?.token : null;
  };

  return {
    user,
    token,
    isLoggedIn,
  };
};

export default useAuth;
