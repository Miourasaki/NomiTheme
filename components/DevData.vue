<script setup lang="ts">

</script>

<template>
  <DevOnly>
    <div class="w-[calc(100%-1rem)] flex justify-between items-end absolute left-2 bottom-2 text-xs text-stone-500 opacity-40 pointer-events-none">
      <div class="select-none max-w-[50rem]">
        <slot/>
      </div>
    </div>
    <slot name="form" />

  </DevOnly>
</template>

<style scoped>

</style>