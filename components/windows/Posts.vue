<script setup lang="ts">
import {useDataStore} from "~/composables/data";
import axios from "axios";

const props = defineProps<{
  data?: object
}>()

const post = ref(props.data.data)

// onMounted(()=>{
//    axios.get(`/api/post?id=${props.data.sid}`)
//       .then((r) => post.value = r.data);
//
// })

</script>

<template>

  <div class="w-full flex items-center flex-col ">
    <div class="w-full flex justify-center">
      <div class="max-w-[66rem] min-w-[40rem] w-full px-20">
<!--s-->
        <div class="mt-10 text-xl">{{post.title}}</div>
        <div class="mt-4 w-full">
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