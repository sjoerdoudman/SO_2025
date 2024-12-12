import { update } from 'lodash'
import { defineStore } from 'pinia'

export const useUIStore = defineStore({
    id: 'ui-store',
    state: () => {
        return {
            isHome: false,
            menuOpen: false,
            isTransitioning: false,
            isCatTransitioning: false,
            isFetching: false,
            cols: 4,
            pageWipe: false,
            firstLoad: true,
            showLoader: false,
            showHeader: false,
            inverseHeader: false,
            viewportActive: false,
            keystrokes: 0,
            clientSpeaks: 0,
            developerSpeaks: 0,
            mouseX: 0,
            mouseY: 0,
            cursor: null,
            searchOpen: false,
            lastRoute: '' as string | null,
            animationsScroll: 0,
            darkMode: true,
            themeColor: '#bf8ef7' as string,
            showSink: true,
            scPlayer: null as any,
            isPlaying: false,
            journalCat: false
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
        toggleIsCatTransitioning(payload: boolean) {
            this.isCatTransitioning = payload
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
        toggleDarkMode(payload: boolean) {
            this.darkMode = payload
        },
        toggleShowSink(payload: boolean) {
            this.showSink = payload
        },
        toggleIsPlaying(payload: boolean) {
            this.isPlaying = payload
        },
        toggleJournalCat(payload: boolean) {
            this.journalCat = payload
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
        addClientSpeaks() {
            this.clientSpeaks++
        },
        addDeveloperSpeaks() {
            this.developerSpeaks++
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
        updateThemeColor(payload: any) {
            this.themeColor = payload
        },
        updateScPlayer(payload: any) {
            this.scPlayer = payload
        }
    }
})