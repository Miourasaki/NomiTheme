<script setup lang="ts">
import defineWindow from "~/utils/defineWindow";
const route = useRoute()

const id = `${route.params.id}`

const post = await useAsyncData("Get Note Data", async () => {
  return useFetch('/api/note', {
    params: {
      id: id
    }
  });
})

defineWindow(`/notes/${id}`, {
  title: useMasterStore().info.value.name + "的日记本",
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