// components/MyComponent.tsx
import {defineComponent, type PropType, ref} from 'vue';
import {fa} from "cronstrue/dist/i18n/locales/fa";

export const ContextMenuItem = defineComponent({
    props: {
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>,
            required: false,
        },
    },
    setup(props, {slots}) {
        return () => (
            <button onClick={props.onClick} class="hover:bg-slate-400 hover:text-white rounded-md py-[.1rem] px-3 text-[.9rem]
        transition-all duration-200 ease-in-out transform-gpu
        flex items-center justify-between">
                {slots.default && slots.default()}
            </button>
        )
    },
})
export const ContextMenuLine = defineComponent({
    setup() {
        return () => <div class={`w-auto h-[.05rem] bg-gray-300 mx-2 my-[.2rem]`}></div>
    }
})


const MasterContextMenu = defineComponent({
    setup() {
        const menuStyle = ref({
            left: `0`,
            top: `0`,
        })
        const menuOpenLast = ref(false)
        const menuOpen = ref(false)
        const menuRef = ref<HTMLDivElement | null>(null)

        const lastUseOrigin = ref(false)

        document.addEventListener('click', () => menuOpen.value = false)
        const handleContextMenu = (event: MouseEvent) => {
            if (lastUseOrigin.value) {
                lastUseOrigin.value = false
                return;
            }
            event.preventDefault();
            const tg: HTMLElement = event.target as HTMLElement;
            if (tg.closest(".nomi-context-menu-disable-any")) return;
            if (tg.classList.contains("nomi-context-menu-disable")) return;

            // 获取鼠标位置
            let x = event.clientX;
            let y = event.clientY;

            const offset = {
                height: menuRef.value!= null ? menuRef.value?.offsetHeight : 0,
                weight: menuRef.value!= null ? menuRef.value?.offsetWidth : 0,
            }
            const inner = {
                height: window.innerHeight | 0,
                weight: window.innerWidth | 0,
            }

            if (y >= inner.height - offset.height -1) y -= (offset.height - (inner.height - y)) +1;
            if (x >= inner.weight - offset.weight -1) x -= (offset.weight - (inner.weight - x)) +1;

            if (tg.tagName.toUpperCase() == "HEADER" || tg.id.toUpperCase() == "HEADER")  y = 28

            // 设置自定义菜单的位置
            menuStyle.value = {
                left: `${x}px`, top: `${y}px`
            }
            menuOpenLast.value = menuOpen.value
            menuOpen.value = true
        }
        document.addEventListener('contextmenu', handleContextMenu)

        // Clean up listener on unmount
        onBeforeUnmount(() => {
            document.removeEventListener('contextmenu', handleContextMenu);
        });
        return () => (
            <div style={menuStyle.value} ref={menuRef}
                 class={`h-auto w-auto fixed overflow-hidden 
                 ${!menuOpen.value && 'pointer-events-none'} 
                 ${menuOpenLast.value && 'transition-all duration-150 ease-in-out transform-gpu'}`}>
                <div class={`p-1.5 relative z-40 border rounded-xl 
                             transition-all duration-200 ease-out transform-gpu
                             bg-gray-100 bg-opacity-75 backdrop-blur-sm 
                                 ${!menuOpen.value && '-translate-y-full'}`}>
                    <div class="w-auto flex flex-col gap-0.5 text-start">

                        <ContextMenuItem onClick={()=>{
                            alert("测试点击")
                        }}>测试块状物体</ContextMenuItem>
                        <ContextMenuLine />
                        <ContextMenuItem onClick={()=>{lastUseOrigin.value = true}}>使用原生内容菜单</ContextMenuItem>
                    </div>
                </div>
            </div>);
    },
});

export default MasterContextMenu;
