import React from 'react';
import { theme as chakraTheme } from '@chakra-ui/core';

const theme = {
  ...chakraTheme,
  config: {
    initialColorMode: 'dark' // "light" | "dark"
  },
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  icons: {
    ...chakraTheme.icons,
    twitter: {
      path: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </g>
      )
    },
    github: {
      path: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </g>
      )
    },
    linkedin: {
      path: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </g>
      )
    },
    mail: {
      path: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </g>
      )
    },
    medium: {
      path: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 41.578c0 .89-.477 1.422-1.152 1.422-.239 0-.504-.066-.785-.207l-10.899-5.52C4.524 36.95 4 36.09 4 35.367V8.313c0-.715.379-1.137.922-1.137.191 0 .406.05.629.164l.383.195h.003l12.012 6.082c.02.012.035.031.051.047zM30.586 8.883l.734-1.207c.262-.43.742-.676 1.23-.676.114 0 .231.016.345.047.085.02.175.05.27.098l12.667 6.414c.004 0 .004.004.004.004l.012.003c.007.004.007.016.015.02.063.05.09.137.047.207L33.293 34.559l-1.29 2.117-8.358-16.371zM20 30.605V17.562l8.98 17.594-8.078-4.09zm26 10.973c0 .836-.496 1.313-1.227 1.313-.328 0-.703-.094-1.097-.293l-1.809-.918-8.078-4.09L46 17.496z" />
        </g>
      ),
      viewBox: '0 0 50 50'
    }
  }
};

export default theme;
