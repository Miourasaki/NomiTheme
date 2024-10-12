
<script setup lang="ts">

const s = {width: 350, height:260}

defineWindow("/about", {
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
