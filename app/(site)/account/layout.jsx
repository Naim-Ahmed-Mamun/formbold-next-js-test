'use client';
import React, { Suspense } from 'react';

export default function AccountPageLayout({children}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  )
}
