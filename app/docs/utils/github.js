/**
 * GitHub utility functions for fetching documentation and sidebar from GitHub repositories
 */

// Define constants for GitHub API and raw content URLs
export const GITHUB_API_BASE = 'https://api.github.com';

const repoOwner = process.env.GITHUB_REPO_OWNER
const repoName = process.env.GITHUB_REPO_NAME
const repoBranch = process.env.GITHUB_REPO_BRANCH


export const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${repoBranch}/`;

// For authenticated requests (optional, increases rate limits)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

// Debug mode flag
const DEBUG_MODE = process.env.NODE_ENV === 'development';

// Cache for GitHub API responses
const githubCache = new Map();

// Set a reasonable timeout for fetch operations
const FETCH_TIMEOUT = 5000; // 5 seconds

/**
 * Fetches with a timeout to prevent hanging requests
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Response>} - Fetch response
 */
async function fetchWithTimeout(url, options, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    return response;
  } finally {
    clearTimeout(id);
  }
}

/**
 * Creates the necessary authentication headers for GitHub API requests
 * @returns {Object} Headers object with authentication if token is available
 */
function getGitHubHeaders() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }
  
  return headers;
}

/**
 * Fetches the sidebar.json file from the GitHub repository
 * @returns {Object} The parsed sidebar JSON object
 */
export async function fetchSidebarFromGitHub() {
  if (DEBUG_MODE) {
    console.log('🔍 Fetching sidebar from GitHub');
  }
  
  // Check cache first for sidebar
  const sidebarCacheKey = 'sidebar.json';
  if (githubCache.has(sidebarCacheKey)) {
    if (DEBUG_MODE) {
      console.log(`🔄 Using cached sidebar`);
    }
    return githubCache.get(sidebarCacheKey);
  }
  
  try {
    // Fetch the sidebar.json file from the GitHub raw content URL
    const sidebarUrl = `${GITHUB_RAW_BASE}sidebar.json`;
    
    if (DEBUG_MODE) {
      console.log(`📡 Fetching sidebar from: ${sidebarUrl}`);
    }
    
    const response = await fetchWithTimeout(sidebarUrl, {
      headers: getGitHubHeaders(),
      next: { revalidate: 86400 } // Cache for 24 hours (1 day)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sidebar: ${response.status} ${response.statusText}`);
    }
    
    const sidebarJson = await response.json();
    
    if (DEBUG_MODE) {
      console.log('✅ Successfully fetched sidebar JSON');
      console.log('Sidebar structure:', JSON.stringify(sidebarJson, null, 2));
    }
    
    // Cache the sidebar
    githubCache.set(sidebarCacheKey, sidebarJson);
    
    return sidebarJson;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('❌ Error fetching sidebar from GitHub:', error);
    }
    return null;
  }
}

/**
 * Extracts file paths from the sidebar structure
 * @param {Object} sidebar - The sidebar configuration object
 * @returns {Array<string>} Array of file paths
 */
export function extractFilePathsFromSidebar(sidebar) {
  if (!sidebar) {
    if (DEBUG_MODE) {
      console.warn('⚠️ Cannot extract paths from undefined sidebar');
    }
    return [];
  }
  
  const paths = [];
  
  // Always include index.mdx by default, as it's a common requirement
  paths.push('index.mdx');
  
  // Process the sidebar object to extract all file paths
  try {
    // Handle root level items first
    Object.keys(sidebar).forEach(key => {
      // Skip any special keys or non-route keys
      if (key === '_meta' || typeof sidebar[key] !== 'object' && typeof sidebar[key] !== 'string') {
        return;
      }
      
      // Handle simple string entries (direct routes)
      if (typeof sidebar[key] === 'string') {
        // Don't duplicate index.mdx which we already added
        if (key !== 'index') {
          paths.push(`${key}.mdx`);
        }
        return;
      }
      
      // Handle objects that represent categories with nested items
      if (typeof sidebar[key] === 'object') {
        // If it's a simple object with a title but no items
        if (!sidebar[key].items) {
          // Don't duplicate index if already added
          if (key !== 'index') {
            paths.push(`${key}.mdx`);
          }
          return;
        }
        
        // Process nested items in a category
        if (sidebar[key].items) {
          Object.keys(sidebar[key].items).forEach(subKey => {
            paths.push(`${key}/${subKey}.mdx`);
          });
        }
      }
    });
    
    if (DEBUG_MODE) {
      console.log('📋 Extracted file paths:', paths);
    }
    
    return paths;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('❌ Error extracting file paths from sidebar:', error);
    }
    // Return at least index.mdx in case of error
    return ['index.mdx'];
  }
}

/**
 * Fetches a document from GitHub by its file path
 * @param {string} filePath - The path to the file in the GitHub repository
 * @returns {string} The file content as text
 */
export async function fetchFromGitHub(filePath) {
  if (!filePath) {
    throw new Error('File path is required');
  }
  
  if (DEBUG_MODE) {
    console.log(`📥 Fetching file from GitHub: ${filePath}`);
  }
  
  // Check cache first
  if (githubCache.has(filePath)) {
    if (DEBUG_MODE) {
      console.log(`🔄 Using cached GitHub content for ${filePath}`);
    }
    return githubCache.get(filePath);
  }
  
  try {
    // Construct the raw content URL for the file
    // For formbold-docs: directly use the filepath without the docs/ prefix
    const fileUrl = `${GITHUB_RAW_BASE}${filePath}`;
    
    if (DEBUG_MODE) {
      console.log(`🔗 Requesting file from: ${fileUrl}`);
    }
    
    const response = await fetchWithTimeout(fileUrl, {
      headers: getGitHubHeaders(),
      next: { revalidate: 86400 } // Cache for 24 hours (1 day)
    });
    
    if (!response.ok) {
      // If the file extension is not specified, try with .mdx extension
      if (!filePath.endsWith('.mdx') && !filePath.endsWith('.md')) {
        const mdxFileUrl = `${GITHUB_RAW_BASE}${filePath}.mdx`;
        
        if (DEBUG_MODE) {
          console.log(`🔄 Trying with .mdx extension: ${mdxFileUrl}`);
        }
        
        const mdxResponse = await fetchWithTimeout(mdxFileUrl, {
          headers: getGitHubHeaders(),
          next: { revalidate: 86400 } // Cache for 24 hours (1 day)
        });
        
        if (mdxResponse.ok) {
          const content = await mdxResponse.text();
          
          if (DEBUG_MODE) {
            console.log(`✅ Successfully fetched file with .mdx extension (${content.length} bytes)`);
          }
          
          // Cache the content
          githubCache.set(filePath, content);
          
          return content;
        }
        
        // Try with .md extension as fallback
        const mdFileUrl = `${GITHUB_RAW_BASE}${filePath}.md`;
        
        if (DEBUG_MODE) {
          console.log(`🔄 Trying with .md extension: ${mdFileUrl}`);
        }
        
        const mdResponse = await fetchWithTimeout(mdFileUrl, {
          headers: getGitHubHeaders(),
          next: { revalidate: 86400 } // Cache for 24 hours (1 day)
        });
        
        if (mdResponse.ok) {
          const content = await mdResponse.text();
          
          if (DEBUG_MODE) {
            console.log(`✅ Successfully fetched file with .md extension (${content.length} bytes)`);
          }
          
          // Cache the content
          githubCache.set(filePath, content);
          
          return content;
        }
      }
      
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }
    
    const content = await response.text();
    
    if (DEBUG_MODE) {
      console.log(`✅ Successfully fetched file (${content.length} bytes)`);
    }
    
    // Cache the content
    githubCache.set(filePath, content);
    
    return content;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error(`❌ Error fetching file from GitHub: ${error.message}`);
    }
    throw error; // Re-throw to allow caller to handle
  }
}

/**
 * Fetches a list of all files in the docs directory from GitHub
 * @returns {Array<string>} Array of file paths
 */
export async function fetchAllDocsFilesFromGitHub() {
  if (DEBUG_MODE) {
    console.log('📂 Fetching list of all documentation files from GitHub');
  }
  
  try {
    // Use the GitHub API to list contents of the repository root for formbold-docs
    const apiUrl = `${GITHUB_API_BASE}/repos/${repoOwner}/${repoName}/contents?ref=${repoBranch}`;
    
    const response = await fetch(apiUrl, {
      headers: getGitHubHeaders(),
      next: { revalidate: 86400 } // Cache for 24 hours (1 day)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch directory listing: ${response.status} ${response.statusText}`);
    }
    
    const items = await response.json();
    
    // Extract file paths for MDX and MD files only
    const filePaths = items
      .filter(item => item.type === 'file' && (item.name.endsWith('.mdx') || item.name.endsWith('.md')))
      .map(item => item.path);
    
    // Always make sure index.mdx is in the list
    if (!filePaths.includes('index.mdx') && !filePaths.includes('index.md')) {
      filePaths.push('index.mdx');
    }
    
    if (DEBUG_MODE) {
      console.log(`✅ Found ${filePaths.length} documentation files`);
      console.log('File paths:', filePaths);
    }
    
    return filePaths;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('❌ Error fetching file listing from GitHub:', error);
    }
    // Return basic file list as fallback
    return ['index.mdx', 'getting-started.mdx', 'installation.mdx'];
  }
}

/**
 * Checks if the GitHub repository exists and is accessible
 * @returns {boolean} True if the repository is accessible
 */
export async function checkGitHubRepoAccess() {
  try {
    const apiUrl = `${GITHUB_API_BASE}/repos/${repoOwner}/${repoName}`;
    
    const response = await fetch(apiUrl, {
      headers: getGitHubHeaders()
    });
    
    return response.ok;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('❌ Error checking GitHub repository access:', error);
    }
    return false;
  }
}

/**
 * Validates a GitHub webhook payload signature
 * @param {string} signature - The signature from the GitHub webhook
 * @param {string} payload - The payload from the webhook
 * @returns {boolean} True if the signature is valid
 */
export function validateGitHubWebhook(signature, payload) {
  if (!signature || !payload || !process.env.GITHUB_WEBHOOK_SECRET) {
    return false;
  }
  
  try {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(digest),
      Buffer.from(signature)
    );
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('❌ Error validating GitHub webhook:', error);
    }
    return false;
  }
}

