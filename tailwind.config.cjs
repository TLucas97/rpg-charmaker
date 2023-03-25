const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    screens: {
      smaller: "850px",
      evenSmaller: "600px",
      tiny: "400px",
    },
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fade: "fade 0.5s ease-in-out",
      },
    },
    fontFamily: {
      "source-code-pro": ["Source Code Pro", "monospace"],
    },
  },

  plugins: [],
};

module.exports = config;
