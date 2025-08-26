import { find, isEmpty, isNil } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userProfileUpdate } from "../../actions/AccountSettings";

const EditProfileCard = () => {
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(undefined);
  const [profileImagePreview, setProfileImagePreview] = useState(undefined);
  const [name, setName] = useState("");
  const [emailAddressId, setEmailAddressId] = useState(undefined);
  const [emailAddress, setEmailAddress] = useState(undefined);

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const emailAddresses = userInfo?.email_addresses;

  const handelSetUserInfo = () => {
    const email = find(userInfo?.email_addresses, { email: userInfo?.email });
    !isNil(email) && !isEmpty(email) && setEmailAddressId(email.id);
    !isNil(email) && !isEmpty(email) && setEmailAddress(email.email);
    !isNil(userInfo?.image_url) && !isEmpty(userInfo?.image_url) && setProfileImagePreview(userInfo?.image_url);
    setName(userInfo?.name);
  };

  useEffect(() => {
    handelSetUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const updatePhotoPreview = (e) => {
    const photo = e.target.files[0];

    if (!photo) return;
    if (photo.size / 1024 > 2048) {
      toast.warning("Profile Image size must not greater than 2MB");
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
    setProfileImage(photo);
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImagePreview(e.target.result);
    };
    reader.readAsDataURL(photo);
  };

  const clearPhotoFileInput = () => {
    if (profileImagePreview) {
      setProfileImage(undefined);
      setProfileImagePreview(undefined);
    }
  };

  const handelEmailOnChange = (e) => {
    e.preventDefault();
    const emailId = e.target.value;
    !isNil(emailId) && !isEmpty(emailId) && setEmailAddressId(emailId);
  };

  const updateProfileInformation = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", name);
    // formData.append("email_address_id", emailAddressId);
    profileImage && formData.append("image", profileImage);
    dispatch(userProfileUpdate(formData));
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-9 text-[22px] font-bold text-black">Edit Profile</h3>

      <div className="mb-9">
        {profileImagePreview ? (
          <>
            <div className="relative h-[130px] w-[130px] rounded-full">
              <Image src={profileImagePreview} alt="profile" fill className="rounded-full object-cover object-center" />

              <div className="absolute bottom-0 right-0">
                <input type="file" name="profile" id="profile" className="sr-only" onChange={(e) => updatePhotoPreview(e)} />
                <label htmlFor="profile" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-fb-gray duration-300 hover:bg-fb-stroke">
                  <svg className="h-5 w-5" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.7631 6.3561C11.1411 4.50044 12.7924 3.1875 14.6843 3.1875H19.3131C21.205 3.1875 22.8563 4.50044 23.2343 6.3561C23.3215 6.78448 23.7096 7.09871 24.1132 7.09871H24.1364L24.1596 7.09973C26.1478 7.18667 27.6749 7.43065 28.9499 8.26707C29.7532 8.79406 30.4442 9.47207 30.9826 10.2632C31.6525 11.2476 31.948 12.3773 32.0896 13.7437C32.2279 15.0787 32.2279 16.7521 32.2279 18.8715V18.9921C32.2279 21.1116 32.2279 22.7849 32.0896 24.1199C31.948 25.4863 31.6525 26.6161 30.9826 27.6004C30.4442 28.3916 29.7532 29.0696 28.9499 29.5966C27.9533 30.2504 26.8108 30.5386 25.4251 30.677C24.0683 30.8125 22.3665 30.8125 20.2052 30.8125H13.7922C11.6309 30.8125 9.92906 30.8125 8.57231 30.677C7.18657 30.5386 6.04406 30.2504 5.04748 29.5966C4.24419 29.0696 3.55319 28.3916 3.01477 27.6004C2.34487 26.6161 2.0494 25.4863 1.90783 24.1199C1.76951 22.7849 1.76952 21.1116 1.76953 18.9921V18.8715C1.76952 16.7521 1.76951 15.0787 1.90783 13.7437C2.0494 12.3773 2.34487 11.2476 3.01477 10.2632C3.55319 9.47207 4.24419 8.79406 5.04748 8.26707C6.32245 7.43065 7.84958 7.18667 9.83778 7.09973L9.86097 7.09871H9.88419C10.2878 7.09871 10.6759 6.78448 10.7631 6.3561ZM14.6843 5.3125C13.7761 5.3125 13.0165 5.94008 12.8454 6.78026C12.5682 8.141 11.3618 9.21097 9.91017 9.2236C7.99964 9.30848 6.97629 9.54318 6.2131 10.0439C5.64141 10.4189 5.15184 10.9 4.77153 11.4588C4.38032 12.0337 4.14522 12.7688 4.02151 13.9627C3.89586 15.1754 3.89453 16.7388 3.89453 18.9318C3.89453 21.1249 3.89586 22.6882 4.02151 23.9009C4.14522 25.0949 4.38032 25.83 4.77153 26.4048C5.15184 26.9637 5.64141 27.4447 6.2131 27.8198C6.8046 28.2078 7.56149 28.4405 8.7835 28.5625C10.0223 28.6863 11.6181 28.6875 13.8506 28.6875H20.1468C22.3793 28.6875 23.9751 28.6863 25.2139 28.5625C26.4359 28.4405 27.1928 28.2078 27.7843 27.8198C28.356 27.4447 28.8456 26.9637 29.2259 26.4048C29.6171 25.83 29.8522 25.0949 29.9759 23.9009C30.1015 22.6882 30.1029 21.1249 30.1029 18.9318C30.1029 16.7388 30.1015 15.1754 29.9759 13.9627C29.8522 12.7688 29.6171 12.0337 29.2259 11.4588C28.8456 10.9 28.356 10.4189 27.7843 10.0439C27.0211 9.54318 25.9978 9.30848 24.0872 9.2236C22.6356 9.21097 21.4292 8.141 21.152 6.78026C20.9809 5.94008 20.2213 5.3125 19.3131 5.3125H14.6843ZM16.9987 13.1042C17.5855 13.1042 18.0612 13.5799 18.0612 14.1667V17.3542H21.2487C21.8355 17.3542 22.3112 17.8299 22.3112 18.4167C22.3112 19.0035 21.8355 19.4792 21.2487 19.4792H18.0612V22.6667C18.0612 23.2535 17.5855 23.7292 16.9987 23.7292C16.4119 23.7292 15.9362 23.2535 15.9362 22.6667V19.4792H12.7487C12.1619 19.4792 11.6862 19.0035 11.6862 18.4167C11.6862 17.8299 12.1619 17.3542 12.7487 17.3542H15.9362V14.1667C15.9362 13.5799 16.4119 13.1042 16.9987 13.1042ZM24.4362 14.1667C24.4362 13.5799 24.9119 13.1042 25.4987 13.1042H26.9154C27.5022 13.1042 27.9779 13.5799 27.9779 14.1667C27.9779 14.7535 27.5022 15.2292 26.9154 15.2292H25.4987C24.9119 15.2292 24.4362 14.7535 24.4362 14.1667Z"
                      fill="#0E0B3D"
                    />
                  </svg>
                </label>
              </div>
            </div>
          </>
        ) : (
          <>
            <input type="file" name="profile" id="profile" className="sr-only" onChange={(e) => updatePhotoPreview(e)} />
            <label htmlFor="profile" className="flex h-[130px] w-[130px] cursor-pointer items-center justify-center rounded-full bg-fb-stroke duration-300 hover:bg-fb-gray">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.7631 6.3561C11.1411 4.50044 12.7924 3.1875 14.6843 3.1875H19.3131C21.205 3.1875 22.8563 4.50044 23.2343 6.3561C23.3215 6.78448 23.7096 7.09871 24.1132 7.09871H24.1364L24.1596 7.09973C26.1478 7.18667 27.6749 7.43065 28.9499 8.26707C29.7532 8.79406 30.4442 9.47207 30.9826 10.2632C31.6525 11.2476 31.948 12.3773 32.0896 13.7437C32.2279 15.0787 32.2279 16.7521 32.2279 18.8715V18.9921C32.2279 21.1116 32.2279 22.7849 32.0896 24.1199C31.948 25.4863 31.6525 26.6161 30.9826 27.6004C30.4442 28.3916 29.7532 29.0696 28.9499 29.5966C27.9533 30.2504 26.8108 30.5386 25.4251 30.677C24.0683 30.8125 22.3665 30.8125 20.2052 30.8125H13.7922C11.6309 30.8125 9.92906 30.8125 8.57231 30.677C7.18657 30.5386 6.04406 30.2504 5.04748 29.5966C4.24419 29.0696 3.55319 28.3916 3.01477 27.6004C2.34487 26.6161 2.0494 25.4863 1.90783 24.1199C1.76951 22.7849 1.76952 21.1116 1.76953 18.9921V18.8715C1.76952 16.7521 1.76951 15.0787 1.90783 13.7437C2.0494 12.3773 2.34487 11.2476 3.01477 10.2632C3.55319 9.47207 4.24419 8.79406 5.04748 8.26707C6.32245 7.43065 7.84958 7.18667 9.83778 7.09973L9.86097 7.09871H9.88419C10.2878 7.09871 10.6759 6.78448 10.7631 6.3561ZM14.6843 5.3125C13.7761 5.3125 13.0165 5.94008 12.8454 6.78026C12.5682 8.141 11.3618 9.21097 9.91017 9.2236C7.99964 9.30848 6.97629 9.54318 6.2131 10.0439C5.64141 10.4189 5.15184 10.9 4.77153 11.4588C4.38032 12.0337 4.14522 12.7688 4.02151 13.9627C3.89586 15.1754 3.89453 16.7388 3.89453 18.9318C3.89453 21.1249 3.89586 22.6882 4.02151 23.9009C4.14522 25.0949 4.38032 25.83 4.77153 26.4048C5.15184 26.9637 5.64141 27.4447 6.2131 27.8198C6.8046 28.2078 7.56149 28.4405 8.7835 28.5625C10.0223 28.6863 11.6181 28.6875 13.8506 28.6875H20.1468C22.3793 28.6875 23.9751 28.6863 25.2139 28.5625C26.4359 28.4405 27.1928 28.2078 27.7843 27.8198C28.356 27.4447 28.8456 26.9637 29.2259 26.4048C29.6171 25.83 29.8522 25.0949 29.9759 23.9009C30.1015 22.6882 30.1029 21.1249 30.1029 18.9318C30.1029 16.7388 30.1015 15.1754 29.9759 13.9627C29.8522 12.7688 29.6171 12.0337 29.2259 11.4588C28.8456 10.9 28.356 10.4189 27.7843 10.0439C27.0211 9.54318 25.9978 9.30848 24.0872 9.2236C22.6356 9.21097 21.4292 8.141 21.152 6.78026C20.9809 5.94008 20.2213 5.3125 19.3131 5.3125H14.6843ZM16.9987 13.1042C17.5855 13.1042 18.0612 13.5799 18.0612 14.1667V17.3542H21.2487C21.8355 17.3542 22.3112 17.8299 22.3112 18.4167C22.3112 19.0035 21.8355 19.4792 21.2487 19.4792H18.0612V22.6667C18.0612 23.2535 17.5855 23.7292 16.9987 23.7292C16.4119 23.7292 15.9362 23.2535 15.9362 22.6667V19.4792H12.7487C12.1619 19.4792 11.6862 19.0035 11.6862 18.4167C11.6862 17.8299 12.1619 17.3542 12.7487 17.3542H15.9362V14.1667C15.9362 13.5799 16.4119 13.1042 16.9987 13.1042ZM24.4362 14.1667C24.4362 13.5799 24.9119 13.1042 25.4987 13.1042H26.9154C27.5022 13.1042 27.9779 13.5799 27.9779 14.1667C27.9779 14.7535 27.5022 15.2292 26.9154 15.2292H25.4987C24.9119 15.2292 24.4362 14.7535 24.4362 14.1667Z"
                  fill="#0E0B3D"
                />
              </svg>
            </label>
          </>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="name" className="mb-2.5 block font-heading text-base font-medium text-black">
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          placeholder="Your Name"
          className="flex h-[52px] w-full items-center rounded-lg border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="mb-2.5 block font-heading text-base font-medium text-black">
          Email address
        </label>
        <div className="relative z-10">
          {/* <select
            onChange={handelEmailOnChange}
            value={emailAddressId}
            className="flex h-[52px] w-full appearance-none items-center rounded-lg border border-fb-gray-3 bg-white pl-5 pr-8 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
          >
            {emailAddresses &&
              emailAddresses.map((email, index) => (
                <option key={index} value={email.id}>
                  {email.email}
                </option>
              ))}
          </select>
          <span className="absolute right-5 top-1/2 z-20 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.24564 10.5564L12.5321 6.13612C12.7996 5.8603 12.6374 5.33301 12.2852 5.33301H3.71223C3.35996 5.33301 3.19783 5.8603 3.4653 6.13612L7.75176 10.5564C7.89386 10.703 8.10354 10.703 8.24564 10.5564Z"
                fill="#8D93A5"
              />
              <path
                d="M12.5321 6.13612L12.1732 5.78804V5.78804L12.5321 6.13612ZM8.24564 10.5564L8.60458 10.9045L8.60458 10.9045L8.24564 10.5564ZM7.75176 10.5564L8.11071 10.2084L7.75176 10.5564ZM3.4653 6.13612L3.82424 5.78804L3.4653 6.13612ZM12.1732 5.78804L7.88669 10.2084L8.60458 10.9045L12.891 6.4842L12.1732 5.78804ZM8.11071 10.2084L3.82424 5.78804L3.10635 6.4842L7.39281 10.9045L8.11071 10.2084ZM3.71223 5.83301H12.2852V4.83301H3.71223V5.83301ZM3.82424 5.78804C3.83217 5.79622 3.8331 5.80295 3.83256 5.80015C3.83165 5.79536 3.83174 5.78633 3.83428 5.77808C3.8371 5.76891 3.83726 5.77774 3.8193 5.79368C3.80952 5.80236 3.79457 5.81275 3.77421 5.82084C3.75334 5.82914 3.73174 5.83301 3.71223 5.83301V4.83301C3.2469 4.83301 2.97098 5.18322 2.87844 5.48418C2.78469 5.78908 2.82155 6.19051 3.10635 6.4842L3.82424 5.78804ZM7.88669 10.2084C7.90364 10.1909 7.94275 10.1663 7.9987 10.1663C8.05465 10.1663 8.09376 10.1909 8.11071 10.2084L7.39281 10.9045C7.73134 11.2536 8.26605 11.2536 8.60458 10.9045L7.88669 10.2084ZM12.891 6.4842C13.1758 6.19051 13.2127 5.78908 13.119 5.48418C13.0264 5.18322 12.7505 4.83301 12.2852 4.83301V5.83301C12.2657 5.83301 12.2441 5.82914 12.2232 5.82084C12.2028 5.81275 12.1879 5.80236 12.1781 5.79368C12.1601 5.77774 12.1603 5.76891 12.1631 5.77808C12.1657 5.78633 12.1657 5.79536 12.1648 5.80015C12.1643 5.80295 12.1652 5.79622 12.1732 5.78804L12.891 6.4842Z"
                fill="#8D93A5"
              />
            </svg>
          </span> */}

          {/* backup user can not change email */}
          <input
            type="email"
            defaultValue={emailAddress}
            disabled
            name="email"
            placeholder="Email address"
            className="flex h-[52px] w-full items-center rounded-lg border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 disabled:opacity-75 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
            readOnly
          />
        </div>
        {/* <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full rounded-lg border border-stroke bg-white px-5 py-3.5 text-base text-black outline-none transition-all duration-300 focus:border-primary focus:bg-fb-gray"
        /> */}
      </div>

      <button
        onClick={(e) => updateProfileInformation(e)}
        className="flex h-[52px] w-full items-center justify-center rounded-lg bg-black px-5 font-heading text-base font-medium text-white duration-300 hover:bg-black/90"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfileCard;
