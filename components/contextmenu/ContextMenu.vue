<script setup lang="ts">
import {ref} from "vue";
import ContextCopy from "~/components/contextmenu/ContextCopy.vue";
import ContextMenuLine from "~/components/contextmenu/ContextMenuLine.vue";
import ContextMenuItem from "~/components/contextmenu/ContextMenuItem.vue";
import ContextHeader from "~/components/contextmenu/ContextHeader.vue";

const menuStyle = ref({
  left: `0`,
  top: `0`,
})
const master = useMasterStore()
const target = master.contextmenu.target

const menuOpenLast = ref(false)
const menuOpen = master.contextmenu.state
const menuRef = ref<HTMLDivElement | null>(null)

const lastUseOrigin = ref(false)

document.addEventListener('click', () => menuOpen.value = false)
const handleContextMenu = (event: MouseEvent) => {
  if (lastUseOrigin.value) {
    lastUseOrigin.value = false
    return;
  }
  event.preventDefault();
  const tg: HTMLElement = event.target as HTMLElement;
  target.value = tg;
  if (tg.closest(".nomi-context-menu-disable-any")) return;
  if (tg.classList.contains("nomi-context-menu-disable")) return;

  // 获取鼠标位置
  let x = event.clientX;
  let y = event.clientY;

  const offset = {
    height: menuRef.value != null ? menuRef.value?.offsetHeight : 0,
    weight: menuRef.value != null ? menuRef.value?.offsetWidth : 0,
  }
  const inner = {
    height: window.innerHeight | 0,
    weight: window.innerWidth | 0,
  }

  if (y >= inner.height - offset.height - 1) y -= (offset.height - (inner.height - y)) + 1;
  if (x >= inner.weight - offset.weight - 1) x -= (offset.weight - (inner.weight - x)) + 1;

  if (tg.id == "header") y = 28

  // 设置自定义菜单的位置
  menuStyle.value = {
    left: `${x}px`, top: `${y}px`
  }
  menuOpenLast.value = menuOpen.value
  menuOpen.value = true
}
document.addEventListener('contextmenu', handleContextMenu)

// Clean up listener on unmount
onBeforeUnmount(() => {
  document.removeEventListener('contextmenu', handleContextMenu);
});
</script>

<template>
  <div :style="menuStyle" ref="menuRef" :aria-hidden="!menuOpen"
       :class="`${menuOpenLast && 'transition-all duration-150 ease-in-out transform-gpu'}
                ${!menuOpen && 'pointer-events-none'}`"
       class="h-auto w-auto fixed overflow-hidden nomi-context-menu-disable-any">
    <div class="p-1.5 relative z-40 border rounded-xl transition-all duration-200 ease-out transform-gpu
       bg-gray-100 bg-opacity-75 backdrop-blur-sm min-w-44"
         :class="`${!menuOpen && '-translate-y-full'}`">
      <div class="w-auto flex flex-col gap-0.5 text-start">
        <ContextHeader v-if="target?.id == 'header'"/>

        <ContextCopy/>
        <ContextMenuLine/>
        <ContextMenuItem @click="lastUseOrigin = true" aria-label="Use the built-in content menu">使用原生内容菜单
        </ContextMenuItem>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>