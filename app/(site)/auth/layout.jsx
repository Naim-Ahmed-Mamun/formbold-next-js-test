'use client';
import { Suspense } from 'react';

export default function AuthPageLayout({children}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  )
}
