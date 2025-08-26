# GitHub-based Documentation System

This documentation system fetches content directly from a GitHub repository and displays it using Next.js and Nextra.

## Repository Structure

Your GitHub documentation repository should have the following structure:

```
/
├── index.mdx                # Root page (/docs/)
├── getting-started.mdx      # /docs/getting-started
├── installation.mdx         # /docs/installation
├── components.mdx           # /docs/components
├── sidebar.json             # Sidebar configuration
└── other-directories/       # Nested documentation
    └── example.mdx          # /docs/other-directories/example
```

## Sidebar Configuration

The `sidebar.json` file should contain the structure for the navigation sidebar. Example:

```json
{
  "index": "Introduction",
  "getting-started": "Getting Started",
  "installation": "Installation",
  "components": {
    "title": "Components",
    "items": {
      "button": "Button",
      "form": "Form"
    }
  },
  "api-reference": {
    "title": "API Reference",
    "items": {
      "endpoints": "Endpoints",
      "errors": "Error Codes"
    }
  }
}
```

## Setting Up Webhooks

To enable automatic revalidation when documentation is updated:

1. Go to your GitHub repository settings
2. Navigate to "Webhooks" and click "Add webhook"
3. Set the Payload URL to: `https://your-website.com/api/revalidate`
4. Set Content type to: `application/json`
5. Set the Secret to a secure random string (store this in your environment variables as `GITHUB_WEBHOOK_SECRET`)
6. Select "Just the push event" for events to trigger the webhook
7. Make sure the webhook is active

## Environment Variables

Add these environment variables to your project:

```
GITHUB_REPO_OWNER=owner_name
GITHUB_REPO_NAME=repo_name
GITHUB_REPO_BRANCH=main
GITHUB_WEBHOOK_SECRET=your_webhook_secret
GITHUB_TOKEN=your_github_token (optional)
REVALIDATE_SECRET_TOKEN=your_manual_revalidation_token
```

## Local File Fallback System

This documentation system uses a fallback mechanism to serve content from local files when GitHub is unavailable:

1. Content is primarily fetched from GitHub in real-time
2. If GitHub is unavailable, the system falls back to local copies stored in `/public/docs-content/`
3. To generate local copies of all documentation, run:
   ```
   node utils/getDocsFromGithub.js
   ```
4. This script should be run periodically or as part of your deployment process to ensure local copies are up-to-date

## Revalidation and Content Updates

The documentation system uses multiple levels of revalidation to ensure content is updated properly:

1. **GitHub Webhooks**: The primary revalidation mechanism. When content changes in the GitHub repository, a webhook call to `/api/revalidate-docs` triggers revalidation.

2. **Manual Revalidation**: You can manually trigger revalidation by visiting:
   - `/api/revalidate-docs?secret=your_revalidation_token`

3. **Content Regeneration**: The revalidation process automatically attempts to re-fetch the latest content from GitHub and regenerate the local MDX files.

4. **Cache Tagging**: The system uses Next.js cache tags to ensure proper cache invalidation across all documentation pages.

5. **Timestamp Tracking**: Each generated MDX file includes a timestamp comment at the top to help track when content was last updated.

If you notice content is not updating correctly:

1. Check that your webhooks are properly configured and reaching your endpoint
2. Try a manual revalidation
3. Verify in deployment logs that the revalidation is being processed correctly
4. Check that your environment variables are properly set

For Vercel deployments, consider setting up a deployment hook that triggers after content changes in your docs repository.

## Manual Cache Clearing

You can clear the documentation cache in several ways:

1. **Using the API endpoints:**
   - Clear both sidebar and content caches:
     ```
     https://your-website.com/api/clear-docs-cache?token=your_revalidation_token
     ```
   - Force a complete revalidation of a path:
     ```
     https://your-website.com/api/clear-docs-cache?token=your_revalidation_token&force=true&path=/docs
     ```
   
2. **Revalidate specific parts:**
   - Revalidate just the sidebar:
     ```
     https://your-website.com/api/revalidate-docs?token=your_revalidation_token&tag=sidebar
     ```
   - Revalidate just the content:
     ```
     https://your-website.com/api/revalidate-docs?token=your_revalidation_token&tag=content
     ```

## Troubleshooting

If the sidebar is not displaying correctly:

1. Check that your `sidebar.json` file is valid JSON and properly formatted
2. Clear the cache using one of the methods above
3. Verify the GitHub repository and branch are correctly configured in your environment variables
4. Check the browser console and server logs for any error messages

In development mode, setting `NODE_ENV=development` will disable caching, making it easier to see changes immediately.

## Implementation Details

- Documentation content is fetched directly from GitHub raw files
- The sidebar structure is loaded from the `sidebar.json` file in your GitHub repository
- Content is revalidated hourly (ISR) or when the webhook is triggered
- A fallback sidebar structure is used if the GitHub repository cannot be reached 