<script setup lang="ts">


import Code from "~/components/default/Code.vue";

defineProps<{
  nid: string | object
}>()

import Index from "~/components/windows/Index.vue";
import About from "~/components/windows/About.vue";
import Friends from "~/components/windows/Friends.vue";
import Posts from "~/components/windows/Posts.vue";

const winMap = new Map<string, Object>();

winMap.set('index', Index)
winMap.set('about', About)
winMap.set('code', Code)
winMap.set('friends', Friends)
winMap.set('posts', Posts)

</script>

<template>
  <component v-if="typeof nid == 'string'" :is="winMap.get(nid)"></component>
  <component v-else :is="winMap.get(nid.slot)" :data="nid.data"></component>
</template>

<style scoped>

</style>