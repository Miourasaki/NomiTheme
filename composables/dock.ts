export const useDock = () => {
    const fullscreen = useState<boolean>(`FullScreen State`, ()=>false)
    const targetPid = useState<number>(`FullScreen TargetPid`, ()=>0)
    return {
        fullscreen, targetPid
    }
}