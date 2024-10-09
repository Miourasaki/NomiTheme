<template>
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

  <div class="px-10 py-6">
    <div class="flex items-center justify-between">
      <RoundTitle>朋友们
        <template #icon>
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9,12A6,6,0,1,0,3,6,6.006,6.006,0,0,0,9,12ZM9,2A4,4,0,1,1,5,6,4,4,0,0,1,9,2Z"/>
            <path d="M9,14a9.011,9.011,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.011,9.011,0,0,0,9,14Z"/>
            <path
                d="M22,7.875a2.107,2.107,0,0,0-2,2.2,2.107,2.107,0,0,0-2-2.2,2.107,2.107,0,0,0-2,2.2c0,1.73,2.256,3.757,3.38,4.659a.992.992,0,0,0,1.24,0c1.124-.9,3.38-2.929,3.38-4.659A2.107,2.107,0,0,0,22,7.875Z"/>
          </svg>
        </template>
      </RoundTitle>
      <RoundTitle to="/friends">
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
      <Scrollbar class="w-full flex gap-7 py-8">
        <!--        START-->
        <Context v-for="i in friends.data" :key="i.id">
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
        <!--        END-->
      </Scrollbar>
    </div>
  </div>
  <div class="relative opacity-30 pointer-events-none text-xs mb-10">
    <div class="px-5 py-6">
      <div>{{ useMasterStore().info.value }}</div>
    </div>
  </div>

  <!--  <footer class=" w-full h-28 bg-orange-400">-->
  <!--    <div>a</div>-->
  <!--  </footer>-->
</template>

<script setup lang="ts">
import RoundTitle from "~/components/index/RoundTitle.vue";
import BorderOneDown from "~/components/border/BorderOneDown.vue";
import SocialIds from "~/components/index/SocialIds.vue";
import Scrollbar from "~/layouts/scrollbar.vue";
import {useClient} from "~/components/client";
import Context from "~/components/Context.vue";

const master = useMasterStore()
const info = master.info

const friends = await useAsyncData("Get Friends", async () => {
  const client = await useClient(false);
  return await client.friend.getAllPaginated(1, 20)
}).data;

const echocave = await useAsyncData("Get Echocave", async () => {
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


</style>
