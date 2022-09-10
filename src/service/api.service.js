import axios from "axios";
import router from "@/router";
import {StatusCodes} from 'http-status-codes';

const APIService = {
    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        axios.interceptors.request.use((config) => {
            config.headers.common['Content-Type'] = 'application/json';
            config.headers.common['Access-Control-Allow-Origin'] = '*';
            return config;
        });
        axios.interceptors.response.use(response => {
                return response
            },
            error => {
                console.log(error.response.status)
                if (error.response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                    router.push('/500');
                }
                return Promise.reject(error)
            });
    },

    get(resource, params) {
        return axios.get(resource, {params: {...params}});
    }
}
export default APIService;
