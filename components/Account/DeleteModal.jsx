import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteForm } from "../../actions/FormAction";
import useClickOutside from '../../hooks/useClickOutside';

const DeleteModal = (props) => {
  const { form, deleteModalOpen, setDeleteModalOpen } = props;
  const dispatch = useDispatch();

  // handle ClickOutside
  const divRef = useRef(null);
  useClickOutside(divRef, () => setDeleteModalOpen(false));

  const deleteCurruntForm = (e, form) => {
    e.preventDefault();

    dispatch(
      deleteForm({
        id: form?.id,
      })
    );
  };

  return (
    <>
      {deleteModalOpen && (
        <div className="fixed left-0 top-0 z-[99999] flex h-full min-h-screen w-full items-center justify-center bg-[rgba(34,33,45,0.85)] px-4 py-5">
          <div
            ref={divRef}
            className="relative max-h-full w-full max-w-[600px] overflow-y-auto rounded-xl bg-white pt-12 shadow-fb-seven md:pt-12"
          >
            <div>
              <div className="flex items-center px-8">
                <div className="mr-5.5 flex h-[66px] w-[66px] items-center justify-center rounded-lg bg-fb-red-light-6">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M34.8327 19.0003C34.8327 10.2558 27.7439 3.16699 18.9993 3.16699C10.2548 3.16699 3.16602 10.2558 3.16602 19.0003C3.16602 27.7448 10.2548 34.8337 18.9993 34.8337C27.7439 34.8337 34.8327 27.7448 34.8327 19.0003ZM18.9993 9.89616C19.6552 9.89616 20.1868 10.4278 20.1868 11.0837V20.5837C20.1868 21.2395 19.6552 21.7712 18.9993 21.7712C18.3435 21.7712 17.8118 21.2395 17.8118 20.5837V11.0837C17.8118 10.4278 18.3435 9.89616 18.9993 9.89616ZM18.9993 26.917C19.8738 26.917 20.5827 26.2081 20.5827 25.3337C20.5827 24.4592 19.8738 23.7503 18.9993 23.7503C18.1249 23.7503 17.416 24.4592 17.416 25.3337C17.416 26.2081 18.1249 26.917 18.9993 26.917Z"
                      fill="#E10E0E"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mx-auto mb-1.5 max-w-[420px] font-heading text-2xl font-bold leading-tight text-black">
                    Delete form
                  </h3>
                  <p className="text-base font-normal text-body-color">
                    Are you sure about that? this can&apos;t be undone
                  </p>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-end space-x-4 border-t border-stroke px-8 py-4.5">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex h-10 items-center rounded-3xl border-fb-stroke bg-fb-gray px-5 font-heading text-sm font-medium text-body-color duration-300 hover:bg-fb-stroke"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => deleteCurruntForm(e, form)}
                  className="flex h-10 items-center rounded-3xl bg-black px-5 font-heading text-sm font-medium text-white duration-300 hover:bg-black/90"
                >
                  Delete
                </button>
              </div>

              <div className="absolute right-5 top-5">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  type="button"
                  className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-body-color duration-300 hover:bg-fb-gray"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1993_14819)">
                      <path
                        d="M13.0037 11.468L18.3662 6.10547L19.898 7.6373L14.5355 12.9998L19.898 18.3623L18.3662 19.8941L13.0037 14.5316L7.64121 19.8941L6.10938 18.3623L11.4719 12.9998L6.10938 7.6373L7.64121 6.10547L13.0037 11.468Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1993_14819">
                        <rect width="26" height="26" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
