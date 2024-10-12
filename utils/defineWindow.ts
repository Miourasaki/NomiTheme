const defineWindow = (sid: string, v: WinInterface) => {

    // const open = ref<boolean>(false)

    const windows = useWindows();
    const winRouter = useWindowRouter();

    if (windows.focusRouter.value) {
        windows.focusRouter.value = false
        return
    }
    if (winRouter.targetPath.value == sid)
        winRouter.targetPath.value = false

    // if (open.value == false) {

        const pid = windows.createWindow(sid, v)
        // if (pid != v.pid) open.value = true
    // }

}

export default defineWindow