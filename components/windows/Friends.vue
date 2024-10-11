<script setup lang="ts">

import Context from "~/components/Context.vue";
import {useMasterStore} from "~/composables/master";
import Scrollbar from "~/layouts/scrollbar.vue";

const master = useMasterStore()

const target = ref(undefined);

const friend = (type: number) => {
  const r = []

  for (const i in master.friends.value.data) {
    const item = master.friends.value.data[i]
    if (item.type==type) r.push(item)
  }
  return r
}
</script>

<template>
  <div class="w-full h-full absolute inset-0 flex">
    <div class="min-w-52 h-full border-r relative overflow-hidden bg-white text-sm text-stone-900">
      <div class="absolute left-0 bottom-0 w-52 h-96 opacity-5 z-0 pointer-events-none rotate bg-center bg-[url(~/assets/image/芙兰刚欲异闻立绘.png)] bg-no-repeat bg-cover"></div>
      <Scrollbar>
        <div class="px-3 pb-1 pt-4 font-medium text-xs">朋友</div>
        <Context v-for="(f, i) in friend(0)" :key="f.id">
          <button :aria-label="`information of ${f.name}`" @click="target = f" v-if="f.hide == false"
                  :class="target == f ? 'bg-amber-50 font-medium' : i % 2 == 0 ? 'bg-gray-400 bg-opacity-30':'bg-gray-300 bg-opacity-30'"
                  class="w-full px-3 h-[1.9rem] flex items-center hover:bg-amber-50 transition-all relative"
          >
              {{f.name}}
          </button>
        </Context>
        <div class="px-3 pb-1 pt-4 font-medium text-xs">收藏</div>
        <Context v-for="(f, i) in friend(1)" :key="f.id">
          <button :aria-label="`information of ${f.name}`" @click="target = f" v-if="f.hide == false"
                  :class="target == f ? 'bg-amber-50 font-medium' : i % 2 == 0 ? 'bg-gray-400 bg-opacity-40':'bg-gray-300 bg-opacity-50'"
                  class="w-full px-3 h-[1.9rem] flex items-center hover:bg-amber-50 transition-all relative"
          >
            {{f.name}}
          </button>
        </Context>
      </Scrollbar>
    </div>
    <div class="flex-grow h-full">
        <div v-if="target != undefined" class="w-full h-full flex flex-col items-center py-11">

          <div class="text-center flex flex-col items-center gap-3">
            <div :style="{
              backgroundImage: target.avatar? `url(${target.avatar})` : undefined
            }" class="w-20 h-20 bg-amber-50 rounded-full bg-cover bg-no-repeat bg-center" />
            <div class="font-medium text-stone-800">{{target.name}}</div>
          </div>

          <div class="mt-10 text-sm">
            <div class="w-96 max-w-96 border border-b-0 h-8 rounded-t-lg bg-gray-200 bg-opacity-75 truncate backdrop-blur-sm flex items-center px-4">
              <div class="w-8 h-8 p-2 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M2.75 17h12.5a.75.75 0 0 1 .102 1.493l-.102.007H2.75a.75.75 0 0 1-.102-1.493L2.75 17h12.5h-12.5zm0-4h18.5a.75.75 0 0 1 .102 1.493l-.102.007H2.75a.75.75 0 0 1-.102-1.493L2.75 13h18.5h-18.5zm0-4h18.5a.75.75 0 0 1 .102 1.493l-.102.007H2.75a.75.75 0 0 1-.102-1.493L2.75 9h18.5h-18.5zm0-4h18.5a.75.75 0 0 1 .102 1.493l-.102.007H2.75a.75.75 0 0 1-.102-1.493L2.75 5h18.5h-18.5z" fill="currentColor"></path></g></svg>

              </div>
              {{target.description || '好懒的朋友~'}}
            </div>
            <a :href="target.url" target="_blank" class="w-96 max-w-96 border border-t-0 h-8 rounded-b-lg bg-gray-100 bg-opacity-75 truncate backdrop-blur-sm flex items-center px-4">
              <div class="w-8 h-8 p-2 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3l-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3l49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z" fill="currentColor"></path></svg>
              </div>
              {{decodeURI(target.url)}}
            </a>
          </div>
          <DevData>
            {{target}}
          </DevData>

        </div>
        <div v-else class="w-full h-full flex items-center justify-center">
          <div class="flex flex-col items-center opacity-75 mb-7">
            <img src="~/assets/image/抱头蹲防.png" alt="抱头蹲防" class="w-56 f" />
            <div class="text-xl font-mono text-stone-500">朋友走丢了...</div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.rotate {
  transform: rotateY(180deg);
}
.f {
  filter: grayscale(100%);
}
</style>