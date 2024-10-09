<script setup lang="ts">


defineProps<{
  nid: string
}>()

import Index from "~/components/windows/Index.vue";
import About from "~/components/windows/About.vue";

const winMap = new Map<string, Object>();

winMap.set('index', Index)
winMap.set('about', About)

</script>

<template>
  <component :is="winMap.get(nid)" :tid="nid"></component>
</template>

<style scoped>

</style>