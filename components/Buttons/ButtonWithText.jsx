import React from "react";
import Loader from "../Icons/Loader";

const ButtonWithText = ({
  onClickCallback,
  loading,
  text,
  loaderColor,
  className,
  disabled = false,
  type = "button",
}) => {
  return (
    <button disabled={disabled} className={`${className}`} onClick={onClickCallback} type={type}>
      {loading ? (
        <Loader show color={loaderColor} height="25px" size="50px" />
      ) : (
        text
      )}
    </button>
  );
};

export default ButtonWithText;
