<script setup lang="ts">

import type {UserModel} from "@mx-space/api-client";

const MasterInfo = useState<UserModel | undefined>("Master Data", () => undefined)

import {useClient} from "~/components/client";
import MasterHeader from "~/components/header/MasterHeader.vue";
import ContextMenu from "~/components/contextmenu/ContextMenu.vue";
import Application from "~/layouts/application.vue";
import Scrollbar from "~/layouts/scrollbar.vue";


await useAsyncData("Get Master Data", async () => {

  const client = await useClient(false)
  const master = await client.user.getMasterInfo()

  if (master) MasterInfo.value = master

  return {code: 0, master}
})

const master = useMasterStore()

</script>

<template>
  <div class="pointer-events-none fixed inset-0 bg-fixed -z-50">
    <div class="bg fixed inset-0"></div>
  </div>
  <!--  <footer class="-z-30 w-full h-36 bg-orange-400 fixed bottom-0 left-0">-->
  <!--    {{master.floor}}-->
  <!--  </footer>-->
  <div class="w-screen h-screen flex flex-col transition-all ease-in-out transform-gpu">
    <MasterHeader/>
    <div id="master" class="w-full flex-grow relative">
      <Application sid="main" :title="`${MasterInfo?.name} ☆ Blogs`"
                   :fullscreen="true"
                   :min-size="{
                     width: 640,
                     height: 440,
                   }"
                   :max-size="{
                     width: 1056,
                     height: 660
                   }">

        <div class=" w-full flex justify-center">
          <div class="max-w-[66rem] min-w-[40rem]">
            <slot/>
          </div>
        </div>

      </Application>
    </div>
  </div>

  <ClientOnly>
    <ContextMenu/>
  </ClientOnly>
</template>

