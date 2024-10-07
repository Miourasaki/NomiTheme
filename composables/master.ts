import type {UserModel} from "@mx-space/api-client";
import {useClient} from "~/components/client";

export let masterInfo: UserModel = {}

export const useMasterStore = () => {
    const info = useState<UserModel | undefined>("主人的信息", ()=> {
        return undefined
    })
    return {info}
}

