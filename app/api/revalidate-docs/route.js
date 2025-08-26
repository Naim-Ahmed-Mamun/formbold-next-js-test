import { exec } from 'child_process';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import path from 'path';
import { promisify } from 'util';
import { validateGitHubWebhook } from '../../docs/utils/github';

const execPromise = promisify(exec);

// Function to regenerate local MDX files
async function regenerateLocalFiles() {
  try {
    const scriptPath = path.join(process.cwd(), 'utils', 'getDocsFromGithub.js');
    const { stdout, stderr } = await execPromise(`node ${scriptPath}`);
    console.log('Regeneration output:', stdout);
    if (stderr) console.error('Regeneration errors:', stderr);
    return true;
  } catch (error) {
    console.error('Failed to regenerate files:', error);
    return false;
  }
}

// Handle both POST requests from GitHub webhooks and GET requests for manual triggers
export async function POST(request) {
  try {
    // Get the GitHub webhook signature from headers
    const signature = request.headers.get('x-hub-signature-256');
    
    // Get the webhook payload as text
    const payload = await request.text();
    
    // Validate the webhook signature
    const isValid = validateGitHubWebhook(signature, payload);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }
    
    // Parse the payload to get details about what changed
    const data = JSON.parse(payload);
    
    // Check if it's a push event
    if (data.ref && data.repository) {
      // First, try to regenerate local files
      try {
        await regenerateLocalFiles();
      } catch (err) {
        console.log('Could not regenerate local files:', err.message);
      }
      
      // Aggressively revalidate caches
      revalidatePath('/docs', 'layout');
      revalidateTag('docs');
      
      return NextResponse.json({
        revalidated: true,
        message: 'Documentation revalidated successfully'
      });
    }
    
    return NextResponse.json({
      revalidated: false,
      message: 'No action taken - event not relevant'
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Error revalidating content' },
      { status: 500 }
    );
  }
}


// Handle GET requests for manual revalidation
export async function GET(request) {
  // Get the secret token from the URL
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  // Check if the secret matches the environment variable
  if (secret !== process.env.GITHUB_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  try {
    // First, try to regenerate local files
    try {
      await regenerateLocalFiles();
    } catch (err) {
      console.log('Could not regenerate local files:', err.message);
    }
    
    // Aggressively revalidate caches
    revalidatePath('/docs', 'layout');
    revalidateTag('docs');
    
    return NextResponse.json({
      revalidated: true,
      message: 'Documentation revalidated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating content' }, 
      { status: 500 }
    );
  }
} 