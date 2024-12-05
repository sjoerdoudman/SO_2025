// @ts-ignore
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

// @ts-ignore
export default defineNuxtRouteMiddleware(async (to, from) => {
    const ui = useUIStore();
    const {
        updateCursor,
        toggleSearchOpen,
        toggleIsHome,
        updateLastRoute,
        toggleIsTransitioning,
        toggleInverseHeader,
        toggleMenuOpen,
        toggleJournalCat
    } = ui;
    const { projectSlider } = storeToRefs(ui);

    // Define routes or conditions that should NOT trigger the page wiper
    const excludedRoutes = ['/showcase'];

    // Check if the route is in the excluded routes list
    const shouldTransition = !excludedRoutes.includes(to.path);

    if (shouldTransition) {
        // Start the page wipe animation
        toggleIsTransitioning(true);

        // Delay for the wiper animation to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Now update the store based on route changes
    toggleMenuOpen(false);
    updateLastRoute(from.path);
    updateCursor(null);

    if (to.path === '/search') {
        toggleSearchOpen(true);
    } else {
        toggleSearchOpen(false);
    }

    if (to.path === '/') {
        toggleIsHome(true);
    } else {
        toggleIsHome(false);
    }

    // if the route does not contain the journal path
    if (!to.path.includes('/journal')) {
        toggleJournalCat(false);
    }

    // End the page wipe after route actions, only if it was triggered
    if (shouldTransition) {
        toggleInverseHeader(false);
        toggleIsTransitioning(false);
    }
});
