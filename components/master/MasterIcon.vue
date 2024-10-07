<script setup lang="ts">

import {fa} from "cronstrue/dist/i18n/locales/fa";

const menu = ref(false)

const props = defineProps<{
  menuPosition?: "left" | "center" | "right"
}>()

</script>

<template>
  <div class="h-full relative">
    <button @click="menu = !menu"
            :class="menu && 'bg-gray-300 bg-opacity-65 backdrop-blur'"
            class="flex gap-3 items-center px-2.5 h-full text-[0.9rem]
    hover:bg-gray-300 hover:bg-opacity-65 hover:backdrop-blur rounded-md
    transition-all ease-in-out transform-gpu group duration-500">
      <slot />
    </button>
    <div v-if="menu" @click="menu = false" class="fixed w-full h-full inset-0 -z-20"></div>
    <div :class="`${!menu && '-translate-y-[calc(100%+4rem)] opacity-0'}
                  ${props.menuPosition == 'left' && 'left-0'}
                  ${props.menuPosition == 'center' && 'right-1/2 translate-x-1/2'}
                  ${props.menuPosition == 'right' && 'right-0'}`"
          class="absolute px-3 py-4 border top-9 rounded-xl -z-10
    bg-opacity-80 backdrop-blur-[6px] bg-gray-100 transition-all ease-out transform-gpu">
      <slot name="menu" />
    </div>
  </div>
</template>

<style scoped>

</style>