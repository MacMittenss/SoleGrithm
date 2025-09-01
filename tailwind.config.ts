import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"seasonSans"', '"seasonSans Fallback"', '"Manrope"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'season': ['"seasonSans"', '"seasonSans Fallback"', '"Manrope"', '"Inter"', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "hsl(222.2, 84%, 4.9%)",
          "secondary": "hsl(210, 40%, 96%)",
          "accent": "hsl(210, 40%, 98%)",
          "neutral": "hsl(215, 16%, 47%)",
          "base-100": "hsl(0, 0%, 100%)",
          "base-200": "hsl(210, 40%, 98%)",
          "base-300": "hsl(210, 40%, 96%)",
          "info": "hsl(221, 83%, 53%)",
          "success": "hsl(142, 71%, 45%)",
          "warning": "hsl(38, 92%, 50%)",
          "error": "hsl(0, 84%, 60%)",
        },
        dark: {
          "primary": "hsl(210, 40%, 98%)",
          "secondary": "hsl(217, 33%, 17%)",
          "accent": "hsl(224, 71%, 4%)",
          "neutral": "hsl(215, 16%, 47%)",
          "base-100": "hsl(224, 71%, 4%)",
          "base-200": "hsl(215, 28%, 17%)",
          "base-300": "hsl(217, 33%, 17%)",
          "info": "hsl(221, 83%, 53%)",
          "success": "hsl(142, 71%, 45%)",
          "warning": "hsl(38, 92%, 50%)",
          "error": "hsl(0, 84%, 60%)",
        },
      },
    ],
    darkTheme: "dark",
    base: false, // Disable DaisyUI's base styles to avoid conflicts with shadcn/ui
    styled: true,
    utils: true,
    prefix: "daisy-", // Prefix DaisyUI classes to avoid conflicts
  },
} satisfies Config;
