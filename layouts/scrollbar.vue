<script setup lang="ts">
const ele = ref<HTMLDivElement | null>(null as HTMLDivElement)

const style = ref({
  top: 0,
  height: 0,
})
onMounted(()=>{
  if (ele.value) {
    style.value.height = ele.value?.offsetHeight * 100 / ele.value?.scrollHeight
    ele.value.addEventListener('scroll', (e: Event) => {
      const tg = e.currentTarget as HTMLDivElement
      const t = tg.scrollTop
      const y = tg.scrollHeight
      const c = tg.offsetHeight

      style.value.top = 100*t /y
      style.value.height = 100*c /y
    })
  }
})
</script>

<template>
<div ref="ele" class="overflow-auto scrollbar">
  <slot />
  <div class="absolute h-full w-3 right-0 top-0 group transition-all duration-75 text-stone-400
              hover:bg-white hover:bg-opacity-75 hover:backdrop-blur flex flex-col">
    <button @click="()=>{
      const el = ele as HTMLDivElement
      el.scrollBy({
        top: -60,
        behavior: 'smooth'
    })
    }" class="pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100
                    w-full h-3 active:scale-75 transition-all">
      <svg class="scale-[2.2]" viewBox="0 0 24 24"><path d="M8.71 12.29L11.3 9.7a.996.996 0 0 1 1.41 0l2.59 2.59c.63.63.18 1.71-.71 1.71H9.41c-.89 0-1.33-1.08-.7-1.71z" fill="currentColor"></path></svg>
    </button>
    <div class="h-full w-[calc(100%-.4rem)] relative flex items-center justify-center my-[.1rem] mx-[.2rem] pointer-events-none">
      <span :style="{
        top: style.top + '%',
        height: style.height + '%',
      }" class="absolute bg-stone-300 group-hover:bg-stone-400 rounded-full w-0.5
                group-hover:w-full transition-all duration-75" />
    </div>
    <button @click="()=>{
      const el = ele as HTMLDivElement
      el.scrollBy({
        top: 60,
        behavior: 'smooth'
    })
    }" class="pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100
                    w-full h-3 active:scale-75 transition-all">
      <svg class="scale-[2.2]" viewBox="0 0 24 24"><path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z" fill="currentColor"></path></svg>
    </button>
  </div>
</div>
</template>

<style scoped>
.scrollbar {
  scrollbar-width: none;
}
</style>