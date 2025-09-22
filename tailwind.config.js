export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,vue}",
    "./pages/**/*.{js,ts,jsx,tsx,vue}",
    "./components/**/*.{js,ts,jsx,tsx,vue}",
    "./slices/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        stix: ["Stix Two Text", "serif"],
        serif: ["Stix Two Text", "serif"],
      },
    },
  },
};
