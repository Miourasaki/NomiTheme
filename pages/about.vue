
<script setup lang="ts">
import {useWindowRouter} from "~/composables/windowManager";

const windows = useWindows();
const winRouter = useWindowRouter()
winRouter.push()

const s = {width: 350, height:260}

windows.createWindow("/about", {
  title: "About NomiOS",
  titleColor: [240,240,240],
  pid: 2,
  fullScreen: false,
  allowFullScreen: false,
  slot: 'about',

  size: s, minSize: s, maxSize: s
})
</script>
<template></template>
