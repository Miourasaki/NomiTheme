<template>

  <div class=" w-full flex items-center flex-col">

    <div class="w-full flex justify-center">
      <div class="max-w-[66rem] min-w-[40rem]">


        <div class="p-10">
          <div class="flex items-center gap-8 h-32">
            <a :href="info.url" aria-label="To Homepage" class="group">
              <img :src="info.avatar" :alt="`${info.name}'s avatar`"
                   class="w-32 h-full rounded-full group-hover:p-4 group-hover:rotate bg-slate-300
                transition-all ease-in-out duration-500 transform-gpu bg-opacity-30 backdrop-blur"/>
            </a>
            <div class="flex flex-col items-start justify-between h-full pt-4">
              <div class="flex flex-col gap-1">
                <div class="text-2xl font-medium text-stone-600">{{ info.name }}</div>
                <div class="text-sm font-light text-stone-600">{{ info.introduce }}</div>
              </div>
              <SocialIds/>
            </div>
          </div>
        </div>
        <BorderOneDown class="h-5"/>
        <div class="flex flex-col gap-9 mt-10">
          <IndexBlock title="文章们" link="/posts" color="rgb(56 105 108)">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M13 10h5l3-3l-3-3h-5V2h-2v2H4v6h7v2H6l-3 3l3 3h5v4h2v-4h7v-6h-7z" fill="currentColor"></path></svg>
            </template>

          </IndexBlock>

          <IndexBlock title="日记本" link="/notes" color="rgb(34 63 91)">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9-.25c.41 0 .75.34.75.75s-.34.75-.75.75s-.75-.34-.75-.75s.34-.75.75-.75zM9.1 17H7v-2.14l5.96-5.96l2.12 2.12L9.1 17zm8.1-8.09l-1.41 1.41l-2.13-2.12l1.41-1.41l2.13 2.12z" fill="currentColor"></path></svg>
            </template>

          </IndexBlock>

          <IndexBlock title="朋友们" link="/friends" color="rgb(251 146 60)">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" fill="currentColor"></path></svg>
            </template>
            <Context v-for="i in friends.data.value?.data" :key="i.id">
              <div v-if="!i.type" class="flex flex-col gap-2 items-center w-20">
                <div class="w-20 h-20 rounded-full rotate ">
                  <div class="relative rounded-full transition-all duration-500 ease-in-out transform-gpu w-full h-full">


                    <div class="absolute inset-0 w-full h-full bg-slate-300 p-1 shadow-lg rounded-full">
                      <div :aria-label="`${i.name}'s avatar`" class="rounded-full w-full h-full
                          bg-white bg-cover bg-center bg-no-repeat"
                           :style="{
                                  backgroundImage: `url(${i.avatar})`,
                                }"/>
                    </div>
                    <a :href="i.url" target="_blank" :aria-label="`${i.name}'s home`"
                       class="text-gray-50 p-5 rotate-y-180 transition-all duration-500 ease-out absolute inset-0 w-full h-full bg-slate-300 shadow-lg rounded-full">
                      <svg viewBox="0 0 16 16">
                        <g fill="none">
                          <path
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm3.462-6.809a.5.5 0 0 1-.106.16l-.003.003l-2.5 2.5a.5.5 0 0 1-.707-.708L9.793 8.5H5a.5.5 0 0 1 0-1h4.793L8.146 5.854a.5.5 0 1 1 .708-.708l2.5 2.5l.002.003a.499.499 0 0 1 .106.542z"
                              fill="currentColor"></path>
                        </g>
                      </svg>
                    </a>


                  </div>
                </div>
                <div
                    class="text-sm font-light text-gray-400 max-w-full overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {{ i.name }}
                </div>
              </div>
            </Context>
          </IndexBlock>

          <IndexBlock title="更多" link="/more" color="#901e33">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0zm7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10zm-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8z" fill="currentColor"></path></svg>
            </template>

          </IndexBlock>
        </div>

      </div>
    </div>

    <!--  <footer class=" w-full h-28 bg-orange-400">-->
    <!--    <div>a</div>-->
    <!--  </footer>-->
    <div class="relative opacity-30 pointer-events-none text-xs mb-10">
      <div class="px-5 py-6">
        <div>{{ useMasterStore().info.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoundTitle from "~/components/windows/IndexRoundTitle.vue";
import BorderOneDown from "~/components/border/BorderOneDown.vue";
import SocialIds from "~/components/windows/IndexSocialIds.vue";
import Scrollbar from "~/layouts/scrollbar.vue";
import {useClient} from "~/utils/client";
import Context from "~/components/Context.vue";
import IndexBlock from "~/components/windows/IndexBlock.vue";

const master = useMasterStore()
const info = master.info

const friends = await useAsyncData("Get Friends", async () => {
  const client = await useClient(false);
  return await client.friend.getAllPaginated(1, 20)
});

const echocave = await useAsyncData("Get EchoCave", async () => {
  const client = await useClient(false);
  return await client.say.getRandom()
})

const posts = await useAsyncData("Get Posts", async () => {
  const client = await useClient(false);
  return await client.post.getList(1,10)
})

</script>


<style scoped>


.rotate-y-180 {
  transform: rotate3d(0, 1, 0, 180deg);
}

.rotate:hover > div {
  transform: rotate3d(0, 1, 0, 180deg);
}

.rotate > div > a {
  opacity: 0;
}

.rotate:hover > div > a {
  opacity: 100;
}

.group:hover .group-hover\:rotate {
  transform: rotate3d(1, 1, 1, 45deg);
}

</style>
