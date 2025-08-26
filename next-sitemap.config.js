const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2021-03-25',
  useCdn: true,
});

module.exports = {
  siteUrl: "https://formbold.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,

  exclude: ["/refund-policy", "/privacy-policy", "/account", "/forms"],

  additionalPaths: async (config) => {
    const result = []
    
    // Fetch all blog post slugs from Sanity
    const posts = await client.fetch(`*[_type == "blogPost"] { 'slug': slug.current }`);
    
    // Add each blog post URL to sitemap
    posts.forEach(post => {
      result.push({
        loc: `/blog/${post.slug}`,
        priority: 0.8,
        changefreq: 'daily'
      })
    });

    // Add blog index page
    result.push({
      loc: '/blog',
      priority: 0.8,
      changefreq: 'daily'
    });

    return result;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/account'],
      },
      {
        userAgent: '*',
        disallow: ['/account/*'],
      },
      {
        userAgent: '*',
        disallow: ['/share'],
      },
      {
        userAgent: '*',
        disallow: ['/share/*'],
      },
    ],
  },
}
