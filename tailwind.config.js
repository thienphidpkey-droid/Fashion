/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'lumiere-cream': '#F5F5F0',
                'lumiere-beige': '#E8E4D9',
                'lumiere-green': '#2C4A3B',
                'lumiere-green-dark': '#1A2E24',
                'lumiere-brown': '#8C7B75',
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            }
        }
    },
    plugins: [],
}
