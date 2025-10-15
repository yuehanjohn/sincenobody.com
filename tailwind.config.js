import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", "var(--font-sans)"],
        mono: ["var(--font-mono)"],
        bebas: ["var(--font-bebas)"],
        nunito: ["var(--font-nunito)"],
        title: ["var(--font-bebas)"],
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-y": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
      },
      animation: {
        "marquee-horizontal": "marquee-x var(--duration) infinite linear",
        "marquee-vertical": "marquee-y var(--duration) linear infinite",
        shine: "shine 5s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {},
      themes: {
        light: {
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            text: {
              50: "#071113",
              100: "#0e2325",
              200: "#1b454b",
              300: "#296870",
              400: "#368b96",
              500: "#44adbb",
              600: "#69bec9",
              700: "#8fced6",
              800: "#b4dee4",
              900: "#daeff1",
              950: "#ecf7f8",
              foreground: "#FFFFFF",
              DEFAULT: "#071113",
            },
            primary: {
              50: "#041415",
              100: "#08272b",
              200: "#104f56",
              300: "#187681",
              400: "#219dab",
              500: "#29c5d6",
              600: "#54d0de",
              700: "#7edce7",
              800: "#a9e8ef",
              900: "#d4f3f7",
              950: "#eaf9fb",
              foreground: "#FFFFFF",
              DEFAULT: "#29c5d6",
            },
            secondary: {
              50: "#041416",
              100: "#08282b",
              200: "#104f56",
              300: "#187781",
              400: "#209eac",
              500: "#28c6d7",
              600: "#53d1df",
              700: "#7edde7",
              800: "#a9e8ef",
              900: "#d4f4f7",
              950: "#e9f9fb",
              foreground: "#FFFFFF",
              DEFAULT: "#28c6d7",
            },
            accent: {
              50: "#031416",
              100: "#06292d",
              200: "#0d5259",
              300: "#137a86",
              400: "#19a3b3",
              500: "#20ccdf",
              600: "#4cd6e6",
              700: "#79e0ec",
              800: "#a6ebf2",
              900: "#d2f5f9",
              950: "#e9fafc",
              foreground: "#FFFFFF",
              DEFAULT: "#20ccdf",
            },
          },
        },
        dark: {
          colors: {
            background: "#000000", // or DEFAULT
            foreground: "#ECEDEE", // or 50 to 900 DEFAULT
            text: {
              50: "#071113",
              100: "#0e2325",
              200: "#1b454b",
              300: "#296870",
              400: "#368b96",
              500: "#44adbb",
              600: "#69bec9",
              700: "#8fced6",
              800: "#b4dee4",
              900: "#daeff1",
              950: "#ecf7f8",
              foreground: "#FFFFFF",
              DEFAULT: "#071113",
            },
            primary: {
              50: "#041415",
              100: "#08272b",
              200: "#104f56",
              300: "#187681",
              400: "#219dab",
              500: "#29c5d6",
              600: "#54d0de",
              700: "#7edce7",
              800: "#a9e8ef",
              900: "#d4f3f7",
              950: "#eaf9fb",
              foreground: "#FFFFFF",
              DEFAULT: "#0fa7f1",
            },
            secondary: {
              50: "#041416",
              100: "#08282b",
              200: "#104f56",
              300: "#187781",
              400: "#209eac",
              500: "#28c6d7",
              600: "#53d1df",
              700: "#7edde7",
              800: "#a9e8ef",
              900: "#d4f4f7",
              950: "#e9f9fb",
              foreground: "#FFFFFF",
              DEFAULT: "#28c6d7",
            },
            accent: {
              50: "#031416",
              100: "#06292d",
              200: "#0d5259",
              300: "#137a86",
              400: "#19a3b3",
              500: "#20ccdf",
              600: "#4cd6e6",
              700: "#79e0ec",
              800: "#a6ebf2",
              900: "#d2f5f9",
              950: "#e9fafc",
              foreground: "#FFFFFF",
              DEFAULT: "#20ccdf",
            },
          },
        },
        // ... custom themes
      },
    }),
  ],
};

module.exports = config;
