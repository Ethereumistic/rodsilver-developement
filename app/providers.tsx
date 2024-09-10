"use client";

import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(() => import('next-themes').then((mod) => mod.ThemeProvider), {
  ssr: false,
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}