<script setup lang="ts">

import ContextMenuLine from "~/components/default/contextmenu/ContextMenuLine.vue";
import ContextMenuItem from "~/components/default/contextmenu/ContextMenuItem.vue";
</script>

<template>
  <ContextMenuItem to="/about">
    关于系统
  </ContextMenuItem>
  <ContextMenuItem>
    终端
  </ContextMenuItem>
  <ContextMenuLine/>
  <ContextMenuItem to="/code">
    通过 Code 打开
  </ContextMenuItem>
  <ContextMenuLine/>
</template>

<style scoped>

</style>