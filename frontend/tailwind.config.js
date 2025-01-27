/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#FFCE1A',
                'secondary': '#FFA500',
                'blackBG': '#0F172A',
                'Favorite': '#FFA500',
            },
            fontFamily: {
                'primary': ["Montserrat", "sans-serif"],
                'secondary': ["Numito Sans", "sans-serif"],
            }
        },
    },
    plugins: [],
}
