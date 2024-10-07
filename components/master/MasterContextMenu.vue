<script setup lang="ts">

import {fa} from "cronstrue/dist/i18n/locales/fa";

const menuStyle = ref({
  left: 0,
  top: 0,
})
const menuOpenLast = ref(false)
const menuOpen = ref(false)

// const master = document.getElementById('master');
document.addEventListener('click', (e) => {
  menuOpen.value = false
})
document.addEventListener('contextmenu', (event: Event) => {
  event.preventDefault();

  // 获取鼠标位置
  const x = event.clientX;
  const y = event.clientY;

  // 设置自定义菜单的位置
  menuStyle.value = {
    left: `${x}px`, top: `${y}px`
  }
  menuOpenLast.value = menuOpen.value
  menuOpen.value = true
})

</script>

<template>


  <div :style="menuStyle"
       :class="`${!menuOpen && 'pointer-events-none'} ${menuOpenLast && 'transition-all duration-150 ease-in-out transform-gpu'}`"
       class="h-auto w-auto fixed overflow-hidden">
    <div :class="!menuOpen && '-translate-y-full'"
         class="px-3 py-4 relative z-40 border rounded-xl
  bg-gray-200 bg-opacity-75 backdrop-blur-sm transition-all duration-200 ease-out transform-gpu">
      <div class="w-48 h-56"></div>

    </div>
  </div>
</template>

<style scoped>

</style>