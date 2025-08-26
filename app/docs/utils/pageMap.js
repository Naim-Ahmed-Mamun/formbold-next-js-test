// pageMap.js

/**
 * Fallback page structure and routing used when dynamic GitHub content is unavailable.
 */

// Debugging toggle
const DEBUG_MODE = true;

/**
 * Default file paths for fallback rendering.
 */
const defaultFilePaths = [
  'index.mdx',
  'settings.mdx',
  'spam.mdx',
  'apps.mdx',
  'examples.mdx',
  'webhooks.mdx',
  'links.mdx'
];

/**
 * Route to file path mapping.
 */
const defaultMdxPages = {
  index: 'index.mdx',
  settings: 'settings.mdx',
  spam: 'spam.mdx',
  apps: 'apps.mdx',
  examples: 'examples.mdx',
  webhooks: 'webhooks.mdx',
  links: 'links.mdx'
};

/**
 * Sidebar structure with titles.
 */
const defaultSidebar = {
  index: {
    title: 'Quick Start'
  },
  settings: {
    title: 'Form Settings'
  },
  spam: {
    title: 'Spam Protection'
  },
  apps: {
    title: 'Connecting Apps'
  },
  examples: {
    title: 'Code Examples'
  },
  webhooks: {
    title: 'Webhooks'
  },
  links: {
    title: 'Useful Links'
  }
};

/**
 * Basic page map for navigation and fallback.
 */
let pageMap = {
  name: 'docs',
  route: '/docs',
  title: 'Documentation',
  frontMatter: {},
  // This is the default sidebar structure
  children: [
    {
      name: 'settings',
      route: '/docs/settings',
      title: 'Form Settings',
      frontMatter: {}
    },
    {
      name: 'spam',
      route: '/docs/spam',
      title: 'Spam Protection',
      frontMatter: {}
    },
    {
      name: 'apps',
      route: '/docs/apps',
      title: 'Connecting Apps',
      frontMatter: {}
    },
    {
      name: 'examples',
      route: '/docs/examples',
      title: 'Code Examples',
      frontMatter: {}
    },
    {
      name: 'webhooks',
      route: '/docs/webhooks',
      title: 'Webhooks',
      frontMatter: {}
    },
    {
      name: 'links',
      route: '/docs/links',
      title: 'Useful Links',
      frontMatter: {}
    }
  ]
};

// Export for CommonJS
module.exports = {
  DEBUG_MODE,
  defaultFilePaths,
  defaultMdxPages,
  defaultSidebar,
  pageMap
};
