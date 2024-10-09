<script setup lang="ts">

import ContextMenuLine from "~/components/contextmenu/ContextMenuLine.vue";
import ContextMenuItem from "~/components/contextmenu/ContextMenuItem.vue";
</script>

<template>
  <ContextMenuItem to="/about">
    关于系统
  </ContextMenuItem>
  <ContextMenuItem>
    终端
  </ContextMenuItem>
  <ContextMenuLine/>

</template>

<style scoped>

</style>