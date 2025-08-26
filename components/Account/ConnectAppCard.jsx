
const ConnectAppCard = ({ appItem, onClickCallBack, onDisconnectClickCallback }) => {
  return (
    appItem && (
      <>
        <div className="flex h-full items-center rounded-lg bg-white py-[18px] pl-[22px] pr-10 shadow-fb-one">
          <div className="mr-6 flex h-[70px] aspect-square w-[70px] items-center justify-center rounded-full border-fb-gray-2 bg-fb-gray">{appItem?.icon}</div>
          <div>
            <h4 className="mb-2.5 text-lg font-bold text-black">{appItem?.title}</h4>
            <div className="flex items-center space-x-3">
              {appItem?.connected ? (
                <>
                  <button className="inline-flex h-[30px] items-center justify-center rounded-md border border-[#E9FBF0] bg-[#E9FBF0] px-3.5 text-sm font-medium text-fb-green transition-all duration-300 hover:border-primary hover:text-primary">
                    Connected
                  </button>
                  <button
                    onClick={(e) => onDisconnectClickCallback(e)}
                    className="inline-flex h-[30px] items-center justify-center rounded-md border border-stroke px-3.5 text-sm font-medium text-black transition-all duration-300 hover:border-primary hover:text-primary"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={(e) => onClickCallBack(e)}
                  className="inline-flex h-[30px] items-center justify-center rounded-md border border-stroke px-3.5 text-sm font-medium text-body-color transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ConnectAppCard;
