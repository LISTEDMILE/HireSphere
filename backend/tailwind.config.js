/** @type {import('tailwindcss').Config} */
module.exports = {
  // iska matlab .views me chahe aur folder ho to uske andar ya kahi bhi (**) iska matlab ye h aur *.{html} ka matlab jitni bhi html file h.....
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
