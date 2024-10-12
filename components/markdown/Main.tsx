const MioMarkdown = defineComponent({
    props: {
        text: String
    },
    setup(props) {
        const split = props.text?.split("\n")

        const codeBlock = ref<boolean>(false)
        let code = []

        return () => (<div class={`text-stone-700`} title={""}>
            {split.map((item, index) => {

                if (item.trim().startsWith("```") && codeBlock.value) {
                    codeBlock.value = false
                    return (<>
                        <PersonCode list={code} />
                    </>)
                } else if (codeBlock.value) code.push(item)
                else if (item.trim().startsWith("```") && !codeBlock.value) {
                    codeBlock.value = true
                    code = []
                } else return (
                    <PersonStem text={item} codeBlock={codeBlock.value} key={index}/>
                )
            })}
        </div>)
    }
})

const PersonCode = defineComponent({
    props: {
        list: Array<string>
    },
    setup(props) {

        return () => (<div class={`border p-7 bg-gray-200 bg-opacity-20 backdrop-blur-sm rounded`}>
            {props.list.map((item, index) => {
                return (<>
                    <div class={`flex items-center group`} key={index}>
                        <div class={`relative w-8 text-stone-400 text-sm`}>
                            <span class={`group-hover:opacity-0`}>-</span>
                            <span class={`absolute inset-0 group-hover:opacity-100 opacity-0`}>{index+1}.</span>
                        </div>
                        <div>{item}</div>
                    </div>
                </>)
                }
            )}
        </div>)
    }
})


const PersonStem = defineComponent({
    props: {
        text: String
    },
    setup(props) {

        const title = ref<number | boolean>(false)

        if (props.text?.startsWith("###### ")) title.value = 6
        else if (props.text?.startsWith("##### ")) title.value = 5
        else if (props.text?.startsWith("#### ")) title.value = 4
        else if (props.text?.startsWith("### ")) title.value = 3
        else if (props.text?.startsWith("## ")) title.value = 2
        else if (props.text?.startsWith("# ")) title.value = 1

        if (title.value != false) {
            const result = splitStringAtFirstSpace(props.text)[1]
            return () => (
                <div class={`relative text-black`}
                     style={{
                         fontSize: 0.15 * (7 - title.value) + 1 + "rem"
                     }}><PersonLeaf text={result}/>
                    <span class={`absolute -left-6 text-xs text-stone-400 bottom-[12%] font-light`}
                    >H{title.value}</span>
                </div>
            )
        }
        if (props.text == "") return () => (<br/>)

        if (props.text?.trim().startsWith("- ")) {

            const text = props.text?.trim().replace("- ", "")
            return () => <li class={`w-full`}>{text}</li>
        }

        if (props.text?.trim().startsWith("> ")) {

            const text = props.text?.trim().replace("> ", "")
            return () => <span class={`w-full border-l-2 border-gray-300 pl-2 relative`}>{text}
                <span class={`w-0.5 absolute -bottom-1 -left-0.5 bg-gray-300 h-1`}></span>
            </span>
        }


        if (props.text?.trim().startsWith("---")) {
            return () => <div class={`w-full border-y`}></div>
        }

        return () => <>
            <PersonLeaf text={props.text}/>
            <br/>
        </>

    }
})

const PersonLeaf = defineComponent({
    props: {
        text: String
    },
    setup(props) {
        let text = props.text + ""
        text = text.replace(/!\[(.*?)]\((.*?)\)/g, '<img src="$2" alt="$1" />');
        text = text.replace(/\[(.*?)]\((.*?)\)/g, '<a href="$2" style="text-decoration-line: underline;" class="hover:text-sky-600" target="_blank">$1</a>');
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        text = text.replace(/~~(.*?)~~/g, '<s>$1</s>');
        text = text.replace(/`((?:(?!```).)*?)`/g, '<code style="border: 1px solid rgb(200,200,200);padding: 2px 4px; border-radius: 5px; background: rgb(240 240 240 / 0.5)">$1</code>');

        return () => (<span v-html={text}></span>)
    }
})


export default MioMarkdown;


function splitStringAtFirstSpace(input: string): [string, string | null] {
    const parts = input.split(' ');
    if (parts.length > 1) {
        return [parts[0], parts.slice(1).join(' ')];
    } else {
        return [input, null];
    }
}