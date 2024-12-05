<template>
    <div class="flex items-center justify-between py-4 lg:py-0 border-t-2 lg:border-t-0 border-dotted"
        :style="{ borderColor: $hexToRgba(themeColor, '.3') }">
        <p class="mr-2">soundcloud</p>
        <div class="flex items-center justify-center border-0 py-1 px-2 rounded-xl relative mr-2"
            :style="{ borderColor: themeColor }">
            <div class="pointer-events-none fixed opacity-0">
                <iframe id="soundcloud" ref="player" width="200" height="50" scrolling="no" frameborder="no"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1462148380&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=false&download=false"></iframe>
            </div>
            <svg @click="playPrev()" :style="{ fill: themeColor }"
                class="icon icon-previous w-5 h-5 cursor-pointer hover:opacity-75">
                <use xlink:href="#icon-previous"></use>
            </svg>
            <div @click="togglePlay()"
                class="relative w-5 h-5 cursor-pointer mx-2 flex justify-center items-center hover:opacity-75">
                <div class="z-2 ease-in-out duration-300" :class="[isPlaying ? '' : '']" :style="{
                    borderTop: !isPlaying ? '10px solid transparent' : '0px solid transparent',
                    borderBottom: !isPlaying ? '10px solid transparent' : '0px solid transparent',
                    borderLeft: !isPlaying ? `20px solid ${themeColor}` : `0px solid ${themeColor}`,
                }">
                </div>
                <div class="absolute top-0 ease-in-out duration-300"
                    :class="[isPlaying ? 'h-full top-0 left-1 w-1' : 'h-0 left-2 w-2']"
                    :style="{ backgroundColor: themeColor }"></div>
                <div class="absolute top-0 ease-in-out duration-400"
                    :class="[isPlaying ? 'h-full bottom-0 right-1 w-1' : 'h-0 right-2 w-2']"
                    :style="{ backgroundColor: themeColor }"></div>
            </div>
            <svg @click="playNext()" :style="{ fill: themeColor }"
                class="icon icon-next w-5 h-5 cursor-pointer hover:opacity-75">
                <use xlink:href="#icon-next"></use>
            </svg>
        </div>
        <a class="hover:opacity-75" title="Noyt on Soundcloud" target="_blank" href="https://soundcloud.com/noyt-music">
            <svg :style="{ fill: themeColor }" class="icon icon-soundcloud w-8 h-8">
                <use xlink:href="#icon-soundcloud"></use>
            </svg>
        </a>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from 'nuxt/app';
import { ref, watch, onMounted } from 'vue';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

const ui = useUIStore();
const { updateScPlayer, toggleIsPlaying } = ui;
const { themeColor, isPlaying, scPlayer } = storeToRefs(ui);

const player = ref<HTMLIFrameElement | null>(null)
const widget = ref<any>(null)
const playerLoaded = ref(false);

const { $hexToRgba } = useNuxtApp() as any;

const initPlayer = async () => {
    if (!scPlayer.value && player.value) {
        if (typeof window !== 'undefined' && 'SC' in window) {
            widget.value = window.SC.Widget(player.value);

            // Bind the READY event
            widget.value.bind(window.SC.Widget.Events.READY, function () {
                console.log('Widget is ready.');

                // Bind additional events
                widget.value.bind(window.SC.Widget.Events.PLAY, function () {
                    widget.value.getCurrentSound(function (sound: any) {
                        console.log('Now playing:', sound?.title || 'Unknown');
                    });
                });

                widget.value.bind(window.SC.Widget.Events.FINISH, playNext);

                // Update the reactive scPlayer reference
                updateScPlayer(widget);

                // Optional: Start playing immediately
                widget.value.play();
            });

            playerLoaded.value = true;
        }
    }
};

const togglePlay = () => {
    toggleIsPlaying(!isPlaying.value);
};

const playPrev = () => {
    scPlayer.value?.getCurrentSoundIndex((index: number) => {
        if (index < 1) {
            scPlayer.value?.skip(2);
        } else {
            scPlayer.value?.prev();
        }
        toggleIsPlaying(true);
        scPlayer.value?.seekTo(0);
    });
};

const playNext = () => {
    scPlayer.value?.getCurrentSoundIndex((index: number) => {
        if (index < 2) {
            scPlayer.value?.next();
        } else {
            scPlayer.value?.skip(0);
        }
        ui.toggleIsPlaying(true);
        scPlayer.value?.seekTo(0);
    });
};

watch(scPlayer, (val) => {
    console.log("SoundCloud Widget initialized:", val);
});

watch(isPlaying, (val) => {
    if (widget.value) {
        val ? widget.value.play() : widget.value.pause();
    } else {
        console.warn('scPlayer is not initialized yet.');
    }
});

onMounted(() => {
    // console.log(player.value)
    if (player.value) {
        setTimeout(initPlayer, 100);
    }
});

</script>