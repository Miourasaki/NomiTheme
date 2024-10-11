<script setup lang="ts">


import Code from "~/components/default/Code.vue";

defineProps<{
  nid: string
}>()

import Index from "~/components/windows/Index.vue";
import About from "~/components/windows/About.vue";
import Friends from "~/components/windows/Friends.vue";

const winMap = new Map<string, Object>();

winMap.set('index', Index)
winMap.set('about', About)
winMap.set('code', Code)
winMap.set('friends', Friends)

</script>

<template>
  <component :is="winMap.get(nid)" :tid="nid"></component>
</template>

<style scoped>

</style>