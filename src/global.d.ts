
// This file contains global type declarations for TypeScript
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Declare modules for third-party libraries
declare module 'react/jsx-runtime';
declare module '@tanstack/react-query';
declare module 'react-router-dom';
declare module 'lucide-react';

// Module for any custom libraries
declare module 'lovable-tagger' {
  export function componentTagger(): any;
}

export {};
