<script setup lang="ts">
import {useWindowRouter} from "~/composables/windowManager";

const windows = useWindows();
const winRouter = useWindowRouter()
winRouter.push()



  windows.createWindow("/", {
    title: useMasterStore().info.value.name + " ☆ Index",
    titleColor: [25,255,235],
    pid: 1,
    fullScreen: true,
    slot: 'index'
  })
</script>
