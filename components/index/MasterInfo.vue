<script setup lang="ts">

const master = useMasterStore()
const info = master.info

</script>

<template>
<div class="p-10 border">
  <div class="flex items-center gap-8 h-32">
    <a :href="info.url" aria-label="To Homepage" class="group">
      <img :src="info.avatar" :alt="`${info.name}'s avatar`"
           class="w-32 h-full rounded-full group-hover:p-4 group-hover:rotate bg-slate-300
          transition-all ease-in-out duration-500 transform-gpu bg-opacity-30 backdrop-blur"/>
    </a>
    <div class="flex flex-col items-start justify-between h-full pt-4">
      <div class="flex flex-col gap-1">
        <div class="text-2xl font-medium text-stone-600">{{info.name}}</div>
        <div class="text-sm font-light text-stone-600">{{info.introduce}}</div>
      </div>
      <div class="flex gap-2">
        <button class="w-8 h-8 rounded-full bg-red-300"></button>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped>
.group:hover .group-hover\:rotate {
  transform: rotate3d(1, 1, 1, 45deg);
}
</style>