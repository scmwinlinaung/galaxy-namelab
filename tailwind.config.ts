import { themeColors } from './src/styles/theme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // This is crucial!
    ],
    theme: {
        extend: {
            colors: {
                primary: themeColors.primary,
            },
        },
    },
    plugins: [],
}