<script setup lang="ts">

const props = defineProps<{
  data?: object
}>()

const post = ref(props.data?.data || {title: "", text: ""})


</script>

<template>

  <div class="w-full flex items-center flex-col ">
    <div class="w-full flex justify-center">
      <div class="max-w-[66rem] min-w-[40rem] w-full px-20">
<!--s-->
        <div class="mt-10 text-xl">{{post.title}}</div>
        <div class="mt-12  w-full">
          <MarkdownMain :text="post.text"></MarkdownMain>
        </div>

        <DevData>
          {{ post }}
        </DevData>

<!--d-->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>