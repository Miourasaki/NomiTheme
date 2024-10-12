import createClient, {allControllers} from "@mx-space/api-client";
import axiosAdaptor from "@mx-space/api-client/dist/adaptors/axios";

let key: string| undefined= process.env.SECRET_KEY

export const useClient = async (v:boolean = false) => {
    const mxConfig = useAppConfig()['mx-space']

    const endpoint = mxConfig.apiUrl
    const client = createClient(axiosAdaptor)(endpoint)

    const $axios = axiosAdaptor.default
    $axios.defaults.timeout = 10000
    $axios.interceptors.request.use(
        (config) => {
            if (key && v) config.headers["Authorization"] = key;
            // if (v) config.headers["Authorization"] = "Bearer txoyuiu79w63lcabp67g8wicabyy0s3m8gq2urvtjhy"
            if (process.server)
                config.headers["User-Agent"] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Untitled/v0.1.0-alpha';
            return config;
        },
        (error) => {
            if (process.dev) console.error(error);
            return Promise.reject(error);
        }
    )
    $axios.interceptors.response.use(
        response => {
            return Promise.resolve(response);
        },
        error => {
            if (process.dev) console.error(error.response.data)
            return Promise.reject(error);
        }
    )

    client.injectControllers(allControllers)
    return client
}
