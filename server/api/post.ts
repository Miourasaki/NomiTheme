import {useClient} from "~/utils/client";

export default defineEventHandler(async (event) => {

    const params = new URLSearchParams(decodeURI(event.path.split("?")[1]))
    const client = await useClient(true)

    return await client.post.getPost(params.get("id"))
})
