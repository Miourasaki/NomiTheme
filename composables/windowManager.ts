import {useDock} from "~/composables/dock";

export interface WinInterface {

    pid?: number,
    sid?: string,
    zIndex?: number,

    slot?: string | object,

    title?: string,
    titleColor?: [r: number, g: number, b: number],
    fullScreen?: boolean,
    allowFullScreen?: boolean,
    size?: { width: number, height: number },
    minSize?: { width: number, height: number },
    maxSize?: { width: number, height: number },
    position?: { left: number, top: number },
}

function stringToUniqueNumber(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash |= 0; // 将 hash 转换为 32 位整型
    }
    return hash; // 返回正数
}


export const useWindows = () => {
    // 为什么useState不能用class啊😭😭😭😭
    const process = useState<Map<number, WinInterface>>("WM - Process", () => new Map())
    const focus = useState<Array<number>>("WM - FocusList", () => [])
    const focusRouter = useState<boolean>("WM - Focus Router", () => false)

    const focusOnWindow = (pid: number) => {

        const to = getWindow(pid)?.sid
        if (to?.startsWith("/")) {
            if (to != useRoute().path && useWindowRouter().targetPath.value == false) focusRouter.value = true
            if (useWindowRouter().targetPath.value == undefined || true) useRouter().replace(to).then()
        }

        const newArr = focus.value.filter(num => num !== pid);
        newArr.push(pid)
        focus.value = newArr;
    }
    const getWindowZIndex = (pid: number) => {
        return focus.value.indexOf(pid)
    }



    const getWindow = (pid: number): WinInterface | undefined => process.value.get(pid)
    const createWindow = (sid: string, v: WinInterface) => {

        const pid = v.pid ? v.pid : sid? stringToUniqueNumber(sid + "") : Math.floor(Math.random() * 65537); // 0 到 65536 的随机整数
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
        process, focus, focusRouter,
        focusOnWindow,
        getWindowZIndex,
        getWindow,
        createWindow,
        deleteWindow
    }
}


export const useWindowRouter = () => {
    const targetPath = useState<string | boolean>("WMR - Target Path", () => false)

    return {
        targetPath,
        push: (to: string = "") => {
            const router = useRouter()
            targetPath.value = to;
            if (to == useRoute().fullPath) {
                router.replace("/_temp").then(() => {
                    router.replace(to).then()
                })
            } else router.push(to).then();

        }
    }
}