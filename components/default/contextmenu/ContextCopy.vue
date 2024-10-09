<script setup lang="ts">

import ContextMenuItem from "~/components/default/contextmenu/ContextMenuItem.vue";
import {CommandIcon} from "~/components/default/contextmenu/MasterKeyIcon";

const master = useMasterStore()

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

const copySelected = () => {
  const selectedText = window.getSelection()?.toString() || '';
  if (selectedText) copyToClipboard(selectedText);
}
const select = ref(false)

watch(master.contextmenu.state, () => {
  // console.log(window.getSelection()?.toString())
  select.value = !(master.contextmenu.state.value &&
      window.getSelection()?.toString() != "");
})


const parseClipboard = ()=> {
  navigator.clipboard.readText().then((r) => {
    const tg = master.contextmenu.target;
    tg.value.value += r

  })
}
</script>

<template>
  <ContextMenuItem :on-click="copySelected" :disabled="select">复制
    <template #key>
      Ctrl <CommandIcon /> + C
    </template>
  </ContextMenuItem>
  <ContextMenuItem :on-click="parseClipboard"
      :disabled="master.contextmenu.target.value?.tagName != 'INPUT'">
    粘贴
    <template #key>
      Ctrl <CommandIcon /> + V
    </template>
  </ContextMenuItem>
</template>

<style scoped>

</style>