<script setup lang="ts">

import RoundTitle from "~/components/windows/IndexRoundTitle.vue";
import Scrollbar from "~/layouts/scrollbar.vue";
import Context from "~/components/Context.vue";

defineProps<{
  title?: string
  link?: string
  color?: string
  class?: string
}>()

</script>

<template>
  <div class="px-10 py-6">
    <div class="flex items-center justify-between">
      <RoundTitle :color="color">{{ title }}
        <template #icon>
          <slot name="icon" />
        </template>
      </RoundTitle>
      <RoundTitle :color="color" :to="link">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">
            <g fill="none">
              <path
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm3.462-6.809a.5.5 0 0 1-.106.16l-.003.003l-2.5 2.5a.5.5 0 0 1-.707-.708L9.793 8.5H5a.5.5 0 0 1 0-1h4.793L8.146 5.854a.5.5 0 1 1 .708-.708l2.5 2.5l.002.003a.499.499 0 0 1 .106.542z"
                  fill="currentColor"></path>
            </g>
          </svg>
        </template>
      </RoundTitle>
    </div>
    <div class=" mt-2 relative">
      <Scrollbar class="w-full flex gap-5 py-5">
        <!--        START-->
        <slot />
        <!--        END-->
      </Scrollbar>
    </div>
  </div>

</template>

<style scoped>

</style>