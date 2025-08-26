import { notFound } from 'next/navigation';
import { useMDXComponents as getMDXComponents } from '../../../mdx-components';
const { DEBUG_MODE, defaultMdxPages, defaultSidebar } = require('../utils/pageMap');

import { compileMdx } from 'nextra/compile';
import { Callout, Tabs } from 'nextra/components';
import { evaluate } from 'nextra/evaluate';

import { siteURL } from '../../../services/config';
import { fetchFromGitHub, GITHUB_RAW_BASE } from '../utils/github';

const { wrapper: Wrapper, ...components } = getMDXComponents({
  $Tabs: Tabs,
  Callout
});

// Cache for MDX content to avoid repeated GitHub fetches and compilation
const contentCache = new Map();

// Convert relative image paths to GitHub raw URLs
function convertRelativeImagePaths(mdContent, filePath) {
  const baseDir = filePath.split('/').slice(0, -1).join('/');
  return mdContent.replace(/!\[([^\]]*)\]\((?!http)([^)]+)\)/g, (_, alt, src) => {
    const cleanedSrc = src.replace(/^.\//, ''); // remove ./ if present
    const fullUrl = `${GITHUB_RAW_BASE}${baseDir}/${cleanedSrc}`;
    return `![${alt}](${fullUrl})`;
  });
}

// Create a fallback content for files that don't exist
function createFallbackContent(route, filePath) {
  const title = defaultSidebar[route]?.title || route.charAt(0).toUpperCase() + route.slice(1).replace(/-/g, ' ');
  
  return `# ${title}

This is a placeholder documentation page. The actual documentation will be available soon.

## Getting Started

Documentation content will appear here once it's available.

## More Information

For more details, visit [FormBold](https://formbold.com).
`;
}

// Set a reasonable timeout for fetch operations
const FETCH_TIMEOUT = 5000; // 5 seconds

// Fetch with timeout function
async function fetchWithTimeout(url, options, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  });
  
  clearTimeout(id);
  return response;
}

// Fetch MDX content either from GitHub or fallback to local
async function fetchContent(route, filePath) {
  // Check cache first
  const cacheKey = `${route}:${filePath}`;
  if (contentCache.has(cacheKey)) {
    if (DEBUG_MODE) {
      console.log(`🔄 Using cached content for ${filePath}`);
    }
    return contentCache.get(cacheKey);
  }

  let data;
  let source = 'github';

  try {
    data = await fetchFromGitHub(filePath);
    if (DEBUG_MODE) {
      console.log('✅ Successfully fetched content from GitHub');
    }

    // Convert relative image paths for GitHub content
    data = convertRelativeImagePaths(data, filePath);

  } catch (githubError) {
    if (DEBUG_MODE) {
      console.error(`❌ Error fetching from GitHub: ${githubError.message}`);
    }

    source = 'local';
    const localUrl = `/docs-content/${filePath}`;

    if (DEBUG_MODE) {
      console.log(`📡 Falling back to local: ${localUrl}`);
    }

    try {
      // Use next/cache tags for better revalidation
      const localResponse = await fetchWithTimeout(
        localUrl, 
        { 
          cache: 'no-store',
          next: { tags: ['docs'] }
        }
      );

      if (!localResponse.ok) {
        throw new Error(`Local fallback returned ${localResponse.status}`);
      }

      data = await localResponse.text();
      if (DEBUG_MODE) {
        console.log(`✅ Successfully loaded content from local`);
      }

    } catch (localError) {
      if (DEBUG_MODE) {
        console.error(`❌ Local fallback error: ${localError.message}. Generating placeholder content.`);
      }
      
      // If both GitHub and local fail, use generated placeholder content
      source = 'generated';
      data = createFallbackContent(route, filePath);
      
      if (DEBUG_MODE) {
        console.log(`⚠️ Using generated placeholder content for ${filePath}`);
      }
    }
  }

  const result = { data, source };
  
  // Store in cache
  contentCache.set(cacheKey, result);
  
  return result;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const route = !slug || slug.length === 0 ? 'index' : slug.join('/');

  let title = 'Documentation';

  if (route === 'index' && defaultMdxPages?.index?.title) {
    title = defaultMdxPages.index.title;
  } else if (defaultMdxPages?.[route]?.title) {
    title = defaultMdxPages[route].title;
  } else {
    const parts = route.split('/');
    if (parts.length > 1) {
      const section = parts[0];
      const page = parts[1];
      title = defaultMdxPages?.[section]?.items?.[page]?.title || 'Documentation';
    }
  }

  return {
    title: `${title} - FormBold Docs`,
    description: `FormBold documentation - ${title}`,
    alternates: {
      canonical: `${siteURL}/docs${route === 'index' ? '' : '/'+route}`,
    },
    openGraph: {
      type: 'website',
      url: `${siteURL}/docs${route === 'index' ? '' : '/'+route}`,
      title: `FormBold Docs - ${title}`,
      description: `FormBold documentation - ${title}`,
      images: [
        {
          url: 'https://cdn.formbold.com/formbold.jpg',
          width: 1200,
          height: 630,
          alt: 'FormBold Docs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      url: `${siteURL}/docs${route === 'index' ? '' : '/'+route}`,
      title: `FormBold Docs - ${title}`,
      description: `FormBold documentation - ${title}`,
      images: ['https://cdn.formbold.com/formbold.jpg'],
    },
  };
}

// Cache for MDX compilation results
const compilationCache = new Map();

// Increase revalidation time to reduce API calls
export const revalidate = 86400; // 24 hours (1 day)

// This now returns a more complete set of static paths with fallback options
export async function generateStaticParams() {
  const paths = [{ slug: [] }]; // Always include the index page

  try {
    // Add all known static routes from defaultMdxPages
    Object.keys(defaultMdxPages)
      .filter(route => route !== 'index')
      .forEach(route => {
        paths.push({ slug: route.split('/') });
      });

    // Try to fetch sidebar to get dynamic routes too (if possible)
    try {
      const sidebar = await fetchSidebarFromGitHub();
      if (sidebar) {
        const additionalPaths = extractFilePathsFromSidebar(sidebar)
          .map(path => path.replace(/\.mdx?$/, '')) // Remove file extension
          .filter(route => route !== 'index' && !defaultMdxPages[route]) // Avoid duplicates
          .map(route => ({ slug: route.split('/') }));
        
        paths.push(...additionalPaths);
      }
    } catch (sidebarError) {
      if (DEBUG_MODE) {
        console.warn('⚠️ Could not get additional paths from sidebar:', sidebarError.message);
      }
    }

    return paths;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('❌ Error generating static params:', error);
    }
    // Fallback to just returning the default routes
    return [{ slug: [] }];
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  const route = !slug || slug.length === 0 ? 'index' : slug.join('/');

  const filePath = defaultMdxPages[route];

  if (!filePath) {
    notFound();
  }

  try {
    const cacheKey = `compile:${route}:${filePath}`;
    
    // Check if we have compiled content in the cache
    if (compilationCache.has(cacheKey)) {
      const cached = compilationCache.get(cacheKey);
      if (DEBUG_MODE) {
        console.log(`🔄 Using cached compiled content for ${filePath}`);
      }
      
      return (
        <div>
          <Wrapper toc={cached.toc} metadata={cached.metadata} >
            <cached.MDXContent />
          </Wrapper>
        </div>
      );
    }
    
    // Fetch and compile content with error handling
    const { data } = await fetchContent(route, filePath);
    const rawJs = await compileMdx(data, { filePath });
    const { default: MDXContent, toc, metadata } = evaluate(rawJs, components);
    
    // Cache the compiled content
    compilationCache.set(cacheKey, { MDXContent, toc, metadata });

    return (
      <div>
        <Wrapper toc={toc} metadata={metadata} >
          <MDXContent />
        </Wrapper>
      </div>
    );
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('❌ Error rendering page:', error);
    }
    
    // Provide a simple error fallback instead of 404 to improve user experience
    return (
      <div className="error-fallback">
        <h1>Documentation Temporarily Unavailable</h1>
        <p>We&apos;re experiencing some technical difficulties loading this documentation page. Please try again in a few moments.</p>
        <p>If the problem persists, please <a href="/contact">contact support</a>.</p>
      </div>
    );
  }
}
