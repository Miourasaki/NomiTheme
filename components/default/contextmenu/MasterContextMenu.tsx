// // components/MyComponent.tsx
// import {defineComponent, type PropType, ref} from 'vue';
// import {fa} from "cronstrue/dist/i18n/locales/fa";
// import ContextCopy from "~/components/contextmenu/ContextCopy.vue";
//
// const ContextMenuItem = defineComponent({
//     props: {
//         onClick: {
//             type: Function as PropType<(e: MouseEvent) => void>,
//             required: false,
//         },
//     },
//     setup(props, {slots}) {
//         const menuOpen = useMasterStore().contextmenu
//         return () => (
//             <button onClick={props.onClick}
//                     tabindex={!menuOpen.value && '-1'}
//                     class="hover:bg-slate-400 hover:text-white
//                            focus-visible:bg-slate-400 focus-visible:text-white focus-visible:outline-0
//                            rounded-md py-[.1rem] px-3 text-[.9rem]
//                            transition-all duration-200 ease-in-out transform-gpu
//                            flex items-center justify-between">
//                 {slots.default && slots.default()}
//             </button>
//         )
//     },
// })
