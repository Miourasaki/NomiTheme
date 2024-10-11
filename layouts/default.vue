<script setup lang="ts">

import type {UserModel} from "@mx-space/api-client";
import {useClient} from "~/utils/client";
import MasterHeader from "~/components/default/header/MasterHeader.vue";
import ContextMenu from "~/components/default/contextmenu/ContextMenu.vue";

const MasterInfo = useState<UserModel | undefined>("Master Data", () => undefined)
const FriendsInfo = useState<UserModel | undefined>("Friends Data", () => undefined)
await useAsyncData("Get Master Data", async () => {

  const client = await useClient(false)
  const master = await client.user.getMasterInfo()
  const friends = await client.friend.getAllPaginated()

  if (master) MasterInfo.value = master
  if (friends) FriendsInfo.value = friends

  return {code: 0, master}
})


import {useWindows} from "~/composables/windowManager";
import Application from "~/layouts/application.vue";
import ClientWindow from "~/components/ClientWindow.vue";

const windows = useWindows();

const temp = (e) => {
  e.preventDefault();

  const form = new FormData(e.target)
  windows.createWindow(form.get('sid'), {
    title: form.get('title'),
    titleColor: JSON.parse(form.get('color')),
  })
}
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
            <slot />
            <DevData>
              <template #form>
                <form @submit="temp" class="flex flex-col w-40 gap-3 m-2">
                  <input name="title" class="border" />
                  <input name="sid" class="border" />
                  <input name="color" class="border" value="[255,255,255]" />
                  <button class="border">submit</button>
                </form>
              </template>
              <div>Ｐ：{{windows.process}}</div>
              <div>Ｆ：{{windows.focus}}</div>
            </DevData>
      <Context v-for="[pid, win] in windows.process.value" :key="pid">
        <Application :pid="pid" :p="win" :title="win.title" :style="{
          zIndex: win.zIndex + windows.getWindowZIndex(pid),
        }">
          <ClientWindow :nid="win.slot" />
        </Application>

      </Context>

    </div>
  </div>

  <ClientOnly>
    <ContextMenu/>
  </ClientOnly>
</template>

