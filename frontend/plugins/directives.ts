import type { Directive } from 'vue';
import { defineNuxtPlugin } from 'nuxt/app';

const vScroll: Directive<HTMLElement, (el: HTMLElement) => void> = {
    mounted(el, binding) {
        const callback = binding.value;

        const onScrollHandler = () => {
            if (callback) {
                callback(el);
            }
        };

        // Attach scroll event to the window
        window.addEventListener('scroll', onScrollHandler);

        // Store the handler on the element for cleanup
        (el as any)._onScrollHandler = onScrollHandler;
    },
    unmounted(el) {
        const handler = (el as any)._onScrollHandler;
        if (handler) {
            window.removeEventListener('scroll', handler);
            delete (el as any)._onScrollHandler;
        }
    },
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('scroll', vScroll);
});