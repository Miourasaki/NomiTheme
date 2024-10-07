<script setup lang="ts">

import {fa} from "cronstrue/dist/i18n/locales/fa";

const menu = ref(false)

const props = defineProps<{
  menuPosition?: "left" | "center" | "right"
}>()

</script>

<template>
  <div class="h-full relative nomi-context-menu-disable-any">
    <button @click="menu = !menu"
            :class="menu && 'bg-gray-300 bg-opacity-65 backdrop-blur'"
            class="flex gap-3 items-center px-2.5 h-full text-[0.9rem]
    hover:bg-gray-300 hover:bg-opacity-65 hover:backdrop-blur rounded-md
    transition-all ease-in-out transform-gpu group duration-500">
      <slot />
    </button>
    <div v-if="menu" class="fixed w-full h-full inset-0 z-10"
         @click="menu = false"
         @contextmenu="menu = false"
    ><div id="header" class="h-7 w-full"></div></div>
    <div class="w-auto h-auto absolute top-9 overflow-hidden z-20" :class="`
                  ${!menu && 'pointer-events-none'}
                  ${props.menuPosition == 'left' && 'left-0'}
                  ${props.menuPosition == 'center' && 'right-1/2 translate-x-1/2'}
                  ${props.menuPosition == 'right' && 'right-0'}`">
      <div :class="`${!menu && '-translate-y-[calc(100%+4rem)]'}`"
           class="px-3 py-4 border rounded-xl z-20 transition-all ease-out transform-gpu
    bg-opacity-80 backdrop-blur-[6px] bg-gray-100">
        <slot name="menu" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>