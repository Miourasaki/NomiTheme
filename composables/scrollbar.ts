export const useScrollbar = () => {
    const state = useState<boolean>("Scrollbar Move State",()=>false);

    return {
        state
    }
}