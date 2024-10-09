export const useDock = () => {
    const fullscreen = useState<boolean>(`fullscreen`, ()=>false)
    return {
        fullscreen
    }
}