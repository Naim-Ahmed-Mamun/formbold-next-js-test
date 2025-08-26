
export default function Newsletter() {
  return (
    <>
      <div className="-mx-4 flex flex-wrap py-10">
        <div className="w-full px-4 lg:w-1/2">
          <div className="mb-8 text-center lg:mb-0 lg:text-left">
            <h2 className="mb-2.5 text-2xl font-bold text-black">
              Stay in the loop.
            </h2>
            <p className="text-sm text-body-color">
              We’ll send you a nice letter once per week, No spam.
            </p>
          </div>
        </div>

        <div className="w-full px-4 lg:w-1/2">
          <div className="flex justify-center lg:justify-end">
            <form className="relative flex w-full max-w-[452px] items-center rounded-full">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="flex h-[52px] w-full items-center rounded-full border border-fb-gray-4 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:bg-fb-gray focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:bg-fb-gray hover:shadow-inputHover"
              />
              <button className="absolute right-0 top-0 h-full w-[124px] rounded-r-full bg-primary text-center font-heading text-base font-medium text-white duration-300 hover:bg-fb-primary-hover">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
