
// This file contains global type declarations for TypeScript
import React from 'react';

// Make sure React JSX types are available
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Add module declarations for any third-party libraries that don't have types
declare module 'lovable-tagger' {
  export function componentTagger(): any;
}

// Ensure this is treated as a module
export {};

