<script setup lang="ts">
const menuOpen = useMasterStore().contextmenu
const props = defineProps<{
  onClick?: (event: Event) => void
  to?: string
  disabled?: boolean
}>()

</script>

<template>
  <a :href="to" :tabindex="(!menuOpen || disabled) ? -1: 1" @click="(e)=>{
    e.preventDefault()
    if (!disabled) {
      if (to) useRouter().push(to)
      else if (onClick) onClick(e)
    }
  }"
          :class="!disabled && 'hover:bg-slate-400 hover:text-white cursor-pointer '+
                  'focus-visible:bg-slate-400 focus-visible:text-white focus-visible:outline-0'"
          class="transition-all duration-200 ease-in-out transform-gpu rounded-md group w-full
          py-[.1rem] pb-[.13rem] px-3 flex items-center justify-between select-none text-[.88rem]">
    <div :class="props.disabled && 'text-gray-300'">
      <slot/>
    </div>
    <div :class="props.disabled ? 'text-gray-300' :
         'text-gray-500 group-hover:text-white group-focus-visible:text-white'"
         class="font-light text-[.8rem] flex items-center
         transition-all duration-200 ease-in-out transform-gpu
         ">
      <slot name="key"/>
    </div>
  </a>
</template>

<style scoped>

</style>