<script setup lang="ts">
import {useWindowRouter} from "~/composables/windowManager";

const windows = useWindows();
const winRouter = useWindowRouter()
winRouter.push()

  windows.createWindow("/", {
    title: useMasterStore().info.value.name + " ☆ Index",
    titleColor: [210,210,210],
    size: {width:980, height:570},
    maxSize: {width:1320, height:760},
    pid: 1,
    slot: 'index'
  })
</script>
<template></template>