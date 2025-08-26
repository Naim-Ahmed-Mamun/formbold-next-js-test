const Offer = ({ text, Icon, isActive, isChecked, offer }) => {
  return (
    <p
      className={`flex text-sm ${isChecked ? "text-black" : "text-body-color"}`}
    >
      <span className="group relative pr-2">
        <span>{Icon}</span>
        {offer?.isWarning && (
          <span className="absolute -top-[72px] left-1/2 z-10 hidden w-[188px] -translate-x-1/2 rounded-md bg-black px-3.5 py-2 text-center text-xs text-white group-hover:block">
            You have to upgrade to your plan to enjoy PRO features
            <span className="absolute -bottom-[7px] left-0 right-0 mx-auto flex justify-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
              >
                <path d="M6 7L0 1.17772e-06L12 0L6 7Z" fill="#0E0B3D" />
              </svg>
            </span>
          </span>
        )}
      </span>
      {text}
    </p>
  );
};

export default Offer;
