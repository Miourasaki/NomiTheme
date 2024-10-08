<script setup lang="ts">

import MasterHeaderIcon from "~/components/header/MasterHeaderIcon.vue";
import { useClient } from "~/components/client";

const now = useMasterStore().now

import MD5 from 'crypto-js/md5'
</script>

<template>
  <MasterHeaderIcon menu-position="right">
    <div class="w-5 h-5">
      <svg v-if="!(now.getDate() == 9 && now.getMonth() + 1 == 9)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"
          fill="currentColor"></path>
      </svg>
      <div v-if="now.getDate() == 9 && now.getMonth() +1 == 9" class="text-lg font-medium -translate-y-1.5">⑨</div>
    </div>
    <template #menu>
      <div class="px-3 py-2 flex flex-col items-center min-w-48 w-auto gap-5">
        <div class="flex items-center justify-between w-auto min-w-48">
<!--          :src="`https://gravatar.com/avatar/${MD5('miura738@126.com')}?s=200&r=pg&d=404`"-->
          <img aria-label="avatar" :src="`/assets/image/null.png`"
            onerror="this.src = '/assets/image/null.png'" class="rounded-full border w-12 h-12 shadow
                      bg-[url(~/assets/image/default.webp)] bg-cover bg-no-repeat bg-center" />
          <div class="flex flex-col items-end leading-5">
            <div class="font-medium tracking-tighter">baka！没昵称！</div>
            <div class="text-sm text-gray-400 font-light">@you_kawaii</div>
          </div>
        </div>
        <div class="flex items-center justify-between gap-4">
          <!--          <button class="w-8 h-8 rounded-full border"></button>-->
          <!--          <button class="w-8 h-8 rounded-full border"></button>-->
          <button aria-label="Edit no-login profile" class="w-8 h-8 rounded-full border p-1.5
          text-gray-600 hover:bg-slate-400 hover:text-white
          transition-all ease-in-out transform-gpu">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  d="M13.209 3.102c-.495-1.003-1.926-1.003-2.421 0L8.43 7.88l-5.273.766c-1.107.16-1.55 1.522-.748 2.303l3.815 3.719l-.9 5.25c-.19 1.104.968 1.945 1.959 1.424l2.944-1.548l.304-1.217c.07-.277.17-.543.299-.795l-3.976 2.09l.862-5.028a1.35 1.35 0 0 0-.388-1.195l-3.654-3.562l5.05-.734c.44-.064.82-.34 1.016-.739l2.258-4.575l2.259 4.575a1.35 1.35 0 0 0 1.016.739l4.45.647a3.272 3.272 0 0 1 2.052.724c.529-.792.072-1.932-.935-2.078l-5.273-.766l-2.358-4.778zM18.1 11.67l-5.896 5.902a2.686 2.686 0 0 0-.706 1.248l-.457 1.83a1.086 1.086 0 0 0 1.317 1.319l1.829-.458a2.682 2.682 0 0 0 1.246-.706l5.896-5.903a2.287 2.287 0 0 0 0-3.232a2.281 2.281 0 0 0-3.229 0z"
                  fill="currentColor"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </template>
  </MasterHeaderIcon>
</template>

<style scoped></style>