<script setup lang="ts">

import ContextMenuItem from "~/components/default/contextmenu/ContextMenuItem.vue";

const dev = ref(false)

</script>

<template>
  <DevOnly>
    <div class="text-xs text-stone-500 opacity-40">
    <div class="absolute top-2 left-2">
      <ContextMenuItem @click="dev = !dev">{{dev? 'close' : 'open'}}</ContextMenuItem>
    </div>
    <Context v-if="dev">
    <div class="w-[calc(100%-1rem)] flex justify-between items-end absolute left-2 bottom-2 pointer-events-none">
      <div class="select-none max-w-[50rem]">
        <slot/>
      </div>
    </div>
    <div class="absolute bottom-2 right-2"><slot name="form" /></div>
    </Context>
    </div>
  </DevOnly>
</template>

<style scoped>

</style>