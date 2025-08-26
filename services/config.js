const ImageUrlBuilder = require("@sanity/image-url");
module.exports = {
  siteURL: process.env.NEXT_PUBLIC_SITE_URL,
  siteBackendBaseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
  sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  sanityDocsPorjectId: process.env.NEXT_PUBLIC_SANITY_DOCS_PROJECT_ID,
  imageUrlBuilder: ImageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
  }),
  docsImageUrlBuilder: ImageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_DOCS_PROJECT_ID,
    dataset: "production",
  }),
  paddleVendorId: process.env.NEXT_PADDLE_VENDOR_ID,
  paddleVendorAuthCode: process.env.NEXT_PADDLE_VENDOR_AUTH_CODE,
  paddleEnvironmentSandbox: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT_SANDBOX,
  googleClientId: process.env.NEXT_GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
  githubClientId: process.env.NEXT_GITHUB_CLIENT_ID,
  githubClientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET,
  telegramBotName: process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME,
};

