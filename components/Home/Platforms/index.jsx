import React from "react";
import SectionTitle from "../../SectionTitle";
import { frameworks, platforms } from "./platformsData";

export default function Platforms() {
  return (
    <section className="relative z-10 pt-14 md:pt-[120px]">
      <div className="sm:container">
        <div className="w-full px-4 sm:px-0">
          <SectionTitle
            title="Supports and Works with All Hosting Platforms and Frameworks"
            titleWidth="820"
            center
            paragraph="All you need to paste the form end-point URL and follow the framework conventions and it does not matter where you hosted the site or form"
            paraWidth="690"
            margin="mb-14"
          />
        </div>

        <div className="relative z-10 overflow-hidden px-6 py-12 sm:rounded-[22px] sm:px-8 md:px-12">
          <div
            className="absolute left-0 top-0 h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(68.36% 68.36% at 50.00% 50.00%, rgba(247, 249, 252, 0.00) 0%, #F7F9FC 100%)",
            }}
          ></div>
          <div className="-mx-4 mb-16 flex flex-wrap items-center justify-center">
            {frameworks.map((framework, id) => (
              <Tooltip framework={framework} key={id} />
            ))}
            <div className="w-auto self-end px-4">
              <div className="group relative mb-5 flex items-center justify-center">
                <span className="text-xl font-semibold text-black opacity-30 group-hover:opacity-100">
                  And More...
                </span>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap items-center justify-center">
            {platforms.map((framework, id) => (
              <Tooltip framework={framework} key={id} />
            ))}
            <div className="w-auto self-end px-4">
              <div className="group relative mb-5 flex items-center justify-center">
                <span className="text-xl font-semibold text-black opacity-30 group-hover:opacity-100">
                  And More...
                </span>
              </div>
            </div>
          </div>

          <DottedShape />
        </div>
      </div>
    </section>
  );
}

const Tooltip = ({ framework }) => {
  const { icon, title } = framework;

  return (
    <div className="w-auto px-4">
      <div className="group relative mb-5 flex items-center justify-center">
        <span className="text-black opacity-30 transition-all group-hover:opacity-100">
          {icon}
        </span>
        <span className="absolute -top-11 left-1/2 z-20 hidden h-8 w-auto -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-md bg-white px-3.5 text-xs font-medium text-black shadow-[0px_5px_12px_0px_rgba(84,87,118,0.08)] group-hover:inline-flex sm:text-sm">
          <span className="absolute -bottom-1 left-0 right-0 mx-auto block h-3 w-3 rotate-45 rounded-sm bg-white"></span>
          {title}
        </span>
      </div>
    </div>
  );
};

const DottedShape = () => {
  return (
    <div className="absolute left-0 top-0 -z-10 h-full w-full opacity-50">
      <svg
        width="1170"
        height="324"
        viewBox="0 0 1170 324"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-74 477L-73.9999 -153L-72.9999 -153L-73 477H-74Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-41 477L-40.9999 -153L-39.9999 -153L-40 477H-41Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-7.99992 477L-7.99989 -153L-6.99989 -153L-6.99992 477H-7.99992Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.0001 477L25.0001 -153L26.0001 -153L26.0001 477H25.0001Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M58.0001 477L58.0002 -153L59.0002 -153L59.0001 477H58.0001Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M91.0002 477L91.0002 -153L92.0002 -153L92.0002 477H91.0002Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M124 477L124 -153L125 -153L125 477H124Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M157 477L157 -153L158 -153L158 477H157Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M190 477L190 -153L191 -153L191 477H190Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M223 477L223 -153L224 -153L224 477H223Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M256 477L256 -153L257 -153L257 477H256Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M289 477L289 -153L290 -153L290 477H289Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M322 477L322 -153L323 -153L323 477H322Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M355 477L355 -153L356 -153L356 477H355Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M388 477L388 -153L389 -153L389 477H388Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M421 477V-153L422 -153V477H421Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M454 477L454 -153L455 -153L455 477H454Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M487 477L487 -153L488 -153L488 477H487Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M520 477L520 -153L521 -153L521 477H520Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M553 477L553 -153L554 -153L554 477H553Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M586 477L586 -153L587 -153L587 477H586Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M619 477L619 -153L620 -153L620 477H619Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M652 477L652 -153L653 -153L653 477H652Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M685 477L685 -153L686 -153L686 477H685Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M718 477L718 -153L719 -153L719 477H718Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M751 477L751 -153L752 -153L752 477H751Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M784 477L784 -153L785 -153L785 477H784Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M817 477L817 -153L818 -153L818 477H817Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M850 477V-153L851 -153V477H850Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M883 477V-153L884 -153V477H883Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M916 477V-153L917 -153V477H916Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M949 477V-153L950 -153V477H949Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M982 477V-153L983 -153V477H982Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1015 477V-153L1016 -153V477H1015Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1048 477V-153L1049 -153V477H1048Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1081 477V-153L1082 -153V477H1081Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1114 477V-153L1115 -153V477H1114Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1147 477V-153L1148 -153V477H1147Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1180 477V-153L1181 -153V477H1180Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1213 477V-153L1214 -153V477H1213Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1246 477V-153L1247 -153V477H1246Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 459.001H-98V458.001H1269V459.001Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 426.001H-98V425.001H1269V426.001Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 393H-98V392H1269V393Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 360H-98V359H1269V360Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 327H-98V326H1269V327Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 294H-98V293H1269V294Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 261H-98V260H1269V261Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 228H-98V227H1269V228Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 195H-98V194H1269V195Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 162H-98V161H1269V162Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 129H-98V128H1269V129Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 96H-98V95H1269V96Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 63H-98V62H1269V63Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 30H-98V29H1269V30Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 -3H-98V-4H1269V-3Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 -36H-98V-37H1269V-36Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 -69H-98V-70H1269V-69Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 -102H-98V-103H1269V-102Z"
          fill="#ECEFF9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1269 -135H-98V-136H1269V-135Z"
          fill="#ECEFF9"
        />
      </svg>
    </div>
  );
};
