// composables/useActivity.ts
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

export function useActivity() {
    const inactivityTimeout = ref<NodeJS.Timeout | null>(null);
    const ui = useUIStore();
    const { keystrokes, menuOpen } = storeToRefs(ui);

    const resetInactivityTimeout = () => {
        // Clear any existing timeout
        if (inactivityTimeout.value) {
            clearTimeout(inactivityTimeout.value);
        }

        // Set viewportActive to true on interaction
        ui.toggleViewportActive(true);

        // Set a new timeout to set viewportActive to false after 4 seconds of inactivity
        inactivityTimeout.value = setTimeout(() => {
            if (!menuOpen.value) ui.toggleViewportActive(false);
        }, 5000);
    };

    onMounted(() => {
        // @ts-ignore
        window.addEventListener('mousemove', resetInactivityTimeout);
        // Reset the inactivity timeout on mount
        resetInactivityTimeout();
    });

    onUnmounted(() => {
        // @ts-ignore
        window.removeEventListener('mousemove', resetInactivityTimeout);
        if (inactivityTimeout.value) {
            clearTimeout(inactivityTimeout.value);
        }
    });

    watch(keystrokes, (val) => {
        resetInactivityTimeout();
    });
}
