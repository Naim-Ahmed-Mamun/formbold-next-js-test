import Breadcrumb from "../../../../components/Common/Breadcrumb";
import IntegrationBox from "../../../../components/Integration/IntegrationBox";
import SectionTitleH1 from "../../../../components/SectionTitleH1";


const integrationsData = [
  {
    id: 1,
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M51 6H9C4.02944 6 0 10.0294 0 15V45C0 49.9706 4.02944 54 9 54H51C55.9706 54 60 49.9706 60 45V15C60 10.0294 55.9706 6 51 6Z"
          fill="#6A64F1"
        />
        <path
          d="M26.73 31.0248L0 13.5453C0 9.37817 3.35787 6 7.5 6H52.5C56.6421 6 60 9.37817 60 13.5453L33.27 31.0248C31.2816 32.3251 28.7184 32.3251 26.73 31.0248Z"
          fill="#B9B6FD"
        />
      </svg>
    ),
    title: "Email",
    subtitle: "From to email",
    desc: "Email address as notification and submission channel connected and turned on by default. So you will never miss a new submission! You can also turn off email notifications if needed from the dashboard.",
    path: "email",
  },
  {
    id: 2,
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1725_3980)">
          <g clipPath="url(#clip1_1725_3980)">
            <path
              d="M22.3125 31.5938C19.0313 31.5938 16.2188 34.4063 16.2188 37.6875V52.875C16.2188 56.1563 19.0313 58.9688 22.3125 58.9688C25.5938 58.9688 28.4063 56.1563 28.4063 52.875V37.6875C28.4063 34.2188 25.7813 31.5938 22.3125 31.5938Z"
              fill="#D81C57"
            />
            <path
              d="M0.9375 37.6875C0.9375 40.9688 3.75 43.7813 7.03125 43.7813C10.3125 43.7813 13.125 40.9688 13.125 37.6875V31.5938H7.125C3.75 31.5938 0.9375 34.2188 0.9375 37.6875Z"
              fill="#D81C57"
            />
            <path
              d="M22.3125 0.9375C19.0313 0.9375 16.2188 3.75 16.2188 7.03125C16.2188 10.3125 19.0313 13.125 22.3125 13.125H28.4063C28.4063 9.65625 28.4063 10.5 28.4063 7.03125C28.4063 3.75 25.7813 0.9375 22.3125 0.9375Z"
              fill="#34BFE9"
            />
            <path
              d="M7.03125 28.4063H22.3125C25.5938 28.4063 28.4063 25.5938 28.4063 22.3125C28.4063 19.0313 25.5938 16.2188 22.3125 16.2188H7.03125C3.75 16.2188 0.9375 19.0313 0.9375 22.3125C0.9375 25.5938 3.5625 28.4063 7.03125 28.4063Z"
              fill="#34BFE9"
            />
            <path
              d="M52.875 16.2188C49.5938 16.2188 46.7812 19.0313 46.7812 22.3125V28.4063H52.875C56.1562 28.4063 58.9688 25.5938 58.9688 22.3125C58.9688 19.0313 56.25 16.2188 52.875 16.2188Z"
              fill="#2CB07A"
            />
            <path
              d="M31.5938 7.03125V22.3125C31.5938 25.5937 34.4063 28.4062 37.6875 28.4062C40.9688 28.4062 43.7813 25.5937 43.7813 22.3125V7.03125C43.7813 3.75 40.9688 0.9375 37.6875 0.9375C34.2188 0.9375 31.5938 3.75 31.5938 7.03125Z"
              fill="#2CB07A"
            />
            <path
              d="M43.7813 52.9687C43.7813 49.6875 40.9688 46.875 37.6875 46.875H31.5938V52.9687C31.5938 56.25 34.4063 59.0625 37.6875 59.0625C40.9688 59.0625 43.7813 56.25 43.7813 52.9687Z"
              fill="#E4AC2C"
            />
            <path
              d="M52.9688 31.5938H37.6875C34.4063 31.5938 31.5938 34.4063 31.5938 37.6875C31.5938 40.9688 34.4063 43.7813 37.6875 43.7813H52.9688C56.25 43.7813 59.0625 40.9688 59.0625 37.6875C59.0625 34.2188 56.25 31.5938 52.9688 31.5938Z"
              fill="#E4AC2C"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1725_3980">
            <rect width="60" height="60" fill="white" />
          </clipPath>
          <clipPath id="clip1_1725_3980">
            <rect width="60" height="60" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Slack",
    subtitle: "From to slack",
    desc: "This will allow you to connect your Slack channel with your specific forms, when a form submission is received you will also receive submission data with notification via Slack in real-time.",
    path: "slack",
  },
  {
    id: 3,
    icon: (
      <svg
        width={45}
        height={60}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="a"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={44}
          height={60}
        >
          <path
            d="M27.239.858H4.72A3.986 3.986 0 0 0 .746 4.832v50.336a3.986 3.986 0 0 0 3.974 3.974h34.44a3.986 3.986 0 0 0 3.974-3.974V16.754L27.24.858Z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#a)">
          <path
            d="M27.239.858H4.72A3.986 3.986 0 0 0 .746 4.832v50.336a3.986 3.986 0 0 0 3.974 3.974h34.44a3.986 3.986 0 0 0 3.974-3.974V16.754l-9.272-6.623L27.239.858Z"
            fill="#0F9D58"
          />
        </g>
        <mask
          id="b"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={44}
          height={60}
        >
          <path
            d="M27.239.858H4.72A3.986 3.986 0 0 0 .746 4.832v50.336a3.986 3.986 0 0 0 3.974 3.974h34.44a3.986 3.986 0 0 0 3.974-3.974V16.754L27.24.858Z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#b)">
          <path
            d="M11.343 29.338v19.207h21.194V29.338H11.343Zm9.273 16.557h-6.623v-3.311h6.623v3.311Zm0-5.298h-6.623v-3.312h6.623v3.312Zm0-5.299h-6.623v-3.311h6.623v3.311Zm9.272 10.597h-6.623v-3.311h6.623v3.311Zm0-5.298h-6.623v-3.312h6.623v3.312Zm0-5.299h-6.623v-3.311h6.623v3.311Z"
            fill="#F1F1F1"
          />
        </g>
        <mask
          id="c"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={44}
          height={60}
        >
          <path
            d="M27.239.858H4.72A3.986 3.986 0 0 0 .746 4.832v50.336a3.986 3.986 0 0 0 3.974 3.974h34.44a3.986 3.986 0 0 0 3.974-3.974V16.754L27.24.858Z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#c)">
          <path
            d="m28.401 15.591 14.733 14.73V16.754L28.401 15.59Z"
            fill="url(#d)"
          />
        </g>
        <mask
          id="e"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={44}
          height={60}
        >
          <path
            d="M27.239.858H4.72A3.986 3.986 0 0 0 .746 4.832v50.336a3.986 3.986 0 0 0 3.974 3.974h34.44a3.986 3.986 0 0 0 3.974-3.974V16.754L27.24.858Z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#e)">
          <path
            d="M27.239.858V12.78a3.973 3.973 0 0 0 3.974 3.974h11.921L27.24.858Z"
            fill="#87CEAC"
          />
        </g>
        <mask
          id="f"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={44}
          height={60}
        >
          <path
            d="M27.239.858H4.72A3.986 3.986 0 0 0 .746 4.832v50.336a3.986 3.986 0 0 0 3.974 3.974h34.44a3.986 3.986 0 0 0 3.974-3.974V16.754L27.24.858Z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#f)">
          <path
            d="M4.72.858A3.986 3.986 0 0 0 .746 4.832v.331A3.986 3.986 0 0 1 4.72 1.19H27.24V.86H4.72Z"
            fill="#fff"
            fillOpacity={0.2}
          />
          <path
            d="M39.16 58.81H4.72a3.986 3.986 0 0 1-3.974-3.973v.33a3.986 3.986 0 0 0 3.974 3.975h34.44a3.986 3.986 0 0 0 3.974-3.974v-.331a3.986 3.986 0 0 1-3.974 3.974Z"
            fill="#263238"
            fillOpacity={0.2}
          />
          <path
            d="M31.213 16.754a3.973 3.973 0 0 1-3.974-3.974v.331a3.973 3.973 0 0 0 3.974 3.974h11.921v-.331H31.213Z"
            fill="#263238"
            fillOpacity={0.1}
          />
        </g>
        <defs>
          <linearGradient
            id="d"
            x1={35.769}
            y1={16.856}
            x2={35.769}
            y2={30.323}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#263238" stopOpacity={0.2} />
            <stop offset={1} stopColor="#263238" stopOpacity={0.02} />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Google Sheet",
    subtitle: "From to google sheet",
    desc: "This will allow you to Connect Google Sheet with your form and get submission data directly inserted into your Sheet file. You can also export your Sheet data to different formats depending on needs.",
    path: "google-sheet",
  },
  {
    id: 4,
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1725_4118)">
          <g filter="url(#filter0_d_1725_4118)">
            <rect width="60" height="60" rx="30" fill="#E91E63" />
            <path
              d="M29.9969 15.7705C26.2586 15.7705 23.2143 18.8147 23.2143 22.5531C23.2143 24.784 24.3218 26.7419 25.991 27.9792L22.642 33.5113C22.6156 33.5033 22.5864 33.498 22.5573 33.4901C21.8578 33.302 21.1292 33.4053 20.5013 33.7656C19.2057 34.5154 18.7579 36.1793 19.5051 37.4749C20.0058 38.3439 20.9199 38.8314 21.8578 38.8314C22.3188 38.8314 22.7878 38.7175 23.2143 38.4711C23.8422 38.1081 24.298 37.5172 24.4861 36.8178C24.6742 36.1183 24.5735 35.3897 24.2105 34.7618C24.0966 34.5658 23.9403 34.3909 23.7866 34.2319L27.4747 28.17L27.835 27.5765L27.2415 27.2374C25.6439 26.2941 24.5709 24.5482 24.5709 22.5531C24.5709 19.5486 26.9925 17.127 29.9969 17.127C33.0014 17.127 35.423 19.5486 35.423 22.5531C35.423 23.1122 35.3462 23.6367 35.1899 24.1428L36.4828 24.5455C36.6789 23.9123 36.7795 23.2473 36.7795 22.5531C36.7795 18.8147 33.7353 15.7705 29.9969 15.7705ZM29.9969 19.8401C28.5 19.8401 27.2839 21.0562 27.2839 22.5531C27.2839 24.0501 28.5 25.2662 29.9969 25.2662C30.2221 25.2662 30.4447 25.2344 30.654 25.1814L33.9181 31.095L34.2361 31.6884L34.8507 31.3705C35.627 30.9413 36.5067 30.6922 37.4578 30.6922C40.4623 30.6922 42.8839 33.1138 42.8839 36.1183C42.8839 39.1228 40.4623 41.5444 37.4578 41.5444C35.9927 41.5444 34.6626 40.9589 33.685 40.0183L32.7524 40.9933C33.9711 42.167 35.635 42.9009 37.4578 42.9009C41.1962 42.9009 44.2404 39.8567 44.2404 36.1183C44.2404 32.3799 41.1962 29.3357 37.4578 29.3357C36.5173 29.3357 35.6456 29.5821 34.8295 29.9292L31.841 24.5243C32.3709 24.0289 32.71 23.3347 32.71 22.5531C32.71 21.0562 31.4939 19.8401 29.9969 19.8401ZM20.2045 29.5265C17.2504 30.263 15.0752 32.9469 15.0752 36.1183C15.0752 39.8567 18.1194 42.9009 21.8578 42.9009C25.3551 42.9009 28.1556 40.2011 28.5132 36.7966H34.8507C35.1528 37.965 36.1967 38.8314 37.4578 38.8314C38.9548 38.8314 40.1709 37.6153 40.1709 36.1183C40.1709 34.6214 38.9548 33.4053 37.4578 33.4053C36.1967 33.4053 35.1528 34.2717 34.8507 35.4401H27.2839V36.1183C27.2839 39.1228 24.8623 41.5444 21.8578 41.5444C18.8533 41.5444 16.4317 39.1228 16.4317 36.1183C16.4317 33.5696 18.1857 31.45 20.5437 30.8618L20.2045 29.5265Z"
              fill="white"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_1725_4118"
            x="-13"
            y="-9"
            width="86"
            height="86"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="6.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1725_4118"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1725_4118"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_1725_4118">
            <rect width="60" height="60" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Webhooks",
    subtitle: "From to webhook",
    desc: "Webhooks allow you to receive real-time HTTP notifications of your form submissions, you can connect the form via webhooks with Zapier, n8n, Integromat, Pabbly, IFTT, and similar services to automate specific tasks.",
    path: "webhooks",
  },
  {
    id: 5,
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1725_4135)">
          <g filter="url(#filter0_d_1725_4135)">
            <rect
              width="60"
              height="60"
              rx="30"
              fill="url(#paint0_linear_1725_4135)"
            />
            <path
              d="M43.812 20.5024L39.5973 40.2306C39.2835 41.6206 38.4764 41.9344 37.3107 41.3067L30.9887 36.6437L27.8949 39.6029C27.5811 39.9168 27.2672 40.2306 26.5498 40.2306L27.043 33.7293L38.8351 23.0132C39.3283 22.52 38.7006 22.3407 38.0729 22.7442L23.4112 31.9806L17.0892 30.0526C15.6993 29.6043 15.6993 28.6627 17.4031 28.035L41.9737 18.4847C43.1843 18.126 44.2155 18.7537 43.812 20.5024Z"
              fill="white"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_1725_4135"
            x="-13"
            y="-9"
            width="86"
            height="86"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="6.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1725_4135"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1725_4135"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1725_4135"
            x1="0"
            y1="0"
            x2="60"
            y2="60"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1D91C2" />
            <stop offset="1" stopColor="#1FADF5" />
          </linearGradient>
          <clipPath id="clip0_1725_4135">
            <rect width="60" height="60" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Telegram",
    subtitle: "From to telegram",
    desc: "Telegram integration will allow you to receive submission notifications via Telegram with message data, Telegram is the best solution for personal messaging with a great focus on privacy and encryption.",
    path: "telegram",
  },
  {
    id: 6,
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1725_4092)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.2433 10.6781C13.0999 12.1865 13.7963 12.0714 17.2827 11.8387L50.1501 9.86522C50.8472 9.86522 50.2675 9.16979 50.035 9.05424L44.5765 5.10811C43.5305 4.29608 42.1371 3.36615 39.4664 3.59878L7.64086 5.92002C6.48018 6.03511 6.24837 6.61545 6.71058 7.08059L11.2433 10.6781ZM13.2166 18.3378V52.92C13.2166 54.7786 14.1453 55.4739 16.2357 55.3589L52.357 53.2688C54.4484 53.1538 54.6814 51.8755 54.6814 50.3657V16.0155C54.6814 14.5082 54.1015 13.6953 52.8213 13.8113L15.0742 16.0155C13.6811 16.1326 13.2165 16.8294 13.2165 18.3378H13.2166ZM48.8754 20.1929C49.1069 21.2383 48.8754 22.2829 47.8279 22.4004L46.0876 22.7472V48.278C44.5765 49.0901 43.1831 49.5545 42.0219 49.5545C40.1629 49.5545 39.6973 48.9738 38.3048 47.234L26.9206 29.3623V46.6537L30.523 47.4665C30.523 47.4665 30.523 49.5545 27.6166 49.5545L19.6043 50.0192C19.3716 49.5545 19.6043 48.3949 20.4171 48.1627L22.5079 47.5832V24.7206L19.6049 24.488C19.372 23.4425 19.9519 21.9351 21.5791 21.8181L30.1745 21.2387L42.0219 39.3431V23.3274L39.0012 22.9808C38.7694 21.7027 39.6973 20.7746 40.8589 20.6595L48.8754 20.1929ZM4.96873 2.78686L38.0724 0.349009C42.1376 0.000358418 43.1835 0.233927 45.7386 2.08991L56.3057 9.51703C58.0493 10.7942 58.6304 11.1419 58.6304 12.5342V53.2688C58.6304 55.8217 57.7004 57.3315 54.449 57.5625L16.0057 59.884C13.5649 60.0004 12.4033 59.6525 11.125 58.0268L3.34326 47.9304C1.94901 46.0718 1.36914 44.6814 1.36914 43.0548V6.84714C1.36914 4.75946 2.29942 3.01797 4.96873 2.78686Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_1725_4092">
            <rect width="60" height="60" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Notion",
    subtitle: "From to notion",
    desc: "You can connect the FormBold form end-point with a specific Notion file. Just make sure you mapped the form with the file properly (not the database) and provided the required permissions.",
    path: "notion",
  },
];

export default function IntegrationsMain() {
  return (
    <>
      <section className="pt-24 lg:pt-[96px]">
        <div className="bg-fb-gray pb-14 pt-11 md:pb-[100px]">
          <Breadcrumb pageTitle="Integration" />

          <div className="container">
            <SectionTitleH1
              title="Apps and Integrations"
              paragraph="FormBold offers tons of third-party apps and integrations with your form end-point so that you can connect with your forms as notification channels, all the integrations will provide update in real-time and might need specific permission."
              center
              paraWidth="715"
            />

            <div className="grid grid-cols-1 gap-x-7.5 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
              {integrationsData.map((integration) => {
                return (
                  <IntegrationBox
                    key={integration.id}
                    integration={integration}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
