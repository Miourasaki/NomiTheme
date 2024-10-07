<script setup lang="ts">

import type {UserModel} from "@mx-space/api-client";

const MasterInfo = useState<UserModel | undefined>("主人的信息",()=>undefined)

import {useClient} from "~/components/client";
import MasterHeader from "~/components/master/MasterHeader.vue";
import MasterContextMenu from "~/components/master/MasterContextMenu.vue";
await useAsyncData("Get Master Data", async () => {

  const client = await useClient(false)
  const master = await client.user.getMasterInfo()

  if (master) MasterInfo.value = master
return {}
})

</script>

<template>
  <div class="pointer-events-none fixed inset-0 bg-fixed -z-50"><div class="bg fixed inset-0"></div></div>
  <div class="w-screen h-screen flex flex-col">
    <MasterHeader />
    <div id="master" class="w-full flex-grow">
      <slot/>
    </div>
  </div>

  <ClientOnly>
    <MasterContextMenu />
  </ClientOnly>
</template>

