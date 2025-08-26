// scripts/fetchDocsFromGithub.js
const fs = require('fs');
const path = require('path');
const { defaultMdxPages } = require('../app/docs/utils/pageMap.js');

// For fetching from GitHub
const https = require('https');

// Try to load .env file if it exists
try {
  require('dotenv').config({ path: '.env.local' });
  console.log('✅ Loaded environment variables from .env.local');
} catch (err) {
  try {
    require('dotenv').config();
    console.log('✅ Loaded environment variables from .env');
  } catch (err) {
    console.log('⚠️ No .env file found, using environment variables or defaults');
  }
}

// Get environment variables with fallbacks
const repoOwner = process.env.GITHUB_REPO_OWNER || 'FormBold';
const repoName = process.env.GITHUB_REPO_NAME || 'formbold-docs';
const repoBranch = process.env.GITHUB_REPO_BRANCH || 'main';

// Create a fallback content for files that don't exist
function createFallbackContent(route, title) {
  return `# ${title || route.charAt(0).toUpperCase() + route.slice(1)}

This is a placeholder documentation page. The actual documentation will be available soon.

## Getting Started

Documentation content will appear here once it's available.

## More Information

For more details, visit [FormBold](https://formbold.com).
`;
}

function writeFileRecursive(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

// Fetch content from GitHub
function fetchFromGitHub(filePath) {
  return new Promise((resolve, reject) => {
    // Construct the URL
    const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${repoBranch}/${filePath}`;
    
    console.log(`🔗 Fetching from: ${url}`);
    
    // Optional GitHub token for authenticated requests
    const options = {};
    if (process.env.GITHUB_TOKEN) {
      options.headers = {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      };
    }
    
    https.get(url, options, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      } else if (res.statusCode === 404) {
        reject(new Error(`File not found: ${filePath}`));
      } else {
        reject(new Error(`Failed to fetch from GitHub: ${res.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to add a timestamp comment to MDX content
function addTimestamp(content) {
  const timestamp = new Date().toISOString();
  const timeComment = `<!-- Generated at: ${timestamp} -->\n\n`;
  return timeComment + content;
}

async function generateLocalFiles() {
  // Create the docs-content directory if it doesn't exist
  const docsContentDir = path.join(process.cwd(), 'public', 'docs-content');
  if (!fs.existsSync(docsContentDir)) {
    fs.mkdirSync(docsContentDir, { recursive: true });
    console.log('✅ Created docs-content directory');
  }
  
  let successCount = 0;
  let fallbackCount = 0;
  let errorCount = 0;
  
  // Create fallback files for each route in defaultMdxPages
  for (const [route, filePath] of Object.entries(defaultMdxPages)) {
    try {
      // Try to fetch from GitHub first
      let mdxContent;
      try {
        mdxContent = await fetchFromGitHub(filePath);
        console.log(`✅ Successfully fetched from GitHub: ${filePath}`);
        successCount++;
      } catch (githubError) {
        console.log(`⚠️ Could not fetch from GitHub: ${githubError.message}`);
        // Generate fallback content if GitHub fetch fails
        mdxContent = createFallbackContent(route);
        console.log(`ℹ️ Using generated fallback content for: ${filePath}`);
        fallbackCount++;
      }
      
      // Add timestamp to track changes
      mdxContent = addTimestamp(mdxContent);
      
      // Create the file path
      const localPath = path.join(
        process.cwd(),
        'public',
        'docs-content',
        filePath
      );
      
      // Write the file
      writeFileRecursive(localPath, mdxContent);
      
      console.log(`✅ Saved: ${filePath}`);
    } catch (err) {
      console.error(`❌ Failed to process ${filePath}: ${err.message}`);
      errorCount++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Successfully fetched: ${successCount} files`);
  console.log(`⚠️ Used fallback content: ${fallbackCount} files`);
  console.log(`❌ Errors: ${errorCount} files`);
  console.log('✅ All files processed');
}

// Log the environment values (without revealing secrets)
console.log('GitHub Repository Settings:');
console.log(`Owner: ${repoOwner}`);
console.log(`Repo: ${repoName}`);
console.log(`Branch: ${repoBranch}`);
console.log(`GitHub Token: ${process.env.GITHUB_TOKEN ? '***set***' : 'not set'}`);
console.log('');

// Run the script
generateLocalFiles();
