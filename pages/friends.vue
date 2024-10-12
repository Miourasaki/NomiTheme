<script setup lang="ts">

defineWindow("/friends", {
    title: useMasterStore().info.value.name + "的通讯录",
    titleColor: [210,210,210],
    size: {width:650, height:470},
    minSize: {width:650, height: 32},
    maxSize: {width: 980, height:760},
    pid: 100,
    slot: 'friends'
  })
</script>
<template></template>