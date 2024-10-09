<script setup lang="ts">
import Scrollbar from "~/layouts/scrollbar.vue";
import {useScrollbar} from "~/composables/scrollbar";
import {useDock} from "~/composables/dock";

const win = ref<HTMLElement>()

const {
  sid= "" ,title = "",
  fullscreen = false,
  defaultSize = {width: 960, height: 560},
  minSize = {width: 340, height: 32},
  maxSize = {width: 960, height: 560},
  defaultPosition = {left: 60, top: 60}
} = defineProps<{
  sid: string,
  title?: string,
  fullscreen: boolean,
  defaultSize?: { width: number, height: number },
  minSize?: { width: number, height: number },
  maxSize?: { width: number, height: number },
  defaultPosition?: { left: number, top: number },
}>()

const style = ref({
  width: defaultSize?.width,
  height: defaultSize?.height,
  fullscreen: false,

  left: defaultPosition?.left,
  top: defaultPosition?.top,
})
onMounted(()=>{
  if (fullscreen) setFullScreen(true)
})
const windowAnim = ref(false);
const setFullScreen = (v: boolean) => {
  style.value.fullscreen = v
  if (v) windowAnim.value = true
  else setTimeout(() => windowAnim.value = false, 300)
}


const f = useDock().fullscreen
f.value = style.value.fullscreen
watch(style.value, ()=>f.value = style.value.fullscreen)

const handleFocus = (e: FocusEvent) => {
  if (style.value.fullscreen) f.value = true
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mousemove', handleAllResize)
  document.addEventListener('mouseup', handleMoveStop)
  document.body.addEventListener('mouseleave', handleMoveStop)
})
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mousemove', handleAllResize)
  document.removeEventListener('mouseup', handleMoveStop)
  document.body.removeEventListener('mouseleave', handleMoveStop)
})

const sb = useScrollbar()


// Move Handle
const move = ref({
  state: false,
  left: 0, top: 0
})

const handleMouseDown = (e: MouseEvent) => {

  let x = e.clientX - style.value.left
  let y = e.clientY - style.value.top

  if (style.value.fullscreen) y += style.value.top - 28

  move.value = {
    state: true, left: x, top: y
  }
}
const handleMouseMove = (e: MouseEvent): void => {
  if (!move.value.state) return
  if (style.value.fullscreen) {
    style.value.fullscreen = false
    windowAnim.value = false
    // style.value.top += move.value.top
    // move.value.top = 28
  }

  let x = e.clientX
  let y = e.clientY

  x -= move.value.left || 0
  y -= move.value.top || 0

  if (y <= 28) y = 28;
  style.value.left = x
  style.value.top = y


}
const handleMoveStop = (): void => {
  move.value.state = false
  direction.value = null
}


// Windows Size Handle
const direction = ref<"nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | null>(null)

const handleNResize = (e: MouseEvent) => {
  let y = style.value.top - e.clientY
  if (allowYResize(y)) return
  if (style.value.top <= 28) return
  style.value.height += y
  style.value.top -= y
}
const handleEResize = (e: MouseEvent) => {

  let x = e.clientX - (style.value.left + style.value.width)
  if (allowXResize(x)) return
  style.value.width += x
}
const handleSResize = (e: MouseEvent) => {
  let y = e.clientY - (style.value.top + style.value.height)
  if (allowYResize(y)) return
  style.value.height += y
}
const handleWResize = (e: MouseEvent) => {
  let x = style.value.left - e.clientX
  if (allowXResize(x)) return
  style.value.width += x
  style.value.left -= x
}

const allowXResize = (x: number = 0): boolean => {
  if (x > 0 && style.value.width >= maxSize?.width) {
    style.value.width = maxSize?.width
    return true
  }
  if (x < 0 && style.value.width <= minSize?.width) {
    style.value.width = minSize?.width
    return true
  }
  return false
}
const allowYResize = (y: number = 0): boolean => {
  if (y > 0 && style.value.height >= maxSize?.height) {
    style.value.height = maxSize?.height
    return true
  }
  if (y < 0 && style.value.height <= minSize?.height) {
    style.value.height = minSize?.height
    return true
  }
  return false
}

const handleAllResize = (e: MouseEvent) => {
  if (direction.value == null) return
  else if (direction.value == "nw") {
    handleWResize(e)
    handleNResize(e)
  } else if (direction.value == "n") handleNResize(e)
  else if (direction.value == "ne") {
    handleNResize(e)
    handleEResize(e)
  } else if (direction.value == "e") handleEResize(e)
  else if (direction.value == "se") {
    handleEResize(e)
    handleSResize(e)
  } else if (direction.value == "s") handleSResize(e)
  else if (direction.value == "sw") {
    handleSResize(e)
    handleWResize(e)
  } else if (direction.value == "w") handleWResize(e)

  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges(); // 清除所有选中的范围
  }
}


</script>

<template>
  <div @click="handleFocus" @scroll="handleFocus" :style="{
    left: style.fullscreen? 0 : style.left + 'px',
    top:  style.fullscreen? '28px' : style.top + 'px',
    width:  style.fullscreen? '100%' : style.width + 'px',
    height: style.fullscreen? 'calc(100% - 28px)' : style.height + 'px',
  }" ref="win" class="fixed"
       :class="windowAnim && 'transition-all duration-300 ease-in-out transform-gpu'">
    <div class="w-full h-full overflow-hidden flex flex-col border transition-all"
         :class="style.fullscreen? 'border-t-0': 'rounded-lg'">
      <header @mousedown="handleMouseDown" @dblclick="(e)=>{
                if (e.target?.tagName == 'HEADER') setFullScreen(!style.fullscreen)
              }"
              class="min-h-8 w-full bg-orange-100 bg-opacity-80 backdrop-blur border-b border-b-amber-200
                 flex items-center justify-between px-4 text-sm text-stone-700 select-none overflow-hidden"
              :class="style.fullscreen? '': ''">
        <header class="w-1/3 flex flex-row-reverse items-center justify-end gap-2.5">
          <button
              class="w-[.9rem] h-[.9rem] rounded-full bg-green-500 border border-green-600 transition-all
                   hover:bg-green-600"/>
          <button
              @click="setFullScreen(!style.fullscreen)"
              class="w-[.9rem] h-[.9rem] rounded-full bg-yellow-500 border border-yellow-600 transition-all
                   hover:bg-yellow-600"/>
          <button
              class="w-[.9rem] h-[.9rem] rounded-full bg-red-500 border border-red-600 transition-all
                   hover:bg-red-600"/>
        </header>
        <header class="w-1/3 flex items-center justify-center pointer-events-none">{{ title }}</header>
        <header class="w-1/3">
          <slot name="title"/>
        </header>
      </header>
      <div class="flex-grow w-full bg-white bg-opacity-75 backdrop-blur overflow-hidden flex flex-col justify-between">
        <Scrollbar>
          <slot/>
        </Scrollbar>
        <!--        <div v-if="style.fullscreen" class="w-full min-h-[27px] bg-black"/>-->
      </div>
    </div>


    <div control v-if="!sb.state.value">
      <span @mousedown="direction = 'nw'"
            class="absolute -top-2 -left-2 w-3 h-3 bg-transparent cursor-nw-resize z-20"></span>
      <div @mousedown="direction = 'n'"
           class="absolute -top-1.5 w-full h-1.5 bg-transparent cursor-n-resize z-10"></div>
      <span @mousedown="direction = 'ne'"
            class="absolute -top-2 -right-2 w-3 h-3 bg-transparent cursor-ne-resize z-20"></span>
      <div @mousedown="direction = 'e'"
           class="absolute top-0 -right-1.5 w-1.5 h-full bg-transparent cursor-e-resize z-10"></div>
      <span @mousedown="direction = 'se'"
            class="absolute -bottom-2 -right-2 w-3 h-3 bg-transparent cursor-se-resize z-20"></span>
      <div @mousedown="direction = 's'"
           class="absolute -bottom-1.5 w-full h-1.5 bg-transparent cursor-s-resize z-10"></div>
      <span @mousedown="direction = 'sw'"
            class="absolute -bottom-2 -left-2 w-3 h-3 bg-transparent cursor-sw-resize z-20"></span>
      <div @mousedown="direction = 'w'"
           class="absolute top-0 -left-1.5 w-1.5 h-full bg-transparent cursor-w-resize z-10"></div>
    </div>
  </div>
</template>

<style scoped>

</style>