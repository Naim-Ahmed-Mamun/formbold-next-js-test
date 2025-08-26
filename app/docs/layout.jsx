import { Layout } from 'nextra-theme-docs';
import { cache } from 'react';
import { DEBUG_MODE, pageMap } from './utils/pageMap';

// Ensure pageMap is always valid
const getPageMap = cache(() => {
  if (!pageMap) {
    if (DEBUG_MODE) {
      console.warn('pageMap is null, using an empty array');
    }
    return [];
  }
  return [pageMap];
});

export default async function DocsLayout({ children }) {
  if (DEBUG_MODE) {
    console.log('Rendering docs layout with sidebar');
  }
  
  const validPageMap = getPageMap();
  
  return (
    <div className="3xl:px-14 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 pt-24 nextra-docs-container">
      <Layout 
        pageMap={validPageMap}
        darkMode={false}
        docsRepositoryBase="https://github.com/FormBold/formbold-docs/tree/main"
        feedback={
          {
            content: 'Have feedback? Give it to us!'
          }
        }
        sidebar={
          {
            toggleButton: false
          }
        }
        nextThemes={{
          defaultTheme: 'light'
        }}
      >
        {children}
      </Layout>
    </div>
  )
} 