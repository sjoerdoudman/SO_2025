import { defineNuxtPlugin } from 'nuxt/app';
export default defineNuxtPlugin((nuxtApp) => {
    const hexToRgba = (hex: string, opacity: number) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        const result = regex ? {
            r: parseInt(regex[1], 16),
            g: parseInt(regex[2], 16),
            b: parseInt(regex[3], 16)
        } : null;
        if (result === null) return null
        return `rgba(${result.r},${result.g},${result.b},${opacity})`
    };

    return {
        provide: {
            hexToRgba: hexToRgba
        }
    }
})