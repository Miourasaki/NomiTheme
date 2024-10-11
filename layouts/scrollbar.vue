<script setup lang="ts">
import {useScrollbar} from "~/composables/scrollbar";

const ele = ref<HTMLDivElement>()
const scrY = ref<HTMLDivElement>()
const scrX = ref<HTMLDivElement>()
const sb = useScrollbar()

const style = ref({
  top: 0,
  left: 0,
  height: 0,
  width: 0,
})

const handleEleScroll = (e: Event) => {
  const tg = e.currentTarget as HTMLDivElement
  const t = tg.scrollTop
  const y = tg.scrollHeight

  const l = tg.scrollLeft
  const x = tg.scrollWidth

  style.value.top = t / y
  style.value.left = l / x
}

onMounted(() => {
  if (ele.value) {
    style.value.height = ele.value?.clientHeight / ele.value?.scrollHeight
    ele.value.addEventListener('scroll', handleEleScroll)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMoveStop)
    document.body.addEventListener('mouseleave', handleMoveStop)
  }
})

// TODO 这样有Bug, 以后修
// onUnmounted(() => {
//   ele.value.removeEventListener('scroll', handleEleScroll)
//
//   document.removeEventListener('mousemove', handleMouseMove)
//   document.removeEventListener('mouseup', handleMoveStop)
//   document.body.removeEventListener('mouseleave', handleMoveStop)
// })

const move = ref({
  stateY: false, top: 0, stateX: false, left: 0
})
const handleMouseDownY = (e: MouseEvent) => {
  if (move.value.stateY) return
  const rect = e.target?.getBoundingClientRect();
  let y = e.clientY - rect?.top

  sb.state.value = true
  move.value = {
    stateY: true, top: y
  }
}
const handleMouseDownX = (e: MouseEvent) => {
  if (move.value.stateX) return
  const rect = e.target?.getBoundingClientRect();
  let x = e.clientX - rect?.left

  sb.state.value = true
  move.value = {
    stateX: true, left: x
  }
}

const handleMouseMove = (e: MouseEvent): void => {
  style.value.height = ele.value?.clientHeight / ele.value?.scrollHeight
  style.value.width = ele.value?.clientWidth / ele.value?.scrollWidth
  if (!move.value.stateY) return
  const el = scrY.value
  const rect = el.parentElement.getBoundingClientRect();

  // % ↓
  let y = (e.clientY - (rect?.top || 0) - move.value.top) / el?.clientHeight

  ele.value?.scrollTo({
    top: y * (ele.value?.scrollHeight - ele.value?.clientHeight),
  })
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges(); // 清除所有选中的范围
  }

}
const handleMoveStop = (): void => {
  sb.state.value = false
  move.value.stateY = false
  move.value.stateX = false
}



</script>

<template>
  <div @resize="style.height = ele?.clientHeight / ele?.scrollHeight" ref="ele" class="overflow-auto scrollbar w-full h-full" :class="move.stateY && 'select-none'">
    <div class="absolute w-full h-full inset-0" v-if="move.stateY || move.stateX" />
    <slot/>
    <div v-if="ele?.scrollHeight > ele?.clientHeight"
        class="absolute h-full w-3 right-0 top-0 group transition-all duration-75 text-stone-400
              hover:bg-white hover:bg-opacity-75 hover:backdrop-blur flex flex-col z-10"
         :class="move.stateY && 'bg-white bg-opacity-75 backdrop-blur pointer-events-none'">
      <button @click="()=>{
      const el = ele as HTMLDivElement
      el.scrollBy({
        top: -60,
        behavior: 'smooth'
      })
    }" class="pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100
                    w-full h-3 active:scale-75 transition-all" :class="move.stateY && 'pointer-events-auto opacity-100'">
        <svg class="scale-[2.2]" viewBox="0 0 24 24">
          <path
              d="M8.71 12.29L11.3 9.7a.996.996 0 0 1 1.41 0l2.59 2.59c.63.63.18 1.71-.71 1.71H9.41c-.89 0-1.33-1.08-.7-1.71z"
              fill="currentColor"></path>
        </svg>
      </button>
      <div
          @wheel="(e: WheelEvent) => {
            e.preventDefault()
            ele?.scrollBy({
              top: e.deltaY,
              behavior: 'smooth'
            })
          }"
          class="h-full w-[calc(100%-.4rem)] relative flex items-center justify-center my-[.1rem] mx-[.2rem]">
      <span ref="scrY" @mousedown="handleMouseDownY" :style="{
        top: style.top * 100 + '%',
        height: style.height * 100 + '%',
      }" class="absolute bg-stone-300 group-hover:bg-stone-400 rounded-full w-0.5 group-hover:w-full"
            :class="move.stateY && 'bg-stone-400 w-full'"/>
      </div>
      <button @click="()=>{
      ele?.scrollBy({
        top: 60,
        behavior: 'smooth'
    })
    }" class="pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100
                    w-full h-3 active:scale-75 transition-all" :class="move.stateY && 'pointer-events-auto opacity-100'">
        <svg class="scale-[2.2]" viewBox="0 0 24 24">
          <path
              d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"
              fill="currentColor"></path>
        </svg>
      </button>
    </div>

    <div v-if="ele?.scrollWidth > ele?.clientWidth"
         class="absolute w-full h-3 left-0 bottom-0 group transition-all duration-75 text-stone-400
              hover:bg-white hover:bg-opacity-75 hover:backdrop-blur flex"
         :class="move.stateX && 'bg-white bg-opacity-75 backdrop-blur pointer-events-none'">
      <button @click="()=>{
        const el = ele as HTMLDivElement
        el.scrollBy({
          left: -60,
          behavior: 'smooth'
        })
      }" class="-rotate-90 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100
                    h-full w-3 active:scale-75 transition-all" :class="move.stateX && 'pointer-events-auto opacity-100'">
        <svg class="scale-[2.2]" viewBox="0 0 24 24">
          <path
              d="M8.71 12.29L11.3 9.7a.996.996 0 0 1 1.41 0l2.59 2.59c.63.63.18 1.71-.71 1.71H9.41c-.89 0-1.33-1.08-.7-1.71z"
              fill="currentColor"></path>
        </svg>
      </button>
      <div
          @wheel="(e: WheelEvent) => {
            e.preventDefault()
            // noinspection JSSuspiciousNameCombination
            ele?.scrollBy({
              left: e.deltaY,
              behavior: 'smooth'
            })
          }"
          class="w-full h-[calc(100%-.4rem)] relative flex items-center justify-center mx-[.1rem] my-[.2rem]">
      <span ref="scrX" @mousedown="handleMouseDownX" :style="{
        left: style.left * 100 + '%',
        width: style.width * 100 + '%',
      }" class="absolute bg-stone-300 group-hover:bg-stone-400 rounded-full h-0.5 group-hover:h-full"
            :class="move.stateX && 'bg-stone-400 h-full'"/>
      </div>
      <button @click="()=>{
      ele?.scrollBy({
        left: 60,
        behavior: 'smooth'
    })
    }" class="-rotate-90 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100
                    h-full w-3 active:scale-75 transition-all" :class="move.stateX && 'pointer-events-auto opacity-100'">
        <svg class="scale-[2.2]" viewBox="0 0 24 24">
          <path
              d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"
              fill="currentColor"></path>
        </svg>
      </button>
      <div v-if="ele?.scrollHeight != ele?.clientHeight" class="w-3"></div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar {
  scrollbar-width: none;
}
</style>