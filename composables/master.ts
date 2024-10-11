import type {UserModel} from "@mx-space/api-client";
import {useClient} from "~/utils/client";

export let masterInfo: UserModel = {}

export const useMasterStore = () => {
    const info = useState<UserModel>("Master Data")
    const friends = useState<Array<object>>("Friends Data")


    const now = useState<Date>("Now Datetime",()=> new Date())
    const contextMenu = useState<boolean>("Context Menu State", ()=> false)
    const contextTarget = useState<HTMLDivElement>("Context Menu Target")


    return {info, friends, now, contextmenu: {
        state: contextMenu,
        target: contextTarget
    }}
}

