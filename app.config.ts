export default defineAppConfig({
    "mx-space": {
        apiUrl: process.env.API_URL || 'https://api.koishi.live/api/v2', // 默认值
        gateway: process.env.GATEWAY || 'https://api.koishi.live', // 默认值
    }
})