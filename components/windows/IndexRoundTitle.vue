<script setup lang="ts">
const props = defineProps<{
  to?: string
  color?: string
}>()
</script>

<template>
  <a :href="to" @click="(e)=>{
    e.preventDefault()
    if (to) {
      if (to.includes('http://') ||to?.includes('https://')) location.href = to
      else useRouter().push(to)
    }
  }" class="flex select-none">
    <div
        :style="{
            backgroundColor: color? color : 'rgb(206,182,213)',
        }"
        class="w-auto h-9 rounded-full border border- range-500 overflow-hidden text-gray-100 flex items-center">
      <div v-if="$slots.icon" class="h-full w-[calc(2.25rem-2px)] rounded-full px-2 flex items-center justify-center"
           :class="$slots.default && 'bg-black bg-opacity-30'">
        <slot name="icon" />
      </div>
      <div v-if="$slots.default" class="font-medium font-sans text-sm px-4"><slot /></div>
      <div v-if="$slots.default && $slots.icon" class="w-3"></div>
    </div>
  </a>
</template>

<style scoped>

</style>