import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
  contentDirBasePath: '/docs',
})

// Export the final Next.js config with Nextra included
export default withNextra({
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'profile-formbold.s3.nl-ams.scw.cloud',
      },
      {
        protocol: 'https',
        hostname: 'whitelabel.s3.nl-ams.scw.cloud',
      },
    ],
  },
  redirects: async () => [
    {
      source: '/forms',
      destination: 'https://formbold.com/builder',
      permanent: true,
    },
  ],
})

