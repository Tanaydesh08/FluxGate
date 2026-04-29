/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9efff",
          500: "#0f8cff",
          600: "#0070db",
          900: "#0d2745",
        },
      },
      boxShadow: {
        soft: "0 12px 35px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
