<script setup lang="ts">

import MasterHeaderIcon from "~/components/header/MasterHeaderIcon.vue";
import {useClient} from "~/components/client";

const client = await useClient();
onMounted(()=>{
  client.user.login("mio", "Key-082706")

})
</script>

<template>
  <MasterHeaderIcon menu-position="right">
    <div class="w-5 h-5">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" fill="currentColor"></path></svg>
    </div>
    <template #menu>
      <div class="px-2.5 py-3 border flex items-center justify-between w-48 rounded-lg from-gray-100 to-gray-300 bg-gradient-to-l bg-opacity-30 backdrop-blur-sm">
        <div>
<div></div>
        </div>
<div class="flex flex-col items-end leading-4">
  <div class="font-medium tracking-tighter">白澪 · 卡丝蕾特</div>
  <div class="text-sm text-gray-400 font-light tracking-tighter">mio@chyan.moe</div>
</div>
      </div>
    </template>
  </MasterHeaderIcon>
</template>

<style scoped>

</style>