import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUIStore } from '@/store/ui';

export function useScrollWatcher() {
    const ui = useUIStore();
    const { toggleClientSpeaks, toggleDeveloperSpeaks } = ui;
    const { catDialogue, clientSpeaks, developerSpeaks } = storeToRefs(ui);
    const currenScrollListener = ref<HTMLElement | null>(null);

    const onScroll = (el: HTMLElement) => {
        if (!catDialogue.value) return;
        const rect = el.getBoundingClientRect();
        const h = el.clientHeight;
        const diaRect = catDialogue.value.getBoundingClientRect().top;

        if (!currenScrollListener.value) {
            if (rect.top <= diaRect && rect.top + h >= diaRect) {
                currenScrollListener.value = el;
                if (el.classList.contains('client') && !clientSpeaks.value) {
                    toggleClientSpeaks(true);
                }
                if (el.classList.contains('developer') && !developerSpeaks.value) {
                    toggleDeveloperSpeaks(true);
                }
            }
        } else {
            if (el !== currenScrollListener.value) return;
            if (rect.top > diaRect || rect.top + h < diaRect) {
                currenScrollListener.value = null;
                if (el.classList.contains('client') && clientSpeaks.value) {
                    toggleClientSpeaks(false);
                }
                if (el.classList.contains('developer') && developerSpeaks.value) {
                    toggleDeveloperSpeaks(false);
                }
            }
        }
    };

    return { onScroll, catDialogue };
}