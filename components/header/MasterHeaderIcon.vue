<script setup lang="ts">

const menu = ref(false)
const menuHidden = ref(true)
const changMenu = (c:boolean) => {
  if (c) {
    menuHidden.value = false
    setTimeout(() => {menu.value = true},10)
  }else {
    menu.value = false
    setTimeout(() => {menuHidden.value = true}, 150)
  }
}

watch(menu, () => {
  let time
  if (!menu.value) time = 500
  else time = 0


})

const props = defineProps<{
  menuPosition?: "left" | "center" | "right"
  disabled?: boolean
}>()

</script>

<template>
  <div class="h-full relative nomi-context-menu-disable-any">
    <button @click="changMenu(!menu)" :disabled="disabled"
            :class="menu && 'bg-gray-300 bg-opacity-65 backdrop-blur'"
            class="flex gap-3 items-center px-2.5 h-full text-[0.9rem]
    hover:bg-gray-300 hover:bg-opacity-65 hover:backdrop-blur rounded-md
    transition-all ease-in-out transform-gpu group duration-500">
      <slot />
    </button>
    <div v-if="menu" class="fixed w-full h-full inset-0 z-10"
         @click="menu = false"
         @contextmenu="menu = false"
    ><div id="header" class="h-7 w-full"></div></div>
    <div class="w-auto h-auto absolute top-9 overflow-hidden z-20"
         :class="`${!menu && 'pointer-events-none'} ${menuHidden && 'hidden'}
                  ${props.menuPosition == 'left' && 'left-0'}
                  ${props.menuPosition == 'center' && 'right-1/2 translate-x-1/2'}
                  ${props.menuPosition == 'right' && 'right-0'}`">
      <div :class="`${!menu && '-translate-y-[calc(100%+4rem)]'}`"
           class="p-1.5 border rounded-xl z-20 transition-all ease-out transform-gpu
    bg-opacity-80 backdrop-blur-[6px] bg-gray-100 w-auto">
        <slot name="menu" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>