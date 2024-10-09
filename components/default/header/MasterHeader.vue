<script setup lang="ts">
import RightAccount from "~/components/default/header/RightAccount.vue";

const now = useState<Date>("Now Datetime")
if (process.client) setInterval(()=>now.value = new Date(), 1000)


import MasterHeaderIcon from "~/components/default/header/MasterHeaderIcon.vue";
import ContextMenuItem from "~/components/default/contextmenu/ContextMenuItem.vue";
import ContextMenuLine from "~/components/default/contextmenu/ContextMenuLine.vue";
import {useDock} from "~/composables/dock";

const mInfo = useMasterStore().info.value


function getWeekday(date: Date) {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  const dayIndex = date.getDay(); // 获取当前日期是星期几
  return weekdays[dayIndex]; // 返回对应的中文星期
}
function getPad(obj: any): string {
  return String(obj).padStart(2,'0')
}

const dock = useDock()
const windows = useWindows()


const headerColor = () => {
  const win = windows.getWindow(dock.targetPid.value)
  return 'rgb(' +
      win?.titleColor[0] + ' ' +
      win?.titleColor[1] + ' ' +
      win?.titleColor[2] + ' / 0.9)'
}

</script>


<style scoped>

</style>
<template>
  <header id="header"
          :style="{
            '--header-color': headerColor()
          }"
          :class="dock.fullscreen.value ? 'before:bg-[var(--header-color)]':'border-b shadow-sm before:bg-slate-200'"
          class="w-full flex items-center justify-between h-7 select-none z-50
  before:bg-opacity-90 before:backdrop-blur before:absolute before:inset-0 relative
  before:transition-all before:ease-in-out before:duration-500 before:transform-gpu transition-all ease-in-out duration-300">
    <div class="w-1/3 flex items-center h-full ml-3">

      <MasterHeaderIcon aria-label="传送到主页">
        <div class="w-5 h-5 group-hover:rotate group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out">
          <svg viewBox="0 0 200 200">
            <g>
              <path fill="currentColor" opacity="1.00" d=" M 19.21 60.17 C 29.07 32.71 55.98 12.72 84.94 10.32 C 89.89 10.22 94.85 10.17 99.80 10.36 C 119.15 12.40 137.61 21.93 150.44 36.55 C 162.15 49.87 168.85 67.30 169.66 84.97 C 170.01 95.81 167.70 106.61 163.75 116.66 C 162.28 119.85 160.52 122.91 159.31 126.23 C 165.82 130.43 173.17 133.66 178.39 139.61 C 181.54 143.53 185.15 147.41 186.38 152.43 C 186.69 156.43 186.83 160.53 186.24 164.52 C 183.80 173.79 176.01 180.59 167.76 184.82 C 161.41 188.05 154.35 189.47 147.29 189.85 C 141.15 190.99 134.86 189.91 128.74 191.16 C 125.81 191.58 122.96 190.38 120.03 190.51 C 105.37 190.80 91.04 187.21 76.74 184.52 C 57.28 179.93 38.61 172.01 21.75 161.26 C 19.05 159.53 16.20 157.27 15.63 153.90 C 15.98 150.63 18.56 147.11 22.12 147.14 C 25.91 146.52 28.71 149.51 31.62 151.37 C 43.48 159.31 57.13 163.88 70.61 168.21 C 86.74 172.67 103.28 175.89 120.02 176.50 C 124.00 176.94 127.99 177.60 132.01 177.17 C 140.40 176.04 148.98 175.99 157.22 173.91 C 164.32 171.24 172.70 166.43 173.33 158.00 C 172.56 151.90 167.44 147.52 162.43 144.56 C 158.57 142.34 154.67 139.20 149.98 139.45 C 148.61 140.20 147.53 141.36 146.39 142.42 C 128.76 159.16 103.18 167.82 79.08 163.35 C 64.56 160.74 50.65 154.25 39.73 144.27 C 27.63 133.54 19.39 118.73 15.84 103.00 C 13.11 88.78 13.75 73.68 19.21 60.17 M 77.09 25.66 C 77.41 26.96 77.58 28.38 78.55 29.40 C 85.03 37.48 90.92 46.02 96.12 54.97 C 97.06 56.24 97.91 58.36 99.88 57.82 C 102.91 57.14 105.59 55.40 108.49 54.29 C 110.18 53.66 109.83 51.24 108.91 50.07 C 103.56 41.29 98.14 32.41 91.44 24.59 C 86.70 23.85 81.74 24.49 77.09 25.66 M 112.03 27.16 C 112.53 30.13 114.44 32.52 115.96 35.02 C 118.34 38.59 120.23 42.48 122.88 45.86 C 127.06 44.79 130.79 42.38 133.72 39.24 C 127.60 33.58 120.02 29.50 112.03 27.16 M 51.33 38.85 C 59.21 48.14 66.01 58.26 72.68 68.42 C 76.49 69.20 80.03 66.59 83.43 65.23 C 85.47 64.79 84.54 62.44 83.75 61.26 C 77.19 50.84 70.47 40.38 61.97 31.42 C 58.02 33.20 53.93 35.23 51.33 38.85 M 31.39 66.17 C 29.80 71.11 28.35 76.25 28.57 81.48 C 30.32 81.48 32.09 81.47 33.78 80.97 C 42.20 78.99 50.65 77.03 58.80 74.09 C 57.90 70.74 55.67 68.03 53.85 65.16 C 49.82 59.67 46.36 53.54 41.03 49.20 C 36.50 53.99 33.78 60.11 31.39 66.17 M 137.09 55.01 C 113.93 68.10 89.51 79.00 64.12 87.01 C 52.81 91.12 40.91 93.25 29.42 96.70 C 29.85 100.83 30.06 105.33 32.74 108.74 C 57.00 103.89 80.64 96.21 103.36 86.45 C 118.77 80.07 133.65 72.43 148.00 63.91 C 150.53 62.98 150.15 59.88 148.97 58.01 C 147.56 55.69 146.44 52.76 143.97 51.43 C 141.47 52.15 139.40 53.84 137.09 55.01 M 151.22 78.31 C 116.51 98.57 78.53 113.09 39.37 121.98 C 39.90 125.41 42.64 127.68 44.96 129.99 C 46.36 131.25 47.89 132.99 50.00 132.40 C 69.31 128.29 87.83 121.22 106.23 114.19 C 121.46 108.36 135.84 100.62 150.46 93.45 C 152.61 92.16 155.99 91.01 155.82 87.96 C 155.80 84.39 155.50 80.83 155.26 77.27 C 153.87 77.41 152.41 77.48 151.22 78.31 M 148.87 109.98 C 148.76 111.15 148.65 112.33 148.54 113.50 C 148.98 113.46 149.85 113.37 150.28 113.33 C 150.72 112.04 151.19 110.76 151.65 109.48 C 150.72 109.64 149.80 109.81 148.87 109.98 M 124.92 120.91 C 122.80 121.67 123.28 124.20 123.51 125.93 C 124.41 130.56 124.72 135.29 125.74 139.90 C 130.51 138.57 134.48 134.85 137.45 130.98 C 137.87 126.29 136.11 121.78 135.21 117.24 C 131.48 117.33 128.20 119.35 124.92 120.91 M 97.41 133.40 C 97.21 138.90 98.53 144.33 99.53 149.71 C 103.64 149.59 108.36 149.22 111.66 146.68 C 112.14 140.78 110.88 134.92 109.48 129.22 C 105.28 129.63 100.70 130.74 97.41 133.40 M 65.74 142.82 C 64.11 144.15 66.21 145.08 67.37 145.54 C 72.83 147.81 78.64 149.84 84.63 149.68 C 84.61 145.80 84.72 141.67 82.68 138.22 C 76.93 139.33 71.25 140.85 65.74 142.82 Z"/>
            </g>
          </svg>
        </div>
        <template #menu>
          <div class="min-w-32 flex flex-col gap-0.5">
            <ContextMenuItem to="/about">关于本机</ContextMenuItem>
            <ContextMenuLine />

            <ContextMenuItem>系统偏好设置</ContextMenuItem>
            <ContextMenuItem>系统帮助
              <template #key>F1</template>
            </ContextMenuItem>
            <ContextMenuLine />

            <ContextMenuItem>任务管理器</ContextMenuItem>
            <ContextMenuItem to="/">
              索引页
            </ContextMenuItem>
            <ContextMenuLine />

            <ContextMenuItem disabled>锁定屏幕</ContextMenuItem>
            <ContextMenuItem disabled>注销</ContextMenuItem>
          </div>
        </template>
      </MasterHeaderIcon>

      <MasterHeaderIcon class="font-medium" to="/">
        <div class="text-[0.92rem] mt-[0.08rem]">{{mInfo?.name}}</div>
      </MasterHeaderIcon>

    </div>

    <div class="w-1/3 justify-center flex items-center h-full">
      <MasterHeaderIcon menu-position="center">
        {{now.getFullYear()}}年{{now.getMonth() + 1}}月{{now.getDate()}}日 {{getWeekday(now)}}&nbsp;
        {{getPad(now.getHours())}}:{{getPad(now.getMinutes())}}:{{getPad(now.getSeconds())}}
        <template #menu>
          <div class="w-72 h-52">你好你好你好你好你好</div>
        </template>
      </MasterHeaderIcon>
    </div>
    <div class="w-1/3 justify-end flex items-center h-full mr-3">
      <MasterHeaderIcon>
        {{now.toUTCString()}}
      </MasterHeaderIcon>
      <RightAccount />
    </div>

  </header>
</template>