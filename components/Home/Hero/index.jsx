import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Highlighter from "./Highlighter";
import VideoLazyLoad from "./VideoLazyLoad";

const HeroMain = () => {
  const user = useSelector((state) => state.auth?.signIn);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="hero-section overflow-hidden pt-14 sm:pt-20 lg:pt-[90px]">
      <div className="lg:container">
        <Highlighter>
          <div className="box-hover relative z-10 overflow-hidden bg-fb-gray/10 px-7 pb-[164px] pt-[70px] md:px-10 lg:rounded-[22px]">
            <div className="relative z-50 mx-auto w-full max-w-[752px] text-center">
              <span className="mb-5 block font-heading text-base font-bold text-primary">
                Simple, Powerful and Free!
              </span>
              <h1 className="mb-7 text-3xl font-black !leading-snug text-black sm:text-4xl md:text-[40px]">
              Complete Form Solution for Websites
              </h1>
              <p className="mb-9 text-base font-normal text-body-color">
              Free web form solution that includes form API, backend, and builder. Receive website form submissions directly to your inbox, Slack, Sheet, Notion, Telegram and more - all without the need for server or coding. FormBold seamlessly works with all types of static and dynamic sites including HTML, React, Next.js, and JAMstack. Also our easy-to-use online form builder allows you to effortlessly build, publicly share, and embed forms on your desired website.
              </p>
              <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                <Link
                  href={mounted ? (user ? "/account/dashboard" : "/auth/login") : "#"}
                  className="flex h-12 items-center justify-center rounded-full bg-primary px-9 font-heading text-base font-medium text-white duration-300 hover:bg-fb-primary-hover sm:inline-flex"
                >
                    Create a Form
                </Link>
                <Link href="/#steps" className="inline-flex items-center justify-center rounded-full border-2 border-transparent bg-fb-gray px-[22px] py-2 text-sm font-medium text-black">
                    Learn How →
                </Link>
              </div>
            </div>

            <div className="absolute left-0 top-0 h-full w-full rounded-[22px] bg-[url(/hero/background.svg)] bg-cover bg-center"></div>
          </div>
        </Highlighter>

        <div className="relative z-20 mx-auto -mt-24 aspect-[670/364] w-full max-w-[calc(100%-40px)] rounded-xl border border-fb-stroke bg-white shadow-fb-four md:mx-auto md:max-w-[670px]">
          <VideoLazyLoad />
          {/* <video
            className="absolute left-0 top-0 h-full w-full rounded-xl object-cover object-center"
            autoPlay={true}
            muted
            controls
          >
            <source src="/video/formbold.mp4" type="video/mp4" />
          </video> */}
        </div>
      </div>
    </section>
  );
};

export default HeroMain;
