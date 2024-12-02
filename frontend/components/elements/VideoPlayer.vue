<template>
    <ClientOnly>
        <div @dblclick="toggleFullscreen" class="video__player w-full">
            <div class="relative aspect-video w-full overflow-hidden">
                <iframe ref="vimeoPlayerIframe" :src="videoUrl"
                    class="absolute z-1 top-0 w-full h-full pointer-events-none lg:pointer-events-all" width="640"
                    height="360" frameborder="0"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowfullscreen="true">
                </iframe>
            </div>
            <div v-if="controls" class="player__controls relative py-half-space bg-transparent"
                @mouseenter="updateCursor({ type: 'link', title: '' })" @mouseleave="updateCursor(null)">
                <div class="container-md w-full flex flex-row gap-4 justify-between items-center">
                    <slot name="navigation"></slot>
                    <button ref="btnPlayPause" @click="handlePlayPauseClick" class="border-0 cursor-pointer w-5 h-5"
                        accesskey="P">
                        <svg v-if="playPause == 'pause'" class="icon icon-pause w-full h-full fill-white mt-[2px]">
                            <use xlink:href="#icon-pause"></use>
                        </svg>
                        <svg v-if="playPause == 'play'" class="icon icon-play w-full h-full fill-white mt-[2px]">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </button>
                    <div class="relative flex items-center pt-[3px] duration-[.5s] ease-in-out group/volume">
                        <button @click="handleMuteUnmuteClick">
                            <svg class="icon icon-volume-mute w-5 h-5 fill-white">
                                <use v-if="volume == 0" xlink:href="#icon-volume-mute"></use>
                                <use v-if="volume > 0 && volume < 33" xlink:href="#icon-volume-low"></use>
                                <use v-if="volume > 32 && volume < 66" xlink:href="#icon-volume-medium"></use>
                                <use v-if="volume > 65" xlink:href="#icon-volume-high"></use>
                            </svg>
                        </button>
                        <div
                            class="w-full flex items-center h-5 max-w-0 group-hover/volume:max-w-16 overflow-hidden duration-[.5s]">
                            <input @change="changeVolume()" id="minmax-range" type="range" min="0" max="100"
                                v-model="volume" step="1"
                                class="w-full ml-2 h-[5px] bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-white">
                        </div>
                    </div>
                    <div class="flex-1 relative">
                        <input ref="progressBar"
                            class="progress-bar controls__progress-bar w-full h-[3px] -translate-y-[1px] bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-white"
                            type="range" min="0" max="100" step="1" value="0">
                        <div class="absolute left-0 h-[3px] top-1/2 bg-white rounded-lg"
                            :style="{ width: `calc(${progress}%)` }"></div>
                    </div>
                    <slot name="fullscreen"></slot>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useUIStore } from '@/store/ui';

const props = defineProps({
    video_id: { type: String, required: false, default: '530293523' },
    autoplay: { type: Boolean, required: false, default: true },
    controls: { type: Boolean, required: false, default: true },
    set_muted: { type: Boolean, required: false, default: true },
    set_play: { type: Boolean, required: false, default: true }
});

const ui = useUIStore();
const { updateCursor } = ui;

const vimeoPlayerIframe = ref(null);
const btnPlayPause = ref(null);
const progressBar = ref(null);
const volume = props.set_muted ? ref(0) : ref(100);
const progress = ref(0);
const playPause = props.set_play ? ref('pause') : ref('play');
const muted = props.set_muted ? ref(true) : ref(false);
const isFullscreen = ref(false);
const vimeoScriptLoaded = ref(false);
let vimeoPlayer = null;

// Load Vimeo API script
const loadVimeoScript = () => {
    return new Promise((resolve, reject) => {
        if (vimeoScriptLoaded.value) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.nonce = 'oaviE8XB7IRqBhKCz1Oz'; // Match your CSP nonce
        script.onload = () => {
            vimeoScriptLoaded.value = true;
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

// Play/pause button handler
const handlePlayPauseClick = () => {
    if (!vimeoPlayer) return;
    vimeoPlayer.getPaused().then((paused) => {
        if (paused) {
            vimeoPlayer.play();
            playPause.value = 'pause';
        } else {
            vimeoPlayer.pause();
            playPause.value = 'play';
        }
    });
};

// Mute/unmute button handler
const handleMuteUnmuteClick = () => {
    if (!vimeoPlayer) return;
    vimeoPlayer.getVolume().then((amount) => {
        if (amount === 0 || muted.value) {
            vimeoPlayer.setVolume(1);
            volume.value = 100;
            muted.value = false;
        } else {
            vimeoPlayer.setVolume(0);
            volume.value = 0;
            muted.value = true;
        }
    });
};

const getVimeoIdFromString = (string) => {
    // only regex if is not an id but an URL
    if (string.includes('vimeo.com') == false) return string;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)([0-9]+)/;
    const match = string.match(regex);
    return match ? match[1] : null;
}

const createVideoUrl = () => {
    const data = {
        autoplay: props.set_play,
        playsinline: true,
        loop: true,
        muted: props.set_muted,
        controls: false
    }
    let id = getVimeoIdFromString(props.video_id);
    const url_arr = id.split("/");
    if (url_arr.length > 1) {
        id = url_arr[0]
        data['h'] = url_arr[1]
    }
    const urlParams = new URLSearchParams(data);
    return `https://player.vimeo.com/video/${id}/?${urlParams}`
}

const videoUrl = createVideoUrl();

const changeVolume = () => {
    if (!vimeoPlayer) return;
    vimeoPlayer.setVolume(volume.value / 100);
}

// Fullscreen toggle handler
const toggleFullscreen = () => {
    if (!vimeoPlayerIframe.value) return;
    if (!isFullscreen.value) {
        vimeoPlayerIframe.value.requestFullscreen().then(() => {
            isFullscreen.value = true;
        });
    } else {
        document.exitFullscreen().then(() => {
            isFullscreen.value = false;
        });
    }
};

const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement;
};

watch(() => props.set_play, (val) => {
    val ? vimeoPlayer.play() : vimeoPlayer.pause();
    playPause.value = val ? 'pause' : 'play';
});

watch(() => props.set_muted, (val) => {
    vimeoPlayer.setVolume(val ? 0 : 1);
    muted.value = val;
    volume.value = val ? 0 : 100;
});

onMounted(() => {
    loadVimeoScript().then(() => {
        // playPause.value = props.set_play ? 'play' : 'pause';
        vimeoPlayer = new Vimeo.Player(vimeoPlayerIframe.value);
        if (props.autoplay) vimeoPlayer.play();
        vimeoPlayer.on('timeupdate', (data) => {
            progress.value = (data.seconds / data.duration) * 100;
            progressBar.value.value = progress.value;
        });
        if (!progressBar.value) return;
        progressBar.value.addEventListener('input', (e) => {
            const progress = e.target.value;
            vimeoPlayer.getDuration().then((duration) => {
                vimeoPlayer.setCurrentTime((progress / 100) * duration);
            });
        });
    });
    document.addEventListener("fullscreenchange", handleFullscreenChange);
});

onUnmounted(() => {
    if (vimeoPlayer) vimeoPlayer.unload();
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
});
</script>
