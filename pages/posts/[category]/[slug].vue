<script setup lang="ts">
import defineWindow from "~/utils/defineWindow";
import {useDataStore} from "~/composables/data";
const route = useRoute()

const sid = `${route.params.category}/${route.params.slug}`

const post = await useAsyncData("Get Post Data", async () => {
  return useFetch('/api/post', {
    params: {
      id: sid
    }
  });
})

defineWindow(`/posts/${sid}`, {
  title: useMasterStore().info.value.name + "的笔记本",
  titleColor: [210,210,210],
  size: {width:980, height:570},
  minSize: {width:650, height: 32},
  maxSize: {width: 1320, height:760},
  slot: {
    slot: 'posts',
    data: post.data

  }
})

</script>

<template>

</template>

<style scoped>

</style>