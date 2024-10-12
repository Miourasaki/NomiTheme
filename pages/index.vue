<script setup lang="ts">


defineWindow("/", {
    title: useMasterStore().info.value.name + " ☆ Index",
    titleColor: [210,210,210],
    size: {width:980, height:570},
    minSize: {width:650, height: 32},
    maxSize: {width: 1320, height:760},
    pid: 1,
    slot: 'index'
  })
</script>
<template></template>