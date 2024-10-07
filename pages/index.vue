<template>
  <div class="px-5 py-6">
    分割线-------
    <div>{{ useMasterStore().info.value}}</div>
  </div>
  <div class=""></div>
</template>

<script setup lang="ts">

import {useMasterStore} from "~/composables/master";



</script>