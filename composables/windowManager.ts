import {useDock} from "~/composables/dock";

export interface WinInterface {

    pid?: number,
    sid?: string,
    zIndex?: number,

    slot?: string,

    title?: string,
    titleColor?: [r: number, g: number, b: number],
    fullScreen?: boolean,
    allowFullScreen?: boolean,
    size?: { width: number, height: number },
    minSize?: { width: number, height: number },
    maxSize?: { width: number, height: number },
    position?: { left: number, top: number },
}



export const useWindows = () => {
    // 为什么useState不能用class啊😭😭😭😭
    const process = useState<Map<number, WinInterface>>("WM - Process", () => new Map())
    const focus = useState<Array<number>>("WM - FocusList", () => [])

    const focusOnWindow = (pid: number) => {

        const to = getWindow(pid)?.sid
        if (to?.startsWith("/")) useRouter().push(to).then()

        const newArr = focus.value.filter(num => num !== pid);
        newArr.push(pid)
        focus.value = newArr;
    }
    const getWindowZIndex = (pid: number) => {
        return focus.value.indexOf(pid)
    }

    const getWindow = (pid: number): WinInterface | undefined => process.value.get(pid)
    const createWindow = (sid: string, v: WinInterface) => {

        const pid = v.pid || Math.floor(Math.random() * 65537); // 0 到 65536 的随机整数
        const win: WinInterface = {
            pid: pid, sid: sid, zIndex: 10, slot: v.slot,

            title: v.title || "",
            titleColor: v.titleColor || [255, 237, 213],

            fullScreen: v.fullScreen || false,
            allowFullScreen: v.allowFullScreen != null ? v.allowFullScreen : true,
            size: v.size || {width: 960, height: 560},
            minSize: v.minSize || {width: 340, height: 32},
            maxSize: v.maxSize || {width: 960, height: 560},
            position: v.position || {left: 60, top: 60},
        }

        process.value.set(pid, win)
        focusOnWindow(pid)

        return pid
    }


    const deleteWindow = (pid: number) => {
        process.value.delete(pid)
        focus.value = focus.value.filter(num => num !== pid); // 删除值为 3 的元素
    }

    return {
        process, focus,
        focusOnWindow,
        getWindowZIndex,
        getWindow,
        createWindow,
        deleteWindow
    }
}


export const useWindowRouter = () => {
    return {
        push: (to: string = "") => {
            const router = useRouter()
            if (to == useRoute().fullPath) {
                router.replace("_temp").then(() => {
                    router.replace(to).then()
                })
            } else router.push(to).then();

        }
    }
}