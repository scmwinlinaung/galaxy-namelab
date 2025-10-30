// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Define everything directly in this file
                'theme-dark': '#1a0118',
                primary: {
                    50: '#f2e7f3',
                    100: '#e5cfe7',
                    200: '#d8b8da',
                    300: '#ca9fcd',
                    400: '#bc88c0',
                    500: '#af70b3',
                    600: '#9e64a1',
                    700: '#8d588f',
                    800: '#7c4c7d',
                    900: '#6b406b',
                    950: '#540d5b',
                },
            },
        },
    },
    plugins: [],
};