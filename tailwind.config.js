/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "secondary-fixed-dim": "#b7c8e1",
        "on-surface-variant": "#94a3b8", // Slate 400
        "on-tertiary-fixed-variant": "#564427",
        "surface-container-low": "#0f172a", // Slate 900
        "on-secondary-fixed": "#0b1c30",
        "primary-container": "#1e293b", // Slate 800
        "on-primary-container": "#cbd5e1", // Slate 300
        "secondary": "#94a3b8", // Slate 400
        "inverse-surface": "#fbf8fa",
        "error": "#ffb4ab",
        "on-primary": "#020617",
        "on-tertiary-container": "#ffdea9",
        "primary": "#3b82f6", // Brand blue
        "tertiary-fixed": "#fadfb8",
        "surface-variant": "#1e293b", // Slate 800
        "secondary-container": "#334155", // Slate 700
        "on-surface": "#f8fafc", // Slate 50
        "background": "#020617", // Slate 950
        "on-secondary-fixed-variant": "#38485d",
        "tertiary-fixed-dim": "#ddc39d",
        "primary-fixed-dim": "#bcc7de",
        "tertiary-container": "#35260c",
        "on-secondary-container": "#cbd5e1", // Slate 300
        "on-primary-fixed": "#111c2d",
        "on-tertiary-fixed": "#271902",
        "on-error-container": "#ffdad6",
        "inverse-primary": "#091426",
        "inverse-on-surface": "#1b1b1d",
        "outline": "#64748b", // Slate 500
        "surface-tint": "#3b82f6",
        "on-secondary": "#020617", // Slate 950
        "surface-container": "#1e293b", // Slate 800
        "surface-container-high": "#334155", // Slate 700
        "surface-container-lowest": "#020617", // Slate 950
        "on-background": "#f8fafc", // Slate 50
        "error-container": "#93000a",
        "on-primary-fixed-variant": "#3c475a",
        "surface": "#0f172a", // Slate 900
        "primary-fixed": "#d8e3fb",
        "surface-bright": "#1e293b", // Slate 800
        "tertiary": "#ffb4ab",
        "on-tertiary": "#020617",
        "surface-container-highest": "#475569", // Slate 600
        "secondary-fixed": "#d3e4fe",
        "on-error": "#690005",
        "outline-variant": "#334155", // Slate 700
        "surface-dim": "#020617", // Slate 950
        "brand-blue": "#3b82f6",
        "brand-navy": "#f1f5f9", // Slate 100
        "brand-slate": "#94a3b8" // Slate 400
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "section-gap-mobile": "64px",
        "grid-margin": "24px",
        "grid-gutter": "24px",
        "section-gap-desktop": "120px",
        "max-width": "1200px",
        "base": "8px"
      },
      "fontFamily": {
        "body-lg": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Inter", "sans-serif"],
        "label-code": ["JetBrains Mono", "monospace"],
        "display": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"]
      },
      "fontSize": {
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "headline-lg-mobile": ["28px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "label-code": ["14px", { "lineHeight": "1.4", "fontWeight": "500" }],
        "display": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "label-caps": ["12px", { "lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "700" }],
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "600" }]
      }
    },
  },
  plugins: [],
}
