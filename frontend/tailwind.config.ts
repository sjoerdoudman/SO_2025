/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    corePlugins: {
        container: false,
    },
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    safelist: [
        'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6',
        'aspect-4/3', 'aspect-16/9', 'aspect-7/4',
        'duration-[150]', 'duration-[200]', 'duration-[250]', 'duration-[300]',
        'delay-[400ms]', 'delay-[500ms]', 'delay-[600ms]', 'delay-[700ms]', 'delay-[800ms]'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Marfa"', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'dark': '#191919',
                'light': '#f4f4f4',
                'accent-dark': '#fff08a',
                'accent-light': 'rgb(182 166 102)'
            },
            spacing: {
                'quadruple-space': 'calc( 8vw + 3.2vh + 3.2rem )',
                'triple-space': 'calc( 6vw + 2.4vh + 2.4rem )',
                'double-space': 'calc( 4vw + 1.6vh + 1.6rem )',
                'single-space': 'calc( 2vw + .8vh + .8rem )',
                'half-space': 'calc( 1vw + .4vh + .4rem )',
                'quarter-space': 'calc( .5vw + .2vh + .2rem )',
            },
            aspectRatio: {
                '1/1': '1 / 1',
                '3/1': '3 / 1',
                '3/4': '3 / 4',
                '4/3': '4 / 3',
                '16/9': '16 / 9',
                'portrait': '9 / 16'
            }
        },
    }
}

