import { defineStore } from 'pinia'
import type { showCase } from '@/types';

export const useUIStore = defineStore({
    id: 'ui-store',
    state: () => {
        return {
            isHome: false,
            menuOpen: false,
            isTransitioning: false,
            isFetching: false,
            cols: 4,
            pageWipe: false,
            firstLoad: true,
            showLoader: false,
            showHeader: false,
            inverseHeader: false,
            viewportActive: false,
            keystrokes: 0,
            mouseX: 0,
            mouseY: 0,
            cursor: null,
            searchOpen: false,
            lastRoute: '' as string | null,
            animationsScroll: 0,
            activeShowCase: null as showCase | null
        }
    },
    actions: {
        toggleIsHome(payload: boolean) {
            this.isHome = payload
        },
        toggleMenuOpen(payload: boolean) {
            this.menuOpen = payload
        },
        toggleIsTransitioning(payload: boolean) {
            this.isTransitioning = payload
        },
        toggleIsFetching(payload: boolean) {
            this.isFetching = payload
        },
        toggleShowLoader(payload: boolean) {
            this.showLoader = payload
        },
        toggleShowHeader(payload: boolean) {
            this.showHeader = payload
        },
        toggleInverseHeader(payload: boolean) {
            this.inverseHeader = payload
        },
        toggleFirstLoad(payload: boolean) {
            this.firstLoad = payload
        },
        toggleViewportActive(payload: boolean) {
            this.viewportActive = payload
        },
        toggleSearchOpen(payload: boolean) {
            this.searchOpen = payload
        },
        togglePageWipe(payload: boolean) {
            this.pageWipe = payload
        },
        updateCols(payload: number) {
            this.cols = payload
        },
        updateCursor(payload: any) {
            this.cursor = payload
        },
        addKeystroke() {
            this.keystrokes++
        },
        updateMouseX(payload: any) {
            this.mouseX = payload
        },
        updateMouseY(payload: any) {
            this.mouseY = payload
        },
        updateLastRoute(payload: any) {
            this.lastRoute = payload
        },
        updateAnimationsScroll(payload: any) {
            this.animationsScroll = payload
        },
        updateActiveShowCase(payload: any) {
            this.activeShowCase = payload
        }
    }
})