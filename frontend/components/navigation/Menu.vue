<template>
    <nav class="main-nav flex flex-col lg:flex-row items-center lg:justify-between lg:gap-none">
        <ul
            class="flex flex-col lg:flex-row w-full lg:w-auto text-center lg:text-left gap-single-space lg:justify-between">
            <li>
                <NavigationLink :item="{ url: '/over', title: 'Over CSD' }"></NavigationLink>
            </li>
            <li>
                <NavigationLink :item="{ url: '/lessen', title: 'Lessen' }"></NavigationLink>
            </li>
            <li>
                <NavigationLink :item="{ url: '/templates', title: 'Templates' }"></NavigationLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
const ui = useUIStore();
const { updateCursor } = ui;
const { searchOpen, lastRoute, menuOpen } = storeToRefs(ui);
</script>